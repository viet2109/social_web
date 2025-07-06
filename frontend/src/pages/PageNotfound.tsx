import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent animate-floating">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary opacity-10"></div>
            </div>
          </div>

          {/* Error message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold ">
              Oops! Không tìm thấy trang
            </h2>
            <p className="text-lg text-text-secondary max-w-md mx-auto">
              Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển đến vị
              trí khác.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-slate-50 rounded-lg cursor-pointer hover:bg-primary-hover transition-normal font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </button>
          </div>
        </div>

        {/* Floating shapes for decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-primary opacity-5 rounded-full animate-floating"></div>
          <div className="absolute top-3/4 delay-1000 right-1/4 w-16 h-16 bg-secondary opacity-5 rounded-full animate-floating"></div>
          <div className="absolute bottom-1/4 delay-[2000ms] left-1/3 w-12 h-12 bg-primary opacity-5 rounded-full animate-floating"></div>
        </div>
      </div>
    </div>
  );
}
