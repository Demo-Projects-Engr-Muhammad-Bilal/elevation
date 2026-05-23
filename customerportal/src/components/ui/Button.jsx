export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
          const baseStyles = "font-label-caps text-label-caps tracking-widest transition-all duration-300 flex justify-center items-center";

          const variants = {
                    primary: "bg-primary text-on-primary px-12 py-5 hover:bg-on-primary-fixed-variant shadow-lg shadow-primary/10",
                    outline: "border border-primary text-primary px-10 py-4 hover:bg-primary hover:text-on-primary",
                    text: "border-b border-primary/20 pb-1 hover:border-primary",
                    icon: "p-2 hover:bg-surface-container-high rounded-full"
          };

          return (
                    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
                              {children}
                    </button>
          );
};