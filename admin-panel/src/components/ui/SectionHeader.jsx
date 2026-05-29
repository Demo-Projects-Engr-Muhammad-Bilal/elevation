/**
 * Page section title + subtitle with optional badge.
 * Replaces the repeated header blocks in all list components.
 *
 * @param {string}           title    - Section title (e.g. "Products")
 * @param {string}           subtitle - Subtitle / description
 * @param {React.ReactNode}  [badge]  - Optional badge element (e.g. count pill)
 */
export default function SectionHeader({ title, subtitle, badge }) {
  return (
    <div>
      <h2 className="font-display text-xl md:text-2xl font-extrabold text-black tracking-wider uppercase">
        {title}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
        {badge && (
          <span className="text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded ml-1 text-black">
            {badge}
          </span>
        )}
      </p>
    </div>
  );
}
