import { Image } from "lucide-react";
import React, { useState } from "react";

type ImageState = "loading" | "loaded" | "error";

interface ImageWrapperProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number | string;
  height?: number | string;
  fallbackElement?: React.ReactNode;
  loading?: "eager" | "lazy";
  onError?: () => void;
  onLoad?: () => void;
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  className = "",
  fallbackElement,
  width,
  height,
  containerClassName = "",
  loading = "lazy",
  onError,
  onLoad,
}) => {
  const [state, setState] = useState<ImageState>("loading");

  const handleLoad = () => {
    setState("loaded");
    onLoad?.();
  };

  const handleError = () => {
    setState("error");
    onError?.();
  };

  const renderSkeletonLoader = () => (
    <div className="absolute inset-0 bg-slate-300 animate-pulse"></div>
  );

  const renderErrorFallback = () => (
    <div className="absolute inset-0 flex items-center justify-center dark:bg-slate-700 bg-slate-400 shadow-lg">
      {fallbackElement || (
        <div className="flex justify-center items-center text-slate-50">
          <Image className="p-0.5" />
        </div>
      )}
    </div>
  );

  const renderImage = () => (
    <img
      src={src}
      alt={alt}
      className={`${className} w-full h-full transition-opacity ${
        state === "loaded" ? "opacity-100" : "opacity-0"
      }`}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ width, height }}
    >
      {state === "loading" && renderSkeletonLoader()}
      {state === "error" && renderErrorFallback()}
      {state !== "error" && renderImage()}
    </div>
  );
};

export default ImageWrapper;
