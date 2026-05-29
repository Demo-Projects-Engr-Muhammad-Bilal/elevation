/**
 * Reusable empty / zero-results state block.
 *
 * Props:
 *   icon         string   Material Symbols icon name  (default: 'inventory_2')
 *   message      string
 *   subMessage   string | undefined
 *   action       React node | undefined   (e.g. a "Clear Filters" button)
 */
export const EmptyState = ({ icon = 'inventory_2', message, subMessage, action }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 text-center border border-outline-variant/30 bg-surface-container-lowest">
      <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">
        {icon}
      </span>
      <p className="font-body-md text-on-surface-variant">{message}</p>
      {subMessage && (
        <p className="font-label-caps text-[11px] text-outline mt-2 uppercase tracking-widest">
          {subMessage}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
