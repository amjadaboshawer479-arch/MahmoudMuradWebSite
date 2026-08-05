import { Resend } from 'resend';

let client = null;

function getClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

/**
 * Sends a "new review" notification email to the clinic owner.
 *
 * Deliberately isolated from the review-saving logic: this function
 * never throws — if email sending fails or isn't configured, it just
 * logs a warning and returns. A patient's review must never be lost
 * or delayed because of an email problem.
 */
export async function sendNewReviewEmail(review) {
  const resend = getClient();
  const toEmail = process.env.NOTIFY_TO_EMAIL;
  const fromEmail = process.env.NOTIFY_FROM_EMAIL;

  if (!resend || !toEmail || !fromEmail) {
    console.warn('Email notifications not configured — skipping (this is fine, the review was saved).');
    return;
  }

  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  const adminUrl = process.env.CORS_ORIGIN
    ? `${process.env.CORS_ORIGIN.split(',')[0]}/admin`
    : '';

  try {
    await resend.emails.send({
      from: `Dr. Mahmoud Murad Website <${fromEmail}>`,
      to: toEmail,
      subject: `تقييم جديد من ${review.name} — بانتظار الموافقة`,
      html: `
        <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #F5EFE0; border-radius: 8px;">
          <h2 style="color: #2A3316; margin: 0 0 4px;">تقييم جديد بانتظار موافقتك</h2>
          <p style="color: #6B6853; font-size: 13px; margin: 0 0 20px;">وصل تقييم جديد من مريض على موقعك.</p>
          <div style="background: #FBF6EA; border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 6px;"><strong>الاسم:</strong> ${review.name}</p>
            <p style="margin: 0 0 6px; color: #B8955E; font-size: 18px;">${stars}</p>
            <p style="margin: 0; color: #4A5237; line-height: 1.7;">${review.text}</p>
          </div>
          ${
            adminUrl
              ? `<a href="${adminUrl}" style="display:inline-block; background:#3D4E1F; color:#FBF6EA; text-decoration:none; padding:10px 22px; border-radius:999px; font-size:13px;">افتح لوحة التحكم للموافقة عليه</a>`
              : ''
          }
        </div>
      `,
    });
    console.log(`Review notification email sent to ${toEmail}`);
  } catch (err) {
    console.warn('Failed to send review notification email:', err.message);
  }
}