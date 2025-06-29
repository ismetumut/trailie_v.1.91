import { FileText, MessageCircle, Briefcase, User } from 'lucide-react';
import AIChatbot from './AIChatbot';
import { useState } from 'react';

export default function HomeLanding() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf6f2] to-[#f8fafc] p-4 flex flex-col items-center">
      {/* Logo ve Hoşgeldin */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 mt-2">
        <div className="flex items-center gap-2">
          <img src="/placeholder-logo.svg" alt="Trailie Logo" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Trailie</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-200 to-blue-200 flex items-center justify-center text-lg font-bold text-white">U</div>
      </div>

      {/* Kutular */}
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Kariyer Belgeleri Kutusu */}
        <div className="rounded-2xl bg-gradient-to-br from-[#fffbe6] to-[#f6f3ff] shadow-md p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Kariyer belgelerini oluştur</h2>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-gray-50 transition border border-gray-100">
              <FileText className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-gray-800">CV Oluştur</span>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-gray-50 transition border border-gray-100">
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-800">Ön Yazı Yaz</span>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-gray-50 transition border border-gray-100">
              <FileText className="w-5 h-5 text-green-500" />
              <span className="font-medium text-gray-800">İstifa Mektubu Yaz</span>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 cursor-default" disabled>
              <User className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-500">Başarılı örnekleri gör</span>
            </button>
          </div>
        </div>

        {/* Hayalindeki İşi Bul Kutusu */}
        <div className="rounded-2xl bg-gradient-to-br from-[#e6f7ff] to-[#f6f3ff] shadow-md p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Hayalindeki işi bul</h2>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-gray-50 transition border border-gray-100">
              <Briefcase className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-800">Açık Pozisyonlar</span>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-gray-50 transition border border-gray-100">
              <User className="w-5 h-5 text-teal-500" />
              <span className="font-medium text-gray-800">Daha fazla kaynak</span>
            </button>
          </div>
        </div>

        {/* AI Chatbot Kutusu */}
        <div className="rounded-2xl bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6] shadow-md p-6 flex flex-col gap-4 items-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Kariyer Asistanı</h2>
          <p className="text-gray-600 text-sm text-center">Kariyerinle ilgili her konuda Trailie AI ile sohbet et!</p>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold shadow hover:scale-105 transition"
            onClick={() => setShowChatbot(true)}
          >
            <MessageCircle className="w-5 h-5" /> AI Chatbot'u Aç
          </button>
          {showChatbot && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 relative">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowChatbot(false)}>&times;</button>
                <AIChatbot />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 