import React from 'react';

// Map skill name to appropriate icon & color
function getSkillIcon(skill = '') {
  const lower = skill.toLowerCase();
  if (lower.includes('react') || lower.includes('next')) {
    return 'fa-brands fa-react text-sky-400';
  }
  if (lower.includes('python')) {
    return 'fa-brands fa-python text-indigo-400';
  }
  if (lower.includes('typescript') || lower.includes('javascript') || lower.includes('js') || lower.includes('ts')) {
    return 'fa-brands fa-js text-yellow-400';
  }
  if (
    lower.includes('embedded') ||
    lower.includes('c /') ||
    lower.includes('c++') ||
    lower.includes('esp32') ||
    lower.includes('arduino') ||
    lower.includes('hardware')
  ) {
    return 'fa-solid fa-microchip text-emerald-400';
  }
  if (lower.includes('docker') || lower.includes('linux')) {
    return 'fa-brands fa-docker text-sky-400';
  }
  if (lower.includes('git') || lower.includes('ci/cd') || lower.includes('github')) {
    return 'fa-brands fa-git-alt text-emerald-400';
  }
  if (lower.includes('node') || lower.includes('express')) {
    return 'fa-brands fa-node text-emerald-500';
  }
  if (lower.includes('rust')) {
    return 'fa-brands fa-rust text-amber-500';
  }
  if (lower.includes('figma') || lower.includes('ui') || lower.includes('design')) {
    return 'fa-brands fa-figma text-purple-400';
  }
  if (lower.includes('html') || lower.includes('css') || lower.includes('tailwind')) {
    return 'fa-brands fa-html5 text-orange-400';
  }
  return 'fa-solid fa-code text-sky-400';
}

export default function Skills({ skills = [] }) {
  const countLabel = `${skills.length} technolog${skills.length === 1 ? 'y' : 'ies'}`;

  return (
    <div className="w-full text-left">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <i className="fa-solid fa-code text-sky-400 text-[11px]"></i>
          Skills &amp; Tech Stack
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          {countLabel}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <span className="text-xs text-slate-500 italic">
            No skills added yet. Click &apos;Edit Profile&apos; to add your technical skills!
          </span>
        ) : (
          skills.map((skill, index) => {
            const iconClass = getSkillIcon(skill);
            return (
              <span
                key={`${skill}-${index}`}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-500/10 text-sky-300 border border-sky-500/25 hover:bg-sky-500/20 hover:border-sky-400/40 transition-colors cursor-default"
              >
                <i className={`${iconClass} mr-1.5 text-[13px]`}></i>
                {skill}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
}
