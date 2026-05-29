export default function PageLoader() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-81px)]">
      <div className="relative w-8 h-8 md:w-10 md:h-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute left-[46%] top-0 w-[8%] h-[28%] bg-black rounded-full"
            style={{
              transformOrigin: '50% 178%',
              transform: `rotate(${i * 30}deg)`,
              animation: `spinner-fade 1.2s linear infinite`,
              animationDelay: `${-(1.2 - i * 0.1)}s`,
            }}
          />
        ))}
      </div>

      {/* Custom keyframes for the fading petal effect */}
      <style>{`
        @keyframes spinner-fade {
          0% { opacity: 1; }
          100% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}