import sgMail from '@sendgrid/mail';

export function sendEmail() {
  sgMail.setApiKey(process.env.SG_KEY);
  const msg = {
    to: 'alexalexx3@gmail.com', // Change to your recipient
    from: 'noreply@coldtipz.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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