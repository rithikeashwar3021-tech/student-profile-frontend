import React from 'react';

export default function Toast({ message, isSuccess = true, isVisible = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 border border-sky-500/30 text-white shadow-2xl backdrop-blur-md text-xs font-medium ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <i
        className={
          isSuccess
            ? 'fa-solid fa-circle-check text-sky-400'
            : 'fa-solid fa-triangle-exclamation text-amber-400'
        }
      ></i>
      <span>{message}</span>
    </div>
  );
}
