import React, { useState } from 'react';
import { Mail, Calendar, LayoutGrid, CheckCircle, Loader2, ArrowUpRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Server connection error. Storing inquiry logs failed.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="relative bg-transparent py-24 md:py-32 px-6 z-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Info Side */}
          <div className="text-left">
            <span className="section-label mb-5 block">Initiate Connection</span>
            
            <h3 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-6 leading-none">
              <div className="overflow-hidden block py-1">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-gradient-premium block"
                >
                  Secure Ingress.
                </motion.span>
              </div>
            </h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="body-text text-[14px] mb-12 max-w-[440px]"
            >
              Contact our systems engineering team to discuss custom product integration, infrastructure consultation, or enterprise partnership opportunities.
            </motion.p>

            {/* Contact Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="flex flex-col gap-3 mb-10" 
              itemScope 
              itemType="https://schema.org/Organization"
            >
              <meta itemProp="name" content="sharexpress" />
              <meta itemProp="url" content="https://sharexpress.in" />
              
              <a 
                href="mailto:contact@sharexpress.in"
                itemProp="email"
                onMouseMove={handleMouseMove}
                className="premium-card flex items-center gap-4 px-5 py-4 bg-[#0d0d0d] border border-white/[0.04] rounded-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.005] group"
              >
                <div className="w-8 h-8 rounded border border-white/[0.04] bg-white/[0.005] flex items-center justify-center group-hover:border-white/20 transition-colors">
                  <Mail size={13} className="text-white/80" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[9px] font-mono tracking-wider text-white/20 uppercase mb-0.5">Secure Communications</p>
                  <p className="text-[13px] font-mono text-white/70">contact@sharexpress.in</p>
                </div>
                <ArrowUpRight size={12} className="text-white/10 group-hover:text-white transition-colors" />
              </a>

              <a 
                href="https://calendly.com/sharexpress" 
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                className="premium-card flex items-center gap-4 px-5 py-4 bg-[#0d0d0d] border border-white/[0.04] rounded-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.005] group"
              >
                <div className="w-8 h-8 rounded border border-white/[0.04] bg-white/[0.005] flex items-center justify-center group-hover:border-white/20 transition-colors">
                  <Calendar size={13} className="text-white/80" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[9px] font-mono tracking-wider text-white/20 uppercase mb-0.5">Synchronous Call</p>
                  <p className="text-[13px] font-mono text-white/70">Schedule Technical Review</p>
                </div>
                <ArrowUpRight size={12} className="text-white/10 group-hover:text-white transition-colors" />
              </a>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.24 }}
              onClick={() => scrollToSection('products')}
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/20 hover:text-white/50 transition-colors"
            >
              <LayoutGrid size={11} className="text-white/30" />
              <span>Explore Products</span>
            </motion.button>
          </div>

          {/* Form Side with mouse tracking spotlight */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            className="premium-card p-6 md:p-8 relative overflow-hidden border border-white/[0.03] bg-transparent"
          >
            {/* Top architectural marker line — draws dynamically on scroll */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left" 
            />

            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-12 h-12 rounded border border-emerald-500/10 bg-emerald-500/[0.02] flex items-center justify-center mb-6">
                  <CheckCircle size={20} className="text-emerald-400" />
                </div>
                <h4 className="text-[18px] font-mono tracking-wide text-white mb-2">Inquiry Received</h4>
                <p className="text-[13px] text-white/35 font-light max-w-xs leading-relaxed mb-8">
                  Thank you for contacting sharexpress. Our systems engineering team will respond within 24 hours.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="btn-secondary font-mono text-[10px] uppercase tracking-wider py-2.5 px-5"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <h4 className="text-[16px] font-mono tracking-wide text-white mb-1">Submit Architecture Inquiry</h4>
                  <p className="text-[12px] text-white/30 font-light">Provide your operational requirements and our team will get in touch.</p>
                </div>

                <div>
                  <label htmlFor="name" className="block text-[9px] font-mono tracking-widest text-white/30 uppercase mb-2">
                    Full Name <span className="text-white/40">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[9px] font-mono tracking-widest text-white/30 uppercase mb-2">
                    Corporate Email Address <span className="text-white/40">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="jane@company.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-[9px] font-mono tracking-widest text-white/30 uppercase mb-2">
                    Organization / Company
                  </label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[9px] font-mono tracking-widest text-white/30 uppercase mb-2">
                    Operational Requirements <span className="text-white/40">*</span>
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="premium-input resize-none"
                    placeholder="Describe your technical or integration requirements..."
                    required
                  ></textarea>
                </div>

                {error && (
                  <div className="px-4 py-2.5 rounded border border-red-500/10 bg-red-500/[0.02] text-left">
                    <p className="text-[11.5px] text-red-400/80 font-light">{error}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white hover:bg-white/90 text-[#080808] rounded font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      <span>Initiating Connection...</span>
                    </>
                  ) : (
                    <>
                      <Send size={11} />
                      <span>Initialize Communication</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
