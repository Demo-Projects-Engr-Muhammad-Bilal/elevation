import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function Login() {
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [showPassword, setShowPassword] = useState(false);
          const [isLoading, setIsLoading] = useState(false);

          const { login } = useAuth();
          const navigate = useNavigate();

          const handleLogin = async (e) => {
                    e.preventDefault();

                    try {
                              setIsLoading(true);
                              await login(email, password);
                              navigate("/dashboard");
                    } catch (err) {
                              alert(err.message);
                    } finally {
                              setIsLoading(false);
                    }
          };

          return (
                    <div className="relative md:min-h-screen overflow-hidden bg-background text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">                        
                              <main className="relative z-10 flex md:min-h-screen md:items-center md:justify-center py-25 px-8 md:p-4">
                                        {/* Card */}
                                        <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-outline-variant bg-white backdrop-blur-sm p-7 md:p-12 shadow-lg">
                                                  {/* Content */}
                                                  <div className="relative z-10">
                                                            {/* Header */}
                                                            <div className="mb-10 text-center flex flex-col gap-y-5">
                                                                      <h1 className="font-display text-xl md:text-2xl font-extrabold text-primary tracking-wider text-shadow-2xs">
                                                                                Admin Console
                                                                      </h1>
                                                                      <p className="text-sm text-gray-600 leading-relaxed">
                                                                               Enter your email and password to pick up where you left off..
                                                                      </p>
                                                            </div>

                                                            {/* Form */}
                                                            <form onSubmit={handleLogin} className="space-y-8">

                                                                      {/* Email */}
                                                                      <div className="space-y-2 group">
                                                                                <label className="block text-xs font-medium uppercase tracking-[0.2em] text-on-surface group-focus-within:text-primary transition-colors">
                                                                                          Email Address
                                                                                </label>
                                                                                <div className="relative">
                                                                                          <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                                                                                          <input
                                                                                                    type="email"
                                                                                                    required
                                                                                                    value={email}
                                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                                                    placeholder="admin@maisonedit.com"
                                                                                                    className="w-full border-b border-outline-variant/30 bg-transparent py-3 pl-8 pr-4 text-sm outline-none transition-all placeholder:text-on-surface-variant/30 focus:border-primary focus:ring-0"
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      {/* Password */}
                                                                      <div className="space-y-2 group">
                                                                                <div className="flex items-center justify-between">
                                                                                          <label className="block pb-2 text-xs font-medium uppercase tracking-[0.2em] text-on-surface group-focus-within:text-primary transition-colors">
                                                                                                    Password
                                                                                          </label>
                                                                                          <button
                                                                                                    type="button"
                                                                                                    className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition  border-b pb-2"
                                                                                          >
                                                                                                    <a href="/reset-password">Forgot Password?</a>
                                                                                          </button>
                                                                                </div>
                                                                                <div className="relative">
                                                                                          <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                                                                                          <input
                                                                                                    type={showPassword ? "text" : "password"}
                                                                                                    required
                                                                                                    value={password}
                                                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                                                    placeholder="••••••••"
                                                                                                    className="w-full border-b border-outline-variant/30 bg-transparent py-3 pl-8 pr-10 text-sm outline-none transition-all placeholder:text-on-surface-variant/30 focus:border-primary focus:ring-0"
                                                                                          />
                                                                                          <button
                                                                                                    type="button"
                                                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant/40 transition-colors hover:text-primary focus:outline-none"
                                                                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                                                          >
                                                                                                    {showPassword ? (
                                                                                                              <EyeOff className="size-5" strokeWidth={1.5} />
                                                                                                    ) : (
                                                                                                              <Eye className="size-5" strokeWidth={1.5} />
                                                                                                    )}
                                                                                          </button>
                                                                                </div>
                                                                      </div>

                                                                      {/* Submit */}
                                                                      <div className="mb-2 md:mb-0 md:pt-6">
                                                                                <button
                                                                                          type="submit"
                                                                                          disabled={isLoading}
                                                                                          className={`group relative flex w-full items-center justify-center overflow-hidden rounded-md py-4 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-300 ${isLoading
                                                                                                              ? "cursor-not-allowed bg-secondary/80 text-on-surface/50"
                                                                                                              : "bg-primary text-on-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                                                                                                    }`}
                                                                                >
                                                                                          <span className="flex items-center gap-2">
                                                                                                    {isLoading ? (
                                                                                                              <>
                                                                                                                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                                                                                                                        Verifying...
                                                                                                              </>
                                                                                                    ) : (
                                                                                                              <>
                                                                                                                        Secure Access
                                                                                                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                                                                                                              </>
                                                                                                    )}
                                                                                          </span>
                                                                                </button>
                                                                      </div>
                                                            </form>

                                                            
                                                  </div>
                                        </div>
                              </main>
                    </div>
          );
}