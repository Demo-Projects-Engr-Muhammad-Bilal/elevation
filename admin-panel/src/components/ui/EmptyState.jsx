/**
 * Centered empty state with an icon and message.
 * Replaces the repeated empty-state blocks across list components.
 *
 * @param {React.ReactNode} icon     - Lucide icon element (already sized)
 * @param {string}          message  - Description text
 */
export default function EmptyState({ icon, message }) {
  return (
    <div className="text-center py-20 flex flex-col items-center text-gray-400">
      {icon}
      <p className="text-sm tracking-wide">{message}</p>
    </div>
  );
}
