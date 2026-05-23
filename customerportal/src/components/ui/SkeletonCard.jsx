export const SkeletonCard = () => {
          return (
                    <article className="flex flex-col items-center w-full animate-pulse">
                              <div className="w-full aspect-[3/4] bg-surface-container-high mb-6 rounded-sm"></div>
                              <div className="w-20 h-3 mb-3 bg-surface-container-high"></div>
                              <div className="w-48 h-6 mb-3 bg-surface-container-high"></div>
                              <div className="w-16 h-4 bg-surface-container-high"></div>
                    </article>
          );
};