export const Input = ({ label, id, className = '', ...props }) => {
          return (
                    <div className="flex flex-col gap-2 w-full">
                              {label && (
                                        <label htmlFor={id} className="font-label-caps text-label-caps text-outline uppercase">
                                                  {label}
                                        </label>
                              )}
                              <input
                                        id={id}
                                        className={`bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md focus:border-primary focus:ring-0 transition-colors placeholder:text-on-surface-variant/40 outline-none w-full ${className}`}
                                        {...props}
                              />
                    </div>
          );
};