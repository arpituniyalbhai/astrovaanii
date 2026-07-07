import crypto from "crypto";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export interface VerifyPaymentParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface VerifyPaymentResult {
  valid: boolean;
  error?: string;
}

export function verifyRazorpayPayment(params: VerifyPaymentParams): VerifyPaymentResult {
  if (!RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay key secret not configured");
  }

  const { orderId, paymentId, signature } = params;

  const generatedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const isValid = generatedSignature === signature;

  return {
    valid: isValid,
    error: isValid ? undefined : "Invalid payment signature",
  };
}

export async function fetchPaymentDetails(paymentId: string): Promise<any> {
  if (!RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay key secret not configured");
  }

  const RAZORPAY_KEY_ID = process.env.RAZORPAY_LIVE_API;
  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch payment details: ${error}`);
  }

  return response.json();
}
