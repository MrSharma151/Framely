'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-transparent border-t-white border-l-white rounded-full animate-spin shadow-xl shadow-white/10" />
        <span className="text-lg tracking-wide text-white/80 font-medium">
          Loading Admin Panel...
        </span>
      </div>
    </div>
  );
}
