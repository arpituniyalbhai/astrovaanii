import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_LIVE_API;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export interface CreateOrderParams {
  amount: number; // in paise (₹79 = 7900 paise)
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  notes: Record<string, string>;
  created_at: number;
}

export async function createRazorpayOrder(params: CreateOrderParams): Promise<RazorpayOrder> {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials not configured");
  }

  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency || "INR",
      receipt: params.receipt,
      notes: params.notes || {},
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Razorpay order creation failed: ${error}`);
  }

  return response.json();
}
