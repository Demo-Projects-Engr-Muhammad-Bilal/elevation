/**
 * Full-page loading screen shown at App.jsx level while the initial
 * background data fetch (hero + categories + products) is in flight.
 * Matches the site's design language — no generic spinner.
 */
export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      <p className="font-display-lg text-[32px] md:text-[48px] italic tracking-[-0.03em] text-primary animate-pulse">
        ELÉVATION
      </p>
      <div className="mt-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
      </div>
    </div>
  );
};
