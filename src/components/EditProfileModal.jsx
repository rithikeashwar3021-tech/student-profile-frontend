import React, { useState, useEffect, useRef } from 'react';
import { standardDepartments, academicYears } from '../data/profile';

export default function EditProfileModal({
  isOpen,
  profile,
  initialDefaultAvatar,
  onClose,
  onSave,
  onShowToast,
}) {
  const [formData, setFormData] = useState({ ...profile });
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef(null);

  // Re-sync form state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...profile,
        skills: [...(profile.skills || [])],
      });
      setNewSkill('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, profile]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Local file upload preview via FileReader (Frontend-only)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      if (onShowToast) onShowToast('Please select a valid image file', false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result;
      if (dataUrl) {
        handleChange('avatar', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add skill to draft list
  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;

    if (
      formData.skills.some(
        (s) => s.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      if (onShowToast) onShowToast('Skill is already in the list!', false);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, trimmed],
    }));
    setNewSkill('');
  };

  const handleRemoveSkill = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      if (onShowToast) onShowToast('Please enter a student name.', false);
      return;
    }

    onSave({
      ...formData,
      name: formData.name.trim(),
      tagline: formData.tagline.trim(),
      bio: formData.bio.trim(),
      github: formData.github.trim(),
      linkedin: formData.linkedin.trim(),
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#111827] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-transform duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-xs">
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <h2 id="modal-title" className="text-base font-bold text-white tracking-wide">
              Edit Profile Details
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Modal Body (Scrollable Form) */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-left flex-1">
          {/* Profile Photo Upload / Edit */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Profile Photo
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <img
                src={formData.avatar}
                alt="Profile Preview"
                className="w-16 h-16 rounded-xl object-cover ring-1 ring-sky-500/30 shrink-0 self-start sm:self-center bg-slate-950"
              />
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => handleChange('avatar', e.target.value)}
                  placeholder="Paste Image URL"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono placeholder-slate-600"
                />
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Local image file picker */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition active:scale-95"
                  >
                    <i className="fa-solid fa-upload text-[10px] text-sky-400"></i>
                    Upload from device
                  </button>

                  {initialDefaultAvatar && (
                    <button
                      type="button"
                      onClick={() => handleChange('avatar', initialDefaultAvatar)}
                      className="text-[11px] text-sky-400 hover:text-sky-300 font-medium transition"
                    >
                      <i className="fa-solid fa-rotate-left mr-1"></i>Reset Photo
                    </button>
                  )}
                  <span className="text-slate-600 text-xs hidden sm:inline">•</span>
                  <span className="text-[11px] text-slate-500">Square 1:1 works best</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Name & Tagline */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="formName"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                id="formName"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="formTagline"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Tagline / Headline
              </label>
              <input
                id="formTagline"
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="e.g. ECE Student • Tech Enthusiast & Systems Hacker"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>
          </div>

          {/* Department & Academic Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="formDept"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Department <span className="text-rose-400">*</span>
              </label>
              <select
                id="formDept"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 transition cursor-pointer"
              >
                {standardDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="formYear"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Academic Year <span className="text-rose-400">*</span>
              </label>
              <select
                id="formYear"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 transition cursor-pointer"
              >
                {academicYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bio / Description */}
          <div>
            <label
              htmlFor="formBio"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Short Bio
            </label>
            <textarea
              id="formBio"
              rows={3}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="A brief sentence about your technical focus or university role"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition resize-none leading-relaxed"
            />
          </div>

          {/* Skills Management Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Skills &amp; Tech Stack
              </label>
              <span className="text-[11px] text-slate-500">
                Press enter or click &apos;+ Add&apos;
              </span>
            </div>

            {/* Add skill input bar */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="e.g. Flutter, Next.js, Rust..."
                className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition font-mono"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                Add
              </button>
            </div>

            {/* Editable skill chips container */}
            <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 min-h-[50px] items-center">
              {formData.skills.length === 0 ? (
                <span className="text-xs text-slate-500 italic">
                  No skills in list. Add some using the field above.
                </span>
              ) : (
                formData.skills.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-900 border border-slate-700 text-slate-200 group"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-slate-400 hover:text-rose-400 transition p-0.5"
                      title="Remove skill"
                      aria-label={`Remove ${skill}`}
                    >
                      <i className="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Social Handles / URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="formGithub"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                <i className="fa-brands fa-github mr-1 text-slate-400"></i> GitHub URL / Handle
              </label>
              <input
                id="formGithub"
                type="text"
                value={formData.github}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="https://github.com/aarav-tech"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="formLinkedin"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                <i className="fa-brands fa-linkedin mr-1 text-sky-400"></i> LinkedIn URL / Handle
              </label>
              <input
                id="formLinkedin"
                type="text"
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/aaravsharma"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
              />
            </div>
          </div>

          {/* Modal Footer Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl glass-pill text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-xs font-semibold text-white shadow-lg shadow-sky-500/25 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <i className="fa-solid fa-check text-xs"></i>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
