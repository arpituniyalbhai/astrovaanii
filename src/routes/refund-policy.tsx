import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — AstroVaanii" },
      {
        name: "description",
        content:
          "Refund and cancellation policy for AstroVaanii — understand our terms regarding purchases and subscriptions.",
      },
    ],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background grain">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-primary hover:text-primary/80 mb-8 inline-block text-sm font-medium"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-primary mb-8 text-4xl font-bold">Refund Policy</h1>

        <div className="prose-custom space-y-6 text-sm leading-relaxed text-foreground/80">
          <p>
            At AstroVaanii, we strive to provide valuable astrological insights
            and a satisfying user experience. This Refund Policy outlines the
            terms under which refunds and cancellations are processed for
            purchases made on our platform.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Digital Services
          </h2>
          <p>
            Our services are primarily digital in nature, including AI-powered
            astrological readings, birth chart analyses, and subscription-based
            chat access. Due to the immediate delivery and consumable nature of
            digital content, all purchases are generally considered final at the
            time of transaction.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            7-Day Refund Window
          </h2>
          <p>
            We offer a 7-day refund window from the date of purchase for
            subscription plans, provided that you have used less than 20% of
            the allotted chat queries or services included in your plan. To
            request a refund, please contact our support team with your order
            details within this period. Refunds will be processed to the
            original payment method within 7 to 14 business days.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Refund Eligibility
          </h2>
          <p>
            Refund requests are evaluated on a case-by-case basis. A refund may
            be granted if there is a demonstrable technical error on our part
            that prevented you from accessing the purchased service, or if you
            accidentally made a duplicate purchase. We reserve the right to
            deny refund requests if we determine that the services have been
            substantially consumed or if the request is made beyond the
            stipulated window.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Non-Refundable Items
          </h2>
          <p>
            Single-use report purchases, personalized chart readings that have
            already been generated and delivered, and add-on purchases beyond
            the base subscription are non-refundable unless caused by a system
            error on our end. Partial refunds may be offered in certain
            circumstances at our sole discretion.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Cancellation of Subscriptions
          </h2>
          <p>
            You may cancel your subscription at any time through your account
            settings. Upon cancellation, you will retain access to the
            purchased services until the end of the current billing period.
            Cancellation does not automatically trigger a refund for the
            remaining portion of the billing cycle.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            How to Request a Refund
          </h2>
          <p>
            To initiate a refund request, please contact our support team with
            your registered email address, order ID, and a brief explanation of
            your request. We aim to respond to all refund inquiries within 48
            hours. Approved refunds will be processed through the same payment
            method used for the original transaction.
          </p>

          <h2 className="text-primary mt-8 text-xl font-semibold">
            Policy Updates
          </h2>
          <p>
            We reserve the right to modify this Refund Policy at any time.
            Changes will be effective upon posting. Your continued use of our
            services after any modifications constitutes acceptance of the
            updated policy.
          </p>

          <p className="text-muted-foreground">
            Last updated: July 2026
          </p>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-foreground">Terms &amp; Conditions</Link>
            <span className="text-muted-foreground/50">Refund Policy</span>
            <Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground/50">&copy; {new Date().getFullYear()} AstroVaanii</p>
        </div>
      </div>
    </main>
  );
}
