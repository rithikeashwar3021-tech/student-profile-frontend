import React, { useState } from 'react';

export default function ProfileHeader({ name, tagline, avatar, fallbackAvatar }) {
  const [imgSrc, setImgSrc] = useState(avatar);

  // Sync if avatar changes
  React.useEffect(() => {
    setImgSrc(avatar);
  }, [avatar]);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar Container with Refined Sleek Border */}
      <div className="relative mb-5 group-hover:scale-[1.01] transition-transform duration-300">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-br from-slate-700 via-sky-500/40 to-indigo-500/40 avatar-frame relative">
          <img
            src={imgSrc}
            alt={name}
            onError={() => {
              if (fallbackAvatar && imgSrc !== fallbackAvatar) {
                setImgSrc(fallbackAvatar);
              }
            }}
            className="w-full h-full object-cover rounded-[14px] sm:rounded-[22px] bg-slate-900"
          />
        </div>
      </div>

      {/* Student Basic Details */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {name}
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-300">
          {tagline}
        </p>
      </div>
    </div>
  );
}
