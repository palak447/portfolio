const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

async function createContact(req, res, next) {
  try {
    const { name, email, message } = req.body || {};
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }

    const contact = {
      name: cleanText(name),
      email: cleanText(email).toLowerCase(),
      message: cleanText(message),
    };
    if (contact.name.length < 2 || contact.name.length > 80) {
      return res.status(400).json({ message: 'Name must be between 2 and 80 characters.' });
    }
    if (contact.email.length > 254 || !emailPattern.test(contact.email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    if (contact.message.length < 10 || contact.message.length > 2000) {
      return res.status(400).json({ message: 'Message must be between 10 and 2000 characters.' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Contact submissions are temporarily unavailable. Please email me directly.' });
    }

    const saved = await Contact.create(contact);
    let notification = 'not_configured';
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          replyTo: contact.email,
          subject: `Portfolio message from ${contact.name}`,
          text: `Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`,
        });
        notification = 'sent';
      } catch (error) {
        notification = 'failed';
        console.error('Contact notification email failed:', error.message);
      }
    }
    return res.status(201).json({
      message: 'Your message has been received.',
      notification: notification === 'failed' ? 'Message saved, but email notification could not be sent.' : notification,
      id: saved.id,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createContact };
