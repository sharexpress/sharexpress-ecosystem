import React, { useState } from 'react';
import { Mail, Calendar, LayoutGrid, CheckCircle, Loader2, ArrowUpRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
    <section id="contact" className="relative bg-transparent py-20 md:py-28 px-6 z-10">
      {/* Header section spacing */}

      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label mb-6 block">
              Get In Touch
            </span>
            <h3 className="heading-display text-[clamp(34px,5.5vw,60px)] text-white mb-7">
              <span className="text-gradient-premium">Initiate Connection.</span>
            </h3>
            <p className="body-text text-[16px] mb-16 max-w-[460px] leading-[1.8]">
              Contact our systems engineering team to discuss custom product integration, infrastructure consultation, or enterprise partnership opportunities.
            </p>

            {/* Contact Cards */}
            <div className="flex flex-col gap-3 mb-12">
              <a 
                href="mailto:contact@sharexpress.in"
                onMouseMove={handleMouseMove}
                className="flex items-center gap-4 px-6 py-5 premium-card group overflow-hidden"
                style={{ '--glow-color': '139, 92, 246' }}
              >
                <div className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-violet-500/25 group-hover:bg-violet-500/5 transition-all duration-500">
                  <Mail size={17} className="text-white/35 group-hover:text-violet-400 transition-colors duration-500" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[10px] tracking-[0.08em] text-white/25 uppercase font-medium mb-1">Secure Communications</p>
                  <p className="text-[14px] font-medium text-white/75">contact@sharexpress.in</p>
                </div>
                <ArrowUpRight size={15} className="text-white/10 group-hover:text-white/40 transition-all duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </a>

              <a 
                href="https://calendly.com/sharexpress" 
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                className="flex items-center gap-4 px-6 py-5 premium-card group overflow-hidden"
                style={{ '--glow-color': '6, 182, 212' }}
              >
                <div className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-cyan-500/25 group-hover:bg-cyan-500/5 transition-all duration-500">
                  <Calendar size={17} className="text-white/35 group-hover:text-cyan-400 transition-colors duration-500" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[10px] tracking-[0.08em] text-white/25 uppercase font-medium mb-1">Synchronous Call</p>
                  <p className="text-[14px] font-medium text-white/75">Schedule Technical Review</p>
                </div>
                <ArrowUpRight size={15} className="text-white/10 group-hover:text-white/40 transition-all duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </a>
            </div>

            <button 
              onClick={() => scrollToSection('products')}
              className="flex items-center gap-2.5 text-[12px] tracking-[0.06em] uppercase text-white/20 hover:text-white/50 transition-colors duration-500 font-medium"
            >
              <LayoutGrid size={13} />
              <span>Explore Products</span>
            </button>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            className="premium-card p-8 md:p-10 relative overflow-hidden"
            style={{ '--glow-color': '255, 255, 255' }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center mb-7">
                  <CheckCircle size={30} className="text-emerald-400" />
                </div>
                <h4 className="text-[26px] font-semibold tracking-[-0.03em] text-white mb-3">Inquiry Received</h4>
                <p className="text-[14px] text-white/35 font-normal max-w-sm leading-[1.75] mb-10">
                  Thank you for contacting ShareXpress. Our systems engineering team will respond within 24 hours.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="btn-secondary text-[13px] py-3 px-6"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
               <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-3">
                  <h4 className="text-[20px] font-semibold tracking-[-0.02em] text-white mb-1.5">Submit Architecture Inquiry</h4>
                  <p className="text-[13px] text-white/30 font-normal">Provide your operational requirements and our team will get in touch.</p>
                </div>

                <div>
                  <label htmlFor="name" className="block text-[11px] tracking-[0.06em] text-white/30 uppercase font-medium mb-2.5">
                    Full Name <span className="text-white/15">*</span>
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
                  <label htmlFor="email" className="block text-[11px] tracking-[0.06em] text-white/30 uppercase font-medium mb-2.5">
                    Corporate Email Address <span className="text-white/15">*</span>
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
                  <label htmlFor="company" className="block text-[11px] tracking-[0.06em] text-white/30 uppercase font-medium mb-2.5">
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
                  <label htmlFor="message" className="block text-[11px] tracking-[0.06em] text-white/30 uppercase font-medium mb-2.5">
                    Operational Requirements <span className="text-white/15">*</span>
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="premium-input resize-none"
                    placeholder="Describe your technical or integration requirements..."
                    required
                  ></textarea>
                </div>

                {error && (
                  <div className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-red-500/5 border border-red-500/10">
                    <p className="text-[13px] text-red-400/80 font-normal">{error}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-white hover:bg-white/95 hover:shadow-[0_6px_28px_rgba(255,255,255,0.18)] text-black rounded-2xl font-semibold text-[14px] tracking-[-0.005em] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-3 active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Initiating Connection...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
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
