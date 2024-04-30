import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    // Utilizzare .json() per ottenere il corpo della richiesta
    const data = await req.json();
    const { session_Id } = data;

    // Recupera i dettagli della sessione di pagamento da Stripe
    const session = await stripe.checkout.sessions.retrieve(session_Id);

    // Crea un oggetto con la risposta
    let responseBody = {};

    if (session.payment_status === 'paid') {
      // Pagamento verificato
      responseBody = { message: 'Pagamento verificato' };
      return new NextResponse(JSON.stringify(responseBody), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Pagamento non verificato
      responseBody = { message: 'Pagamento non verificato' };
      return new NextResponse(JSON.stringify(responseBody), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    // Gestire l'errore
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}