import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100); // Stripe expects amounts in cents
};

export async function POST(req) {
  const { amount, subscriptionType } = await req.json();

  let subscriptionName;
  let interval = subscriptionType === 'annually' ? 'year' : 'month';
  let unitAmount = formatAmountForStripe(amount);

  switch (amount) {
    case 0:
      subscriptionName = "Free Subscription";
      break;
    case 3.99:
      subscriptionName = subscriptionType === 'annually' ? "Basic Annual Subscription" : "Basic Monthly Subscription";
      unitAmount = subscriptionType === 'annually' ? formatAmountForStripe(49.99) : formatAmountForStripe(3.99);
      break;
    case 14.99:
      subscriptionName = subscriptionType === 'annually' ? "Custom Annual Subscription" : "Custom Monthly Subscription";
      unitAmount = subscriptionType === 'annually' ? formatAmountForStripe(179.88) : formatAmountForStripe(14.99);
      break;
    default:
      return NextResponse.json({ error: { message: 'Invalid amount' } }, { status: 400 });
  }

  const params = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: subscriptionName,
          },
          unit_amount: unitAmount,
          recurring: {
            interval: interval,
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  try {
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}
