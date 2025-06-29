"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

const content = {
  tr: {
    title: "Mesajlar & Bildirimler",
    inbox: "Gelen Kutusu",
    notifications: "Bildirimler",
    empty: "Hiç mesajın yok.",
    unread: "Okunmamış",
    read: "Okundu"
  },
  en: {
    title: "Messages & Notifications",
    inbox: "Inbox",
    notifications: "Notifications",
    empty: "No messages yet.",
    unread: "Unread",
    read: "Read"
  }
};

const dummyMessages = [
  { id: 1, subject: "AI ile yeni CV hazır!", date: "2024-06-10", unread: true },
  { id: 2, subject: "Simülasyon raporun hazır.", date: "2024-06-09", unread: false },
  { id: 3, subject: "Premium üyelik fırsatı!", date: "2024-06-08", unread: true }
];

export default function ProfileMessages({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Mail className="w-6 h-6 text-blue-500" />
            <CardTitle className="text-xl font-bold">{t.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-2">
            {dummyMessages.length === 0 ? (
              <div className="text-center text-gray-400 py-16">{t.empty}</div>
            ) : (
              dummyMessages.map(msg => (
                <div key={msg.id} className={`flex items-center gap-3 p-3 rounded-lg border ${msg.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                  {msg.unread ? <AlertCircle className="w-5 h-5 text-blue-400" /> : <CheckCircle className="w-5 h-5 text-green-400" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{msg.subject}</div>
                    <div className="text-xs text-gray-500">{msg.date}</div>
                  </div>
                  <span className={`text-xs font-bold ${msg.unread ? 'text-blue-600' : 'text-gray-400'}`}>{msg.unread ? t.unread : t.read}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 