// app/api/sendBookingEmail/route.js
import sgMail from '@sendgrid/mail';
import axios from 'axios';
import cookie from 'cookie';

console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY); // Aggiungi questo log

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, participants, message, experienceTitle } = await req.json();

    const cookies = cookie.parse(req.headers.get('cookie') || '');
    const userId = cookies.user_id;

    if (!userId) {
      return new Response(JSON.stringify({ message: 'User ID non trovato nei cookie' }), { status: 400 });
    }

    const userResponse = await axios.get(`https://hunt4taste.it/api/utenti/${userId}`);
    const companyEmail = userResponse.data.user.company_email;

    if (!companyEmail) {
      return new Response(JSON.stringify({ message: 'Company email non trovata' }), { status: 404 });
    }

    const msg = {
      to: companyEmail,
      from: 'info@luxorweb.it',
      subject: `Nuova Prenotazione per ${experienceTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
          <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eaeaea;">
            <img src="https://via.placeholder.com/600x200" alt="Logo" style="width: 100%; height: auto; border-radius: 10px 10px 0 0;" />
            <h1 style="color: #485d8b;">Nuova Prenotazione per ${experienceTitle}</h1>
          </header>
          <main style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.5;">Hai ricevuto una nuova prenotazione. Ecco i dettagli dell'utente:</p>
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <p style="font-size: 16px; margin: 10px 0;"><strong>Nome:</strong> ${name}</p>
              <p style="font-size: 16px; margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="font-size: 16px; margin: 10px 0;"><strong>Telefono:</strong> ${phone}</p>
              <p style="font-size: 16px; margin: 10px 0;"><strong>Numero di Partecipanti:</strong> ${participants}</p>
              <p style="font-size: 16px; margin: 10px 0;"><strong>Messaggio:</strong> ${message}</p>
            </div>
            <a href="https://hunt4taste.it/dashboard" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #485d8b; color: #fff; text-decoration: none; border-radius: 5px;">Visualizza Prenotazione</a>
          </main>
          <footer style="text-align: center; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 14px; color: #777;">
            <p>Grazie per utilizzare il nostro servizio.</p>
            <p>&copy; 2024 Luxor Web. All rights reserved.</p>
          </footer>
        </div>
      `,
    };

    await sgMail.send(msg);
    return new Response(JSON.stringify({ message: 'Email inviata con successo' }), { status: 200 });
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error);
    return new Response(JSON.stringify({ message: 'Errore durante l\'invio dell\'email' }), { status: 500 });
  }
}
