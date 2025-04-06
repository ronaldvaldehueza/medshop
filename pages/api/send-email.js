import nodemailer from "nodemailer";

export const config = {
    api: {
      bodyParser: {
        sizeLimit: "10mb", // Set the size limit as needed (e.g., "5mb" or "10mb")
      },
    },
  };

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, text, html, attachment } = req.body;

    try {
      // Configure the email transporter for SmarterASP.NET
      const transporter = nodemailer.createTransport({
        host: "mail.tradeforceuae.com", 
        port: 8889, // Common SMTP port
        secure: false, // Use false for port 587
        auth: {
          user: "no-reply@tradeforceuae.com", 
          pass: "tigHimo!#163", 
        },
        tls: {
          rejectUnauthorized: false, // Add if TLS issues is encountered
        },
      });

      // Email options
      const mailOptions = {
        from: 'no-reply@tradeforceuae.com', // Sender email address
        to, // Recipient email, dynamically passed fr request body
        cc: "ams.sales@tradeforceuae.com",
        subject,
        text,
        html,
        ...(attachment && attachment.fileName && attachment.file && { 
            attachments: [
              {
                filename: attachment.fileName,
                content: attachment.file, // Base64 or Buffer
                encoding: "base64",
                cid: attachment.cid,
              },
            ],
          }),
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Respond with success
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
