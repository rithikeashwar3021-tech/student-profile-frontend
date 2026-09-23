import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import Skills from './Skills';
import SocialLinks from './SocialLinks';
import ShareButton from './ShareButton';

export default function StudentProfile({
  profile,
  onOpenEditModal,
  onShowToast,
}) {
  return (
    <article className="w-full glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:border-slate-700/80 group">
      {/* Top Card Ambient Highlight Banner */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-sky-500/15 to-transparent blur-xl pointer-events-none"></div>

      {/* Profile Header & Avatar */}
      <ProfileHeader
        name={profile.name}
        tagline={profile.tagline}
        avatar={profile.avatar}
        fallbackAvatar={profile.fallbackAvatar}
      />

      {/* Academic Info & Short Bio */}
      <ProfileInfo
        department={profile.department}
        year={profile.year}
        bio={profile.bio}
      />

      {/* Skills Section */}
      <Skills skills={profile.skills} />

      {/* Social Links Section */}
      <SocialLinks github={profile.github} linkedin={profile.linkedin} />

      {/* Primary Action Area */}
      <div className="w-full mt-7 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onOpenEditModal}
          className="w-full sm:flex-1 min-h-[44px] py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-pen-to-square text-xs"></i>
          <span>Edit Profile</span>
        </button>

        <ShareButton
          studentName={profile.name}
          onShowToast={onShowToast}
        />
      </div>
    </article>
  );
}
