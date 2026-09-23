import React, { useState, useRef } from 'react';
import { initialProfile } from './data/profile';
import StudentProfile from './components/StudentProfile';
import EditProfileModal from './components/EditProfileModal';
import Toast from './components/Toast';

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    isSuccess: true,
  });

  const toastTimeoutRef = useRef(null);

  const showToast = (message, isSuccess = true) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({
      isVisible: true,
      message,
      isSuccess,
    });
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
    showToast('Profile details updated successfully!');
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-sky-500 selection:text-white flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      {/* Ambient Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 mesh-gradient"></div>
        <div className="absolute inset-0 grid-pattern opacity-70"></div>
        {/* Subtle soft glow orb */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* Profile Card */}
        <StudentProfile
          profile={profile}
          onOpenEditModal={() => setIsEditModalOpen(true)}
          onShowToast={showToast}
        />

        {/* Clean Minimal Footer */}
        <footer className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2 font-mono">
          <span>DevClub Student Technical Profile</span>
          <span>•</span>
          <span className="text-slate-400">© 2025</span>
        </footer>
      </main>

      {/* Edit Profile Modal Dialog */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        profile={profile}
        initialDefaultAvatar={initialProfile.avatar}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        isSuccess={toast.isSuccess}
        isVisible={toast.isVisible}
      />
    </div>
  );
}
