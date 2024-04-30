import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { urlToUrlWithoutFlightMarker } from 'next/dist/client/components/app-router';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    try {
      const body = await req.json();

      // Debugging: Log body.cartItems to ensure it's valid
      console.log('Cart Items:', body.cartItems);

      const lineItems = body.cartItems.map((item: any) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
            },
            unit_amount: Number(Math.round(item.price * 100)),
          },
          quantity: item.quantity,
        };
      });

      // Debugging: Log lineItems to ensure they are correctly populated
      console.log('Line Items:', lineItems);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", 'klarna', 'paypal', 'sofort'],
        line_items: lineItems, // Use the lineItems variable
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["IT", "US", "GB", "CA"],
        },
        success_url: `${req.headers.get(
          "Origin"
        )}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("Origin")}/cancel`,
      });

      return NextResponse.json(session);
    } catch (err) {
      console.error('Error:', err);

      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
