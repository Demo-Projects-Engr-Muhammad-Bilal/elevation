import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

export default function UpdatePassword() {
          const [searchParams] = useSearchParams();
          const navigate = useNavigate();

          // URL se oobCode (Firebase ka secret token) nikalna
          const oobCode = searchParams.get('oobCode');

          const [password, setPassword] = useState('');
          const [confirmPassword, setConfirmPassword] = useState('');
          const [showPassword, setShowPassword] = useState(false);
          const [loading, setLoading] = useState(false);
          const [success, setSuccess] = useState(false);

          const handleUpdatePassword = async (e) => {
                    e.preventDefault();

                    if (!oobCode) {
                              toast.error("Invalid or expired password reset link.");
                              return;
                    }

                    if (password !== confirmPassword) {
                              toast.error("Passwords do not match!");
                              return;
                    }

                    if (password.length < 6) {
                              toast.error("Password must be at least 6 characters long.");
                              return;
                    }

                    setLoading(true);

                    try {
                              // Firebase ko naya password update karne ki request
                              await confirmPasswordReset(auth, oobCode, password);
                              setSuccess(true);
                              toast.success("Password updated successfully!");

                              // 3 seconds baad login page par bhej dein
                              setTimeout(() => {
                                        navigate('/login');
                              }, 3000);
                    } catch (err) {
                              console.error(err);
                              toast.error("Failed to update password. Link might be expired.");
                    } finally {
                              setLoading(false);
                    }
          };

          // Agar link mein code hi nahi hai toh error show karein
          if (!oobCode) {
                    return (
                              <div className="min-h-screen flex items-center justify-center bg-[#Fef9f2] p-4 text-center">
                                        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-[#D1CDC7] shadow-lg">
                                                  <h2 className="text-xl font-bold text-red-600 mb-2">Invalid Link</h2>
                                                  <p className="text-sm text-gray-600 mb-6">This password reset link is invalid or has expired.</p>
                                                  <button onClick={() => navigate('/login')} className="text-xs uppercase tracking-widest underline underline-offset-4">
                                                            Back to Login
                                                  </button>
                                        </div>
                              </div>
                    );
          }

          return (
                    <div className="md:min-h-screen md:flex md:items-center md:justify-center bg-[#Fef9f2] py-20 px-8 md:p-4">
                              <div className="w-full max-w-[480px] bg-white border rounded-2xl border-[#D1CDC7] p-7 md:p-12 shadow-lg transition-all">

                                        {!success ? (
                                                  <>
                                                            <div className="mb-10 text-center flex flex-col gap-y-4">
                                                                      <h1 className="font-display text-xl md:text-2xl font-extrabold text-primary tracking-wider text-shadow-2xs">
                                                                                Create New Password
                                                                      </h1>
                                                                      <p className="text-sm text-gray-600 leading-relaxed">
                                                                                Please enter your new password below. Make sure it's at least 6 characters long.
                                                                      </p>
                                                            </div>

                                                            <form onSubmit={handleUpdatePassword} className="space-y-8">
                                                                      {/* New Password */}
                                                                      <div className="space-y-2 group">
                                                                                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-on-surface/70 group-focus-within:text-primary transition-colors">
                                                                                          New Password
                                                                                </label>
                                                                                <div className="relative">
                                                                                          <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                                                                                          <input
                                                                                                    type={showPassword ? "text" : "password"}
                                                                                                    required
                                                                                                    value={password}
                                                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                                                    placeholder="••••••••"
                                                                                                    className="w-full border-b border-gray-300 bg-transparent py-3 pl-8 pr-10 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
                                                                                          />
                                                                                          <button
                                                                                                    type="button"
                                                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 transition-colors hover:text-primary focus:outline-none"
                                                                                          >
                                                                                                    {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
                                                                                          </button>
                                                                                </div>
                                                                      </div>

                                                                      {/* Confirm Password */}
                                                                      <div className="space-y-2 group">
                                                                                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-on-surface/70 group-focus-within:text-primary transition-colors">
                                                                                          Confirm Password
                                                                                </label>
                                                                                <div className="relative">
                                                                                          <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                                                                                          <input
                                                                                                    type={showPassword ? "text" : "password"}
                                                                                                    required
                                                                                                    value={confirmPassword}
                                                                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                                    placeholder="••••••••"
                                                                                                    className="w-full border-b border-gray-300 bg-transparent py-3 pl-8 pr-10 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      {/* Submit Button */}
                                                                      <div className="pt-4">
                                                                                <button
                                                                                          type="submit"
                                                                                          disabled={loading}
                                                                                          className={`group relative flex w-full items-center justify-center overflow-hidden rounded-md py-4 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-300 ${loading
                                                                                                              ? "cursor-not-allowed bg-secondary/80 text-on-surface/50"
                                                                                                              : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
                                                                                                    } bg-black`}
                                                                                >
                                                                                          <span className="flex items-center gap-2">
                                                                                                    {loading ? (
                                                                                                              <>
                                                                                                                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                                                                                                                        Updating...
                                                                                                              </>
                                                                                                    ) : (
                                                                                                              <>
                                                                                                                        Update Password
                                                                                                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                                                                                                              </>
                                                                                                    )}
                                                                                          </span>
                                                                                </button>
                                                                      </div>
                                                            </form>
                                                  </>
                                        ) : (
                                                  /* Success State */
                                                  <div className="text-center py-8 flex flex-col items-center gap-y-4">
                                                            <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-2">
                                                                      <CheckCircle2 className="h-8 w-8 text-green-500" strokeWidth={2} />
                                                            </div>
                                                            <h2 className="font-display text-xl md:text-2xl font-extrabold text-primary tracking-wider">
                                                                      Password Updated
                                                            </h2>
                                                            <p className="text-sm text-gray-600 mb-6">
                                                                      Your password has been successfully reset. You will be redirected to the login page shortly.
                                                            </p>
                                                            <button
                                                                      onClick={() => navigate('/login')}
                                                                      className="text-xs uppercase tracking-widest underline underline-offset-4 font-medium"
                                                            >
                                                                      Go to Login Now
                                                            </button>
                                                  </div>
                                        )}
                              </div>
                    </div>
          );
}