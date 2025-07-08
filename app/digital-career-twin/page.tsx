"use client";
import TopBar from '../../components/TopBar';
import DigitalCareerTwin from '../../components/digital-career-twin/DigitalCareerTwin';

export default function DigitalCareerTwinPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#eaf6f2] to-[#f8fafc] p-4">
      <TopBar />
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 bg-white/80 rounded-2xl shadow-lg p-8 mt-16">
        <DigitalCareerTwin />
      </div>
    </div>
  );
} 