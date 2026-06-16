"use client";

export default function WrkrBnCLoader() {
  return (
    <div className="fixed inset-0 bg-bg flex items-center justify-center z-50">
      {/* Simple CSS spinner — no JS animation library needed */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-border"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-accent border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <span className="text-2xl font-bold text-primary tracking-tight">
          Wrkr<span className="text-accent">BnC</span>
        </span>
      </div>
    </div>
  );
}
