import React, { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import { MovingBorderButton } from '../components/Submit';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showAlert, setShowAlert] = useState<boolean>(false);

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
        setShowAlert(true);
      }
    } catch (error) {
      setSubmitStatus('Failed to send message.');
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="max-w-2xl mx-auto mt-10 md:mt-0">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-8 mb-8">Contact Us!</h2>
      <form className="flex flex-col gap-6">
        <div className="w-100 flex flex-col md:flex-row gap-6">
          <div className="flex-grow">
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
          <div className="flex-grow">
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

      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-8 right-4 bg-slate-800 text-white px-6 py-4 rounded-lg shadow-lg z-50"
          >
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
