export const Footer = () => {
          return (
                    <footer className="w-full mt-auto border-t py-6 md:py-8 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-secondary-fixed-dim/20">
                              {/* flex-col hata diya, ab hamesha flex-row (1 row) rahega */}
                              <div className="flex flex-row justify-between items-center max-w-[1280px] mx-auto w-full">

                                        {/* Left Side: Logo & Copyright */}
                                        <div className="flex items-center gap-4">
                                                  {/* Logo aur divider sirf md screens ya us se upar show honge */}
                                                  <span className="hidden md:block font-display-lg text-headline-md text-primary tracking-[0.1em]">ELÉVATION</span>
                                                  <span className="hidden md:block text-outline-variant/40">|</span>
                                                  <p className="font-body-md text-on-surface-variant text-[10px] md:text-sm">© 2026 ELÉVATION. All rights reserved.</p>
                                        </div>

                                        {/* Right Side: Links */}
                                        <div className="flex items-center gap-4 md:gap-8">
                                                  <a className="transition-all font-body-md text-[10px] md:text-sm text-on-surface-variant hover:text-primary" href="#">
                                                            Sustainability
                                                  </a>
                                                  <a className="transition-all font-body-md text-[10px] md:text-sm text-on-surface-variant hover:text-primary" href="#">
                                                            Contact
                                                  </a>
                                        </div>

                              </div>
                    </footer>
          );
};