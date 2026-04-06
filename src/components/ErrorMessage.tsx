"use client";

import { useState } from "react";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  type?: "error" | "warning" | "info";
}

export function ErrorMessage({ message, onDismiss, type = "error" }: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !message) return null;

  const styles = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div className={`rounded-lg border p-4 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <svg 
          className="h-5 w-5 flex-shrink-0 mt-0.5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 rounded p-1 hover:bg-black/5 transition-colors"
            aria-label="Dismiss error"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
