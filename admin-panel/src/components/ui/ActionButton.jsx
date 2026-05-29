/**
 * Primary black action button (Add / Download / etc.)
 * Replaces the repeated button pattern across list component headers.
 *
 * @param {function}         onClick
 * @param {React.ReactNode}  [icon]      - Leading icon element
 * @param {React.ReactNode}  children    - Button label
 * @param {boolean}          [disabled]
 * @param {string}           [className] - Extra override classes
 */
export default function ActionButton({ onClick, icon, children, disabled = false, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-md text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}
