import React from 'react';

export default function ShareButton({ studentName = 'Student', onShowToast }) {
  const handleShare = async () => {
    const shareData = {
      title: `${studentName} - Technical Portfolio`,
      text: `Check out ${studentName}'s student technical profile!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        if (onShowToast) {
          onShowToast('Profile shared successfully!');
        }
        return;
      } catch (err) {
        if (err.name === 'AbortError') return; // User closed share dialog
      }
    }

    // Fallback: Copy link to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      if (onShowToast) {
        onShowToast('Profile link copied to clipboard!');
      }
    } catch {
      if (onShowToast) {
        onShowToast('Could not copy link.', false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="w-full sm:w-auto min-h-[44px] py-3 px-5 rounded-xl glass-pill hover:bg-slate-800 hover:border-slate-600 text-slate-300 hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
    >
      <i className="fa-solid fa-share-nodes text-xs text-sky-400"></i>
      <span>Share Profile</span>
    </button>
  );
}
