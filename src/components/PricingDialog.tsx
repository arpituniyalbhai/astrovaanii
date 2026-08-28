import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, LoaderCircle, Sparkles } from "lucide-react";
import { auth } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  image: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: { name: string; email: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

const plans = [
  {
    name: "Starter",
    price: 79,
    credits: 5,
    description: "For a first conversation",
  },
  {
    name: "Pro",
    price: 139,
    credits: 10,
    description: "For regular guidance",
    popular: true,
  },
  {
    name: "Premium",
    price: 249,
    credits: 20,
    description: "For deeper exploration",
  },
] as const;

type PricingDialogProps = {
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
  onTriggerClick?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
};

export function PricingDialog({
  children,
  className,
  ariaLabel,
  onTriggerClick,
  open,
  onOpenChange,
  hideTrigger = false,
}: PricingDialogProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handlePurchase = async (planName: string, price: number, event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const local = JSON.parse(localStorage.getItem("userData") || "{}");
    const email = auth.currentUser?.email || local.email;

    if (!email) {
      await navigate({ to: "/signup" });
      return;
    }

    setLoading(planName);
    setPaymentMessage(null);

    try {
      if (!window.Razorpay) {
        throw new Error("Payment checkout is still loading. Please try again.");
      }

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName, amount: price, email }),
      });
      const order = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(order.error || "Failed to create order");
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "AstroVaanii",
        image: "/favicon.png",
        description: `${planName} Plan`,
        order_id: order.orderId,
        handler: async (response) => {
          setLoading(planName);
          const verificationResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              planName,
              email,
            }),
          });
          const verification = await verificationResponse.json();

          setPaymentMessage({
            type: verification.success ? "success" : "error",
            message: verification.success
              ? verification.vaaniiMessage || "Payment successful. Your credits are ready."
              : verification.vaaniiMessage || "Payment verification failed.",
          });
          setLoading(null);
        },
        prefill: { name: local.name || "", email },
        theme: { color: "#9c4f2f" },
        modal: {
          ondismiss: () => setLoading(null),
        },
      });

      checkout.open();
    } catch (error) {
      setPaymentMessage({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={ariaLabel}
            className={className}
            onClick={onTriggerClick}
          >
            {children}
          </button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl border-border bg-card p-5 sm:p-8">
        <DialogHeader className="pr-7 text-left">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles size={15} aria-hidden="true" />
            Choose your credits
          </div>
          <DialogTitle className="font-display text-3xl font-medium text-foreground">
            Continue your readings
          </DialogTitle>
          <DialogDescription className="leading-6">
            Select the credit pack that fits how you want to use Vaanii.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 sm:grid-cols-3" aria-label="Credit usage">
          <div className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5 text-center text-xs font-medium text-foreground">
            <span className="font-semibold text-primary">1 credit</span> = 1 question
          </div>
          <div className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5 text-center text-xs font-medium text-foreground">
            <span className="font-semibold text-primary">1 credit</span> = 1 Tarot reading
          </div>
          <div className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5 text-center text-xs font-medium text-foreground">
            <span className="font-semibold text-primary">10 credits</span> = 1 report
          </div>
        </div>

        {paymentMessage && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              paymentMessage.type === "success"
                ? "border-green-500/25 bg-green-500/10 text-green-700"
                : "border-destructive/25 bg-destructive/10 text-destructive"
            }`}
          >
            {paymentMessage.message}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl border bg-background/60 p-5 ${
                plan.popular ? "border-primary/45 ring-2 ring-primary/10" : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl text-foreground">{plan.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
              <p className="mt-5 text-3xl font-semibold text-primary">₹{plan.price}</p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/5 px-3 py-2.5 text-sm font-semibold text-foreground">
                <Check size={16} className="text-primary" aria-hidden="true" />
                {plan.credits} credits
              </div>
              <button
                type="button"
                disabled={loading !== null}
                onClick={(event) => void handlePurchase(plan.name, plan.price, event)}
                className={`mt-5 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border bg-card text-foreground hover:border-primary/30"
                }`}
              >
                {loading === plan.name ? (
                  <LoaderCircle size={17} className="animate-spin" aria-label="Processing" />
                ) : (
                  "Purchase"
                )}
              </button>
            </article>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
