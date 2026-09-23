import React from 'react';

function formatHandle(url = '', platform = '') {
  if (!url) return `@${platform.toLowerCase()}`;
  try {
    const clean = url.trim().split('?')[0].split('#')[0].replace(/\/$/, '');
    const parts = clean.split('/');
    const lastPart = parts[parts.length - 1];
    if (platform.toLowerCase() === 'linkedin') {
      return lastPart.startsWith('in/') ? lastPart : `in/${lastPart}`;
    }
    return lastPart.startsWith('@') ? lastPart : `@${lastPart}`;
  } catch {
    return url;
  }
}

function normalizeUrl(url = '', defaultDomain = '') {
  if (!url) return '#';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${defaultDomain}/${trimmed.replace(/^[@/]+/, '')}`;
}

export default function SocialLinks({ github, linkedin }) {
  const githubUrl = normalizeUrl(github, 'github.com');
  const githubHandle = formatHandle(github, 'github');

  const linkedinUrl = normalizeUrl(linkedin, 'linkedin.com/in');
  const linkedinHandle = formatHandle(linkedin, 'linkedin');

  return (
    <div className="w-full text-left mt-6">
      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
        Connect &amp; Showcase
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* GitHub Link */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center p-3 rounded-xl glass-pill hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-200 group-hover/link:text-sky-400 group-hover/link:border-sky-500/40 transition-colors mr-3 shrink-0">
            <i className="fa-brands fa-github text-lg"></i>
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-semibold text-white block group-hover/link:text-sky-300 transition-colors">
              GitHub
            </span>
            <span className="text-[11px] font-mono text-slate-400 truncate block">
              {githubHandle}
            </span>
          </div>
          <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-500 ml-auto group-hover/link:text-sky-400 transition-colors"></i>
        </a>

        {/* LinkedIn Link */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center p-3 rounded-xl glass-pill hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-200 group-hover/link:text-sky-400 group-hover/link:border-sky-500/40 transition-colors mr-3 shrink-0">
            <i className="fa-brands fa-linkedin-in text-lg text-sky-400"></i>
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-semibold text-white block group-hover/link:text-sky-300 transition-colors">
              LinkedIn
            </span>
            <span className="text-[11px] font-mono text-slate-400 truncate block">
              {linkedinHandle}
            </span>
          </div>
          <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-500 ml-auto group-hover/link:text-sky-400 transition-colors"></i>
        </a>
      </div>
    </div>
  );
}
