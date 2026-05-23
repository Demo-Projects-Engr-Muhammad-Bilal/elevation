export const Footer = () => {
          return (
                    <footer className="w-full mt-auto border-t py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low border-secondary-fixed-dim/20">
                              <div className="flex flex-col md:flex-row justify-between items-center gap-gutter max-w-[1280px] mx-auto">
                                        <div className="flex flex-col items-center gap-4 md:items-start">
                                                  <span className="font-display-lg text-headline-md text-primary tracking-[0.1em]">ELÉVATION</span>
                                                  <p className="font-body-md text-on-surface-variant">© 2026 ELÉVATION. All rights reserved.</p>
                                        </div>
                                        <div className="flex gap-12 mt-8 md:mt-0">
                                                  <div className="flex flex-col gap-4 text-center md:text-left">
                                                            <h5 className="font-label-caps text-primary">Information</h5>
                                                            <a className="transition-all font-body-md text-on-surface-variant hover:text-primary" href="#">Sustainability</a>
                                                            <a className="transition-all font-body-md text-on-surface-variant hover:text-primary" href="#">Contact</a>
                                                  </div>
                                        </div>
                              </div>
                    </footer>
          );
};