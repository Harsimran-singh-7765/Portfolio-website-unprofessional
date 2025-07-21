import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/personal';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.contact.phone,
      href: `tel:${personalInfo.contact.phone.replace(/\D/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.contact.location,
      href: '#',
    },
  ];

  return (

<section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
  {/* BACKGROUND ORBS */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ce4993] rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#fb9062] rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-6xl mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
        Summon <span className="text-[#ee5d6c]">Scroll</span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-[#fb9062] to-[#6a0d83] mx-auto mb-4"></div>
      <p className="text-gray-300 font-vt323 text-lg">Ready to start your next digital quest?</p>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-12">
      {/* 📮 FORM */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="contact-form bg-black/40 border border-[#ee5d6c] rounded-lg p-4 md:p-8 backdrop-blur-sm"
      >
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-2">Send Message</h3>
          <div className="w-16 h-1 bg-[#ee5d6c]"></div>
        </div>

        <form action="https://formsubmit.co/Harsimransingh7765@gmail.com" method="POST" className="space-y-6">
          {/* hidden inputs unchanged... */}

          <div>
            <label className="block text-[#fb9062] font-vt323 text-base md:text-lg mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-black/60 border border-gray-600 rounded-lg px-4 py-3 text-white font-vt323 focus:border-[#fb9062] focus:outline-none focus:ring-2 focus:ring-[#fb9062]/50 transition-all duration-300"
              placeholder="Enter your name..."
            />
          </div>

          <div>
            <label className="block text-[#fb9062] font-vt323 text-base md:text-lg mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-black/60 border border-gray-600 rounded-lg px-4 py-3 text-white font-vt323 focus:border-[#fb9062] focus:outline-none focus:ring-2 focus:ring-[#fb9062]/50 transition-all duration-300"
              placeholder="Enter your email..."
            />
          </div>

          <div>
            <label className="block text-[#fb9062] font-vt323 text-base md:text-lg mb-2">Message</label>
            <textarea
              name="message"
              required
              rows={6}
              className="w-full bg-black/60 border border-gray-600 rounded-lg px-4 py-3 text-white font-vt323 focus:border-[#fb9062] focus:outline-none focus:ring-2 focus:ring-[#fb9062]/50 transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#fb9062] to-[#6a0d83] text-white py-3 md:py-4 rounded-lg font-orbitron font-bold text-base md:text-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[#fb9062]/50 transition-all duration-300"
          >
            <Send size={20} />
            <span>Cast Spell</span>
          </motion.button>
        </form>
      </motion.div>

      {/* 🧭 CONTACT INFO */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-4">Contact Info</h3>
          <p className="text-gray-300 font-vt323 text-base md:text-lg leading-relaxed">
            Ready to embark on a digital adventure? Let's connect and build something amazing together.
          </p>
        </div>

        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.label}
              href={info.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-black/40 border border-gray-700 rounded-lg hover:border-[#ce4993] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#ce4993] to-[#fb9062] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-[#ce4993] font-vt323 text-sm">{info.label}</div>
                <div className="text-white font-orbitron text-sm md:text-base">{info.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* 🌐 SOCIAL LINKS */}
        <div className="pt-8">
          <h4 className="text-lg md:text-xl font-orbitron font-bold text-white mb-4">Connect</h4>
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/Harsimran-singh-7765"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="w-12 h-12 bg-black/70 border border-[#ce4993] rounded-lg flex items-center justify-center text-white hover:bg-[#ce4993]/80 transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/harsimran-singh-6b9aaa303/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="w-12 h-12 bg-black/70 border border-[#6a0d83] rounded-lg flex items-center justify-center text-white hover:bg-[#6a0d83]/80 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>
  );
};

export default Contact;
