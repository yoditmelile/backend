require('dotenv').config(); 
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const contactEmail = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER_JOB, 
    pass: process.env.EMAIL_PASS_JOB, 
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});


router.post("/register-affiliate", (req, res) => {
  const { firstName, lastName, email, phone, preferredProgram, interest } = req.body;

  const mail = {
    from: email,
    to: "jobs@perspective.et",
    subject: "New Affiliate Registration",
    html: `
      <h2>New Affiliate Registration</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Preferred Program:</strong> ${preferredProgram}</p>
      <p><strong>Interest:</strong> ${interest}</p>
    `,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Registration successful! We'll contact you soon." });
    }
  });
});

module.exports = router;