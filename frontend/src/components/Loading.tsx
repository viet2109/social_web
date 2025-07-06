const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner chính */}
        <div className="relative w-20 h-20">
          {/* Vòng ngoài */}
          <div className="absolute border-t-primary border-r-secondary border-b-transparent border-l-transparent inset-0 w-20 h-20 border-4 border-gray-200 rounded-full animate-spin"></div>
          {/* Vòng trong */}
          <div
            className="absolute top-3 left-3 w-14 h-14 border-3 border-gray-100 rounded-full animate-spin border-t-secondary border-r-primary border-b-transparent border-l-transparent"
            style={{
              animationDirection: "reverse",
            }}
          ></div>
        </div>
        {/* Text loading */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-1 text-slate-50">
            Đang tải...
          </h3>
          <p className="text-sm text-gray-300">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
