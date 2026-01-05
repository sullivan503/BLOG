import React, { useState } from 'react';
import { Mail, CheckCircle, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { submitNewsletter } from '../services/wpService';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Call generic WP service to send email
    const result = await submitNewsletter(email);

    if (result.success) {
        setStatus('success');
        setEmail('');
    } else {
        setStatus('error');
        setMsg(result.message);
    }
  };

  return (
    <div className="bg-accent rounded-2xl p-8 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
      {/* Abstract background pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-black rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-white/20 border border-white/20 rounded-xl mb-8 backdrop-blur-sm">
          <Mail className="text-white" size={28} />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">
          Join the inner circle.
        </h2>
        <p className="text-white/80 mb-10 text-lg leading-relaxed">
          Get weekly insights on frontend architecture, VPS management, and design philosophy. No noise, just signal.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center space-x-3 text-white bg-white/20 py-4 px-6 rounded-xl animate-fade-in border border-white/30">
            <CheckCircle size={24} />
            <span className="font-medium">Welcome aboard. Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="feng@example.com"
              className="flex-grow px-6 py-4 rounded-lg bg-white text-primary placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all font-medium"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 bg-primary text-white font-bold rounded-lg transition-all hover:bg-black hover:shadow-lg flex items-center justify-center disabled:opacity-70"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <span className="flex items-center">Subscribe <ArrowRight size={16} className="ml-2"/></span>
              )}
            </button>
            
            {status === 'error' && (
                 <div className="absolute -bottom-12 left-0 w-full text-center text-white/90 text-sm flex items-center justify-center bg-red-900/50 p-2 rounded">
                    <AlertCircle size={14} className="mr-1" />
                    {msg || "Subscription failed."}
                 </div>
            )}
          </form>
        )}
        <p className="text-white/60 text-xs mt-6 font-mono">
          Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterForm;