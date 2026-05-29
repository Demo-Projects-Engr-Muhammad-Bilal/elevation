import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Reusable section header with title on the left and an optional
 * "View All" link on the right — used in CategorySection, FeaturedSection,
 * and ProductDetail's related products block.
 *
 * Props:
 *   title        string
 *   linkTo       string | undefined   (omit to hide the link)
 *   linkLabel    string               (default: 'VIEW ALL')
 *   className    string
 */
export const SectionHeader = ({
  title,
  linkTo,
  linkLabel = 'VIEW ALL',
  className = 'mb-16',
}) => {
  return (
    <div className={`flex items-end justify-between ${className}`}>
      <h2 className="text-2xl font-headline-lg text-primary">{title}</h2>
      {linkTo && (
        <Link
          to={linkTo}
          className="flex items-center gap-1 transition-colors font-label-caps text-label-caps text-on-surface-variant hover:text-primary text-[10px] group"
        >
          {linkLabel}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
};
