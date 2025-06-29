"use client";

import { useState, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

type Message =
  | { id: string; text: string; isUser: boolean; timestamp: Date }
  | { role: 'system' | 'assistant' | 'user'; content: string };

export default function AIChatbot() {
  const { language } = useLanguage();
  const TEXT = {
    tr: {
      placeholder: 'Sorunuzu yazın...',
      send: 'Gönder',
      welcome: 'Merhaba! Kariyerinle ilgili her konuda bana soru sorabilirsin.',
      systemPrompt: 'Sen bir kariyer danışmanı AI asistanısın. Kullanıcıya Türkçe ve samimi şekilde, kısa ve net cevaplar ver.'
    },
    en: {
      placeholder: 'Type your question...',
      send: 'Send',
      welcome: 'Hello! You can ask me anything about your career.',
      systemPrompt: 'You are a career coach AI assistant. Respond in English, friendly, concise and clear.'
    }
  };
  const t = TEXT[language];

  const [minimized, setMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t.welcome }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([
      { role: 'assistant', content: t.welcome }
    ]);
  }, [language]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simüle edilmiş AI yanıtı (gerçek uygulamada OpenAI API'si kullanılacak)
    setTimeout(() => {
      const aiResponses = [
        "Bu konuda size yardımcı olabilirim. Öncelikle mevcut durumunuzu değerlendirmemiz gerekiyor. Hangi alanda çalışmak istiyorsunuz?",
        "Harika bir soru! Kariyer değişikliği yaparken dikkat etmeniz gereken en önemli nokta, mevcut becerilerinizi yeni alana nasıl transfer edeceğinizdir.",
        "Network kurma konusunda size birkaç pratik öneri verebilirim. Öncelikle LinkedIn profilinizi güncelleyin ve sektörünüzdeki etkinliklere katılın.",
        "CV'nizi güçlendirmek için somut başarılarınızı vurgulayın. Sayısal veriler ve sonuçlar her zaman daha etkileyicidir.",
        "Mülakat hazırlığı için en önemli şey, şirket hakkında detaylı araştırma yapmak ve kendi deneyimlerinizi onların ihtiyaçlarıyla eşleştirmektir."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (minimized) {
    return (
      <button
        className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-100 transition border border-primary"
        onClick={() => setMinimized(false)}
        aria-label="AI Chatbotu Aç"
      >
        <Bot className="w-8 h-8 text-primary" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[95vw] max-w-sm min-w-[160px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 animate-fadeIn text-xs md:text-base overflow-hidden">
      <div className="flex items-center justify-between px-2 md:px-4 py-2 border-b bg-gradient-to-r from-blue-50 to-emerald-50 rounded-t-2xl">
        <div className="flex items-center gap-2 font-bold text-primary text-xs md:text-lg">
          <Bot className="w-5 h-5 md:w-6 md:h-6" /> Trailie AI
        </div>
        <button onClick={() => setMinimized(true)} aria-label="Kapat" className="p-1 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-0 shadow-lg w-full h-[60vh] min-h-[350px] flex flex-col">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, i) => {
                // Yeni tip: role/content, Eski tip: isUser/text
                const isUser = 'isUser' in msg ? msg.isUser : msg.role === 'user';
                const text = 'text' in msg ? msg.text : msg.content;
                return (
                  <div
                    key={('id' in msg && msg.id) || i}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div
                      className={`rounded-xl px-4 py-2 max-w-xs md:max-w-md shadow text-sm ${
                        isUser ? 'bg-primary text-white' : 'bg-white text-gray-800'
                      }`}
                    >
                      {text}
                      {'timestamp' in msg && msg.timestamp ? (
                        <span className="block text-[10px] text-gray-400 mt-1 text-right">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.placeholder}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 