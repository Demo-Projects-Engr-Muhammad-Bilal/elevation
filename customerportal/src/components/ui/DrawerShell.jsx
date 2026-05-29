/**
 * Shared overlay + slide-in shell used by CartDrawer (slides from right)
 * and FilterDrawer (slides from left).
 *
 * Props:
 *   isOpen       boolean
 *   onClose      () => void
 *   side         'left' | 'right'   (default: 'right')
 *   maxWidth     string             (default: 'max-w-[480px]')
 *   children     React node
 */
export const DrawerShell = ({
  isOpen,
  onClose,
  side = 'right',
  maxWidth = 'max-w-[480px]',
  children,
}) => {
  const translateClass =
    side === 'left'
      ? isOpen ? 'translate-x-0' : '-translate-x-full'
      : isOpen ? 'translate-x-0' : 'translate-x-full';

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-primary/20 backdrop-blur-[2px] z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full w-full ${maxWidth} bg-surface z-[70] transition-transform duration-500 flex flex-col shadow-2xl ${translateClass}`}
      >
        {children}
      </div>
    </>
  );
};
