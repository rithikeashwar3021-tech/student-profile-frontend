import React from 'react';

export default function ProfileInfo({ department, year, bio }) {
  return (
    <>
      {/* Reorganized Academic & Student Info: Structured 2-Column Side-by-Side Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-left">
        {/* Department Info Block */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-sky-500/30 transition-all group/info">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0">
              <i className="fa-solid fa-microchip text-[11px]"></i>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover/info:text-sky-300 transition-colors">
              Department
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug pl-0.5">
            {department}
          </p>
        </div>

        {/* Academic Year Info Block */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-indigo-500/30 transition-all group/info">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0">
              <i className="fa-solid fa-graduation-cap text-[11px]"></i>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover/info:text-indigo-300 transition-colors">
              Academic Year
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug pl-0.5">
            {year}
          </p>
        </div>
      </div>

      {/* Bio snippet */}
      {bio && (
        <p className="mt-4 text-sm sm:text-base text-slate-300/90 max-w-2xl leading-relaxed text-center">
          {bio}
        </p>
      )}

      {/* Divider Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent my-6"></div>
    </>
  );
}
