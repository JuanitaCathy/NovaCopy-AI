import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { MovingBorderButton } from '../components/Submit'; // Adjust import path as necessary

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactUS() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(e.target.name);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {
      name: formData.name ? '' : 'Name is required',
      email: /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Valid email is required',
      subject: formData.subject ? '' : 'Subject is required',
      message: formData.message ? '' : 'Message is required'
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(x => x === '');
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitStatus('Submitting...');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setSubmitStatus(data.message);
      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus('Failed to send message.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-white text-3xl font-bold mb-6">Contact Us!</h2>
      <form className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 flex text-white mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`w-full p-4 border border-white/16 rounded-xl ${focusedField === 'name' ? 'border-pink-500' : ''} ${errors.name ? 'border-red-500' : ''} bg-transparent`}
              placeholder="John Wick"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 flex text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`w-full p-4 border border-white/16 rounded-xl ${focusedField === 'email' ? 'border-pink-500' : ''} ${errors.email ? 'border-red-500' : ''} bg-transparent`}
              placeholder="johnwick@gmail.com"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-700 flex text-white mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`w-full p-4 border border-white/16 rounded-xl ${focusedField === 'subject' ? 'border-pink-500' : ''} ${errors.subject ? 'border-red-500' : ''} bg-transparent`}
              placeholder="Subject"
              required
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>
        </div>

        <div className="flex-1">
          <div>
            <label htmlFor="message" className="block text-gray-700 flex text-white mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`w-full p-4 border border-white/16 rounded-xl ${focusedField === 'message' ? 'border-pink-500' : ''} ${errors.message ? 'border-red-500' : ''} bg-transparent`}
              placeholder="Your message"
              rows={10}
              required
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
        </div>
      </form>
      <div className="mt-5">
        <MovingBorderButton onClick={handleSubmit} />
      </div>
      {submitStatus && <p className="mt-4 text-center text-white">{submitStatus}</p>}
    </div>
  );
}
