import sgMail from '@sendgrid/mail';

export function sendEmail({email, subject, message, html}) {
  sgMail.setApiKey(process.env.SG_KEY);

  const msg = {
    to: email, // Change to your recipient
    from: 'noreply@coldtipz.com', // Change to your verified sender
    subject: subject,
    text: message,
    html: html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}