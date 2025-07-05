"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserMessages, markMessageAsRead } from "@/lib/firebase";

const content = {
  tr: {
    title: "Mesajlar & Bildirimler",
    inbox: "Gelen Kutusu",
    notifications: "Bildirimler",
    empty: "Hiç mesajın yok.",
    unread: "Okunmamış",
    read: "Okundu",
    loading: "Mesajlar yükleniyor...",
    error: "Mesajlar yüklenemedi."
  },
  en: {
    title: "Messages & Notifications",
    inbox: "Inbox",
    notifications: "Notifications",
    empty: "No messages yet.",
    unread: "Unread",
    read: "Read",
    loading: "Loading messages...",
    error: "Failed to load messages."
  }
};

export default function ProfileMessages({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserMessages(user.uid)
      .then(setMessages)
      .catch((e) => {
        console.warn('Firestore error, using empty messages:', e);
        setMessages([]);
      })
      .finally(() => setLoading(false));
  }, [user, t.error]);

  const handleMessageClick = async (messageId: string) => {
    if (!user) return;
    try {
      await markMessageAsRead(user.uid, messageId);
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (e) {
      console.error('Failed to mark message as read:', e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Mail className="w-6 h-6 text-blue-500" />
            <CardTitle className="text-xl font-bold">{t.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-2">
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="animate-spin w-8 h-8 text-blue-400" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-16">{error}</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-400 py-16">{t.empty}</div>
            ) : (
              messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    msg.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => handleMessageClick(msg.id)}
                >
                  {msg.read ? <CheckCircle className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5 text-blue-400" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{msg.subject || msg.title || "Mesaj"}</div>
                    <div className="text-xs text-gray-500">
                      {msg.createdAt ? new Date(msg.createdAt.toDate()).toLocaleDateString() : ""}
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${msg.read ? 'text-gray-400' : 'text-blue-600'}`}>
                    {msg.read ? t.read : t.unread}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 