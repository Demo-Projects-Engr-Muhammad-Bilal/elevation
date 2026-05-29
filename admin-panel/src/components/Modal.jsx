import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  isOpen,
  onClose,
  children,

  // Parent Tailwind Overrides
  className = '',
  contentClassName = '',
}) {

  // Prevent background scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 isolate">

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div
        className={`
          relative
          w-full
          max-w-[900px]
          md:w-[60%]
          h-auto
          max-h-[95vh]

          bg-[#Fef9f2]
          rounded-2xl
          border
          border-[#D1CDC7]/60
          shadow-2xl

          overflow-hidden
          flex
          flex-col

          animate-in
          fade-in
          zoom-in-95
          duration-200

          ${className}
        `}
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute
            top-1
            right-1
            md:top-5
            md:right-5
            z-50

            md:p-2
            p-1
            rounded-full

            bg-white/80
            backdrop-blur-sm

            border
            border-[#D1CDC7]/40

            text-gray-500
            hover:text-black
            hover:bg-white

            shadow-sm
            transition-all
          "
        >
          <X className="size-4 md:size-6" />
        </button>

        {/* Scrollable Content */}
        <div
          className={`
            flex-1
            overflow-y-auto

            p-6
            sm:p-8
            md:p-10

            custom-modal-scrollbar

            ${contentClassName}
          `}
        >
          {children}
        </div>

      </div>
    </div>,
    document.body
  );
}