import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    return NextResponse.json(checkoutSession)
  } catch(error) {
    console.error('error retrieving checkout session:', error)
    return NextResponse.json({error: {message: error.message}}, {status: 500})
  }
}

export async function POST(req) {
  const { amount, subscriptionType } = await req.json();

  let subscriptionName;
  let interval = "month"
  let unitAmount;

  switch (amount) {
    case 0:
      subscriptionName = "Free Subscription";
      break;
    case 3.99:
      subscriptionName = subscriptionType == annual ? "Basic Annual Subscription" : "Basic Subscription";
      unitAmount = subscriptionType == annual ? 49.99 : 3.99;
      break;
    case 14.99:
      subscriptionName = subscriptionType == annual ? "Custom Annual Subscription" : "Custom Subscription";
      unitAmount = subscriptionType == annual ? 179.88 : 14.99;
      break;
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
          unit_amount: formatAmountForStripe(amount),
          recurring: {
            interval: annual ? "annual" : "month",
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      'origin',
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      'origin',
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession = await stripe.checkout.sessions.create(params);

  return NextResponse.json(checkoutSession, {
    status: 200,
  });
}
