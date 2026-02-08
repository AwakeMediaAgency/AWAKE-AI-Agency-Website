import React, { useState } from 'react';
import { Mail, User, Globe, ArrowRight, Sparkles, MessageSquare, Building2, AlertCircle } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    companyName: '',
    website: '',
    concerns: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const defaultPassword = 'TempPassword123!';

    try {
      if (isLogin) {
        // --- LOGIN MODE ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: defaultPassword,
        });

        if (error) throw error;
        if (data.session) {
          navigate('/dashboard');
        }
      } else {
        // --- SIGNUP MODE ---
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: defaultPassword,
          options: {
            data: {
              full_name: formData.fullName,
              company_name: formData.companyName,
              website: formData.website,
              concerns: formData.concerns
            }
          }
        });

        if (authError) throw authError;

        if (authData.user) {
          // If already confirmed or just created
          if (authData.session) {
            navigate('/dashboard');
          } else {
            setError('Account created! Please check your email to confirm before logging in.');
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-black px-6 py-32" id="signup">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#1f75fe] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-900 rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 shadow-[0_0_60px_rgba(31,117,254,0.4)]">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-black mb-4 uppercase italic tracking-tighter">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-xl text-gray-400 font-light">
            {isLogin ? 'Access your personalized dashboard' : 'Unlock your personalized high-conversion dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-blue/10 to-transparent blur-xl -z-10 group-hover:opacity-100 opacity-50 transition-opacity"></div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group/input">
                  <label htmlFor="fullName" className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-brand-blue transition-colors" />
                    <input
                      id="fullName"
                      required={!isLogin}
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue transition-all"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                </div>

                <div className="group/input">
                  <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-brand-blue transition-colors" />
                    <input
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue transition-all"
                      placeholder="you@example.com"
                      type="email"
                    />
                  </div>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="group/input">
                <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-brand-blue transition-colors" />
                  <input
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue transition-all"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>
              </div>
            )}


            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group/input">
                    <label htmlFor="companyName" className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-brand-blue transition-colors" />
                      <input
                        id="companyName"
                        required={!isLogin}
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue transition-all"
                        placeholder="Acme Corp"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="group/input">
                    <label htmlFor="website" className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Website URL</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-brand-blue transition-colors" />
                      <input
                        id="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue transition-all"
                        placeholder="https://yourwebsite.com"
                        type="url"
                      />
                    </div>
                  </div>
                </div>

                <div className="group/input">
                  <label htmlFor="concerns" className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">What concerns are you facing?</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-gray-400 group-focus-within/input:text-brand-blue transition-colors" />
                    <textarea
                      id="concerns"
                      value={formData.concerns}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue transition-all min-h-[100px] resize-none"
                      placeholder="Tell us more about your challenges..."
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-6 bg-brand-blue hover:bg-blue-700 text-white font-black text-lg rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(31,117,254,0.5)] active:scale-95 uppercase tracking-widest italic disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (isLogin ? 'Logging in...' : 'Creating Dashboard...') : (isLogin ? 'Login to Dashboard' : 'Access Dashboard')} <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand-blue hover:underline ml-2"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
