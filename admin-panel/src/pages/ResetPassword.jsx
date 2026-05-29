import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'sonner';
import { Mail, Loader2, ArrowRight } from "lucide-react";

export default function ResetPassword() {
          const [email, setEmail] = useState('');
          // message state is kept if you want to use it elsewhere, but we removed the conditional hiding of the form
          const [message, setMessage] = useState('');
          const { resetPassword } = useAuth();
          const [loading, setLoading] = useState(false);
          const [cooldown, setCooldown] = useState(0); // Cooldown timer in seconds

          // Timer logic for 1.5 minutes (90 seconds)
          useEffect(() => {
                    let timer;
                    if (cooldown > 0) {
                              timer = setInterval(() => {
                                        setCooldown((prev) => prev - 1);
                              }, 1000);
                    }
                    return () => clearInterval(timer);
          }, [cooldown]);

          const handleReset = async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setMessage('');

                    try {
                              await sendPasswordResetEmail(auth, email);
                              setMessage('Check your inbox for the reset link.');
                              toast.success("Reset email sent successfully!");
                              setCooldown(90); // Start 90 seconds cooldown
                    } catch (err) {
                              console.error(err);
                              setMessage('Error: Could not send reset email. Please check your email address.');
                              toast.error("Failed to send email.");
                    } finally {
                              setLoading(false);
                    }
          };

          // Format seconds into MM:SS
          const formatTime = (seconds) => {
                    const m = Math.floor(seconds / 60);
                    const s = seconds % 60;
                    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
          };

          const isFormDisabled = loading || cooldown > 0;

          return (
                    <div className="md:min-h-screen md:flex md:items-center md:justify-center bg-[#Fef9f2] py-30 px-8 md:p-4">
                              <div className="w-full max-w-[480px] bg-white border rounded-2xl border-[#D1CDC7] p-7 md:p-12 shadow-lg">
                                        <div className="mb-10 text-center flex flex-col gap-y-5">
                                                  <h1 className="font-display text-xl md:text-2xl font-extrabold text-primary tracking-wider text-shadow-2xs">
                                                            Reset Password
                                                  </h1>
                                                  <p className="text-sm text-gray-600 leading-relaxed">
                                                            Enter your email address and we will send you a link to reset your password.
                                                  </p>
                                        </div>

                                        <form onSubmit={handleReset} className="space-y-8">
                                                  <div className="group">
                                                            <label className={`block pb-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors ${isFormDisabled ? 'text-gray-400' : 'text-on-surface group-focus-within:text-primary'}`}>
                                                                      Email Address
                                                            </label>
                                                            <div className="relative">
                                                                      <Mail
                                                                                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[18px] w-[18px] transition-colors ${isFormDisabled ? 'text-gray-300' : 'text-gray-400 group-focus-within:text-primary'}`}
                                                                                strokeWidth={1.5}
                                                                      />
                                                                      <input
                                                                                type="email"
                                                                                value={email}
                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                disabled={isFormDisabled}
                                                                                className={`w-full border-b outline-none py-2 pl-7 bg-transparent transition-colors ${isFormDisabled
                                                                                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                                                                          : 'border-gray-300 focus:border-black text-black'
                                                                                          }`}
                                                                                placeholder="e.g. admin@maisonedit.com"
                                                                                required
                                                                      />
                                                            </div>
                                                  </div>
                                                  <button
                                                            type="submit"
                                                            disabled={isFormDisabled}
                                                            className={`group relative flex w-full items-center justify-center overflow-hidden rounded-md py-4 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-300 ${isFormDisabled
                                                                      ? "cursor-not-allowed bg-secondary/80 text-on-surface/50"
                                                                      : "bg-primary text-on-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                                                                      }`}
                                                  >
                                                            <span className="flex items-center gap-2">
                                                                      {loading ? (
                                                                                <>
                                                                                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                                                                                          Sending...
                                                                                </>
                                                                      ) : cooldown > 0 ? (
                                                                                <>Resend in {formatTime(cooldown)}</>
                                                                      ) : (
                                                                                <>
                                                                                          Send Reset Link
                                                                                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                                                                                </>
                                                                      )}
                                                            </span>
                                                  </button>
                                        </form>

                                        <div className="mt-5 pt-5 border-t border-gray-200 text-center">
                                                  <Link to="/login" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition">
                                                            &larr; Back to Login
                                                  </Link>
                                        </div>
                              </div>
                    </div>
          );
}