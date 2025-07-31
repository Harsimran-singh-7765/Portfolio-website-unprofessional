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

<section id="contact" className="py-20 matrix-bg relative overflow-hidden transition-all duration-1000">
  {/* BACKGROUND ORBS */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-6xl mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-death-note font-bold text-white mb-4">
        CONTACT <span className="text-green-400 glow-green">PROTOCOL</span>
      </h2>
      <div className="w-24 h-1 bg-green-400 mx-auto mb-4 shadow-lg shadow-green-400/50"></div>
      <p className="text-gray-300 font-clean text-lg">READY TO START YOUR NEXT DIGITAL QUEST?</p>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-12">
      {/* 📮 FORM */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="card-gothic-green p-4 md:p-8"
      >
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-gothic font-bold text-white mb-2 uppercase">SEND MESSAGE</h3>
          <div className="w-16 h-1 bg-green-400"></div>
        </div>

        <form action="https://formsubmit.co/Harsimransingh7765@gmail.com" method="POST" className="space-y-6">
          {/* hidden inputs unchanged... */}

          <div>
            <label className="block text-green-400 font-clean text-base md:text-lg mb-2 font-bold uppercase">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-black border-2 border-gray-600 px-4 py-3 text-white font-clean focus:border-green-400 focus:outline-none transition-all duration-300"
              placeholder="Enter your name..."
            />
          </div>

          <div>
            <label className="block text-green-400 font-clean text-base md:text-lg mb-2 font-bold uppercase">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-black border-2 border-gray-600 px-4 py-3 text-white font-clean focus:border-green-400 focus:outline-none transition-all duration-300"
              placeholder="Enter your email..."
            />
          </div>

          <div>
            <label className="block text-green-400 font-clean text-base md:text-lg mb-2 font-bold uppercase">Message</label>
            <textarea
              name="message"
              required
              rows={6}
              className="w-full bg-black border-2 border-gray-600 px-4 py-3 text-white font-clean focus:border-green-400 focus:outline-none transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-gothic-green py-3 md:py-4 text-base md:text-lg flex items-center justify-center space-x-2"
          >
            <Send size={20} />
            <span>TRANSMIT DATA</span>
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
          <h3 className="text-xl md:text-2xl font-gothic font-bold text-white mb-4 uppercase">CONTACT INFO</h3>
          <p className="text-gray-300 font-clean text-base md:text-lg leading-relaxed">
            READY TO EMBARK ON A DIGITAL ADVENTURE? LET'S CONNECT AND BUILD SOMETHING AMAZING TOGETHER.
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
              className={`flex items-center space-x-3 md:space-x-4 p-3 md:p-4 transition-all duration-300 group ${
                index % 2 === 0 ? 'card-gothic-green' : 'card-gothic-purple'
              }`}
            >
              <div className={`w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                index % 2 === 0 ? 'bg-green-400' : 'bg-purple-400'
              }`}>
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className={`font-clean text-sm font-bold uppercase ${
                  index % 2 === 0 ? 'text-green-400' : 'text-purple-400'
                }`}>{info.label}</div>
                <div className="text-white font-clean text-sm md:text-base">{info.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* 🌐 SOCIAL LINKS */}
        <div className="pt-8">
          <h4 className="text-lg md:text-xl font-gothic font-bold text-white mb-4 uppercase">CONNECT</h4>
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/Harsimran-singh-7765"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="w-12 h-12 bg-black border-2 border-green-400 flex items-center justify-center text-white hover:bg-green-400 hover:text-black transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/harsimran-singh-6b9aaa303/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="w-12 h-12 bg-black border-2 border-purple-400 flex items-center justify-center text-white hover:bg-purple-400 hover:text-black transition-all duration-300"
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
