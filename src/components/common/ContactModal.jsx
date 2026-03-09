"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { X, Send, Terminal, Mail, MapPin, Phone } from 'lucide-react';

const API_ENDPOINT = 'https://abhijeet-kumar.vercel.app/api/contact-us';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset closing state when modal opens
  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Please! Enter your name";
    if (!formData.subject) newErrors.subject = "Please! Enter the subject";
    if (!formData.email) {
      newErrors.email = "Please! Enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone) newErrors.phone = "Please! Enter your phone number";
    if (!formData.message) newErrors.message = "Write your message here";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(API_ENDPOINT, formData);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Thank You! 😍',
          text: response.data.message || 'Your message has been sent successfully!',
          confirmButtonColor: '#c778dd',
        });
        setFormData({ name: "", subject: "", email: "", phone: "", message: "" });
        handleClose();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
        confirmButtonColor: '#c778dd',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${isClosing ? 'pointer-events-none' : ''}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-3xl bg-card border border-accent/30 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}>

        {/* HUD Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 shrink-0">
          <span className="font-mono text-sm uppercase tracking-widest text-accent flex items-center gap-2">
            <Terminal size={18} className="animate-pulse" />
            Contact_Establishment
          </span>
          <button onClick={handleClose} className="text-foreground/40 hover:text-accent cursor-pointer transition-all p-1 hover:rotate-90 duration-300">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

            {/* Left Info: Contact Details */}
            <div className="hidden md:block col-span-2 space-y-8 border-r border-border/50 pr-8">
              <h3 className="text-xl font-mono text-foreground font-bold underline decoration-accent decoration-2 underline-offset-8">
                System_Info
              </h3>
              <div className="space-y-6 font-mono text-sm text-foreground/60">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-accent shrink-0" />
                  <span>New Delhi, India</span>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-accent shrink-0" />
                  <a href="tel:+919973278402" className="hover:text-accent transition-colors">+91 99732 78402</a>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-accent shrink-0" />
                  <a href="mailto:aryaabhi84@gmail.com" className="hover:text-accent transition-colors break-all">aryaabhi84@gmail.com</a>
                </div>
              </div>

              <div className="pt-4 opacity-20 font-mono text-[10px] space-y-1">
                <p>&gt; STATUS: ONLINE</p>
                <p>&gt; ENCRYPTION: ACTIVE</p>
                <p>&gt; LOCATION_ID: 28.6139_N_77.2090_E</p>
              </div>
            </div>

            {/* Right Section: Form Fields - Now in Single Rows */}
            <div className="col-span-1 md:col-span-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={errors.name || "User_Name*"}
                  className={`bg-background border ${errors.name ? 'border-red-500' : 'border-border'} p-3 text-sm font-mono outline-none focus:border-accent w-full transition-all`}
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={errors.subject || "Subject_Line*"}
                  className={`bg-background border ${errors.subject ? 'border-red-500' : 'border-border'} p-3 text-sm font-mono outline-none focus:border-accent w-full transition-all`}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={errors.email || "Email_Address*"}
                  className={`bg-background border ${errors.email ? 'border-red-500' : 'border-border'} p-3 text-sm font-mono outline-none focus:border-accent w-full transition-all`}
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={errors.phone || "Phone_Number*"}
                  className={`bg-background border ${errors.phone ? 'border-red-500' : 'border-border'} p-3 text-sm font-mono outline-none focus:border-accent w-full transition-all`}
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={errors.message || "Message_Payload*"}
                  className={`bg-background border ${errors.message ? 'border-red-500' : 'border-border'} p-3 text-sm font-mono outline-none focus:border-accent w-full h-32 md:h-36 resize-none transition-all`}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-accent text-background font-mono text-sm uppercase tracking-widest hover:bg-accent/90 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 font-bold"
                >
                  {isLoading ? "Transmitting_Data..." : "Send_Packet"}
                  {!isLoading && <Send size={18} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Decorative HUD Brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent/20 pointer-events-none"></div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fade-out {
          animation: fadeOut 0.3s ease-in forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-out {
          animation: scaleOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scaleOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95) translateY(10px); }
        }
      `}</style>
    </div>
  );
}