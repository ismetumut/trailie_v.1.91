"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Mail } from "lucide-react";

const content = {
  tr: {
    title: "Yardım & Destek",
    faq: "Sıkça Sorulan Sorular",
    contact: "İletişim",
    support: "Destek Ekibi",
    email: "destek@trailie.com"
  },
  en: {
    title: "Help & Support",
    faq: "Frequently Asked Questions",
    contact: "Contact",
    support: "Support Team",
    email: "support@trailie.com"
  }
};

export default function ProfileHelp({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-500" />
            <CardTitle className="text-xl font-bold">{t.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 mt-2">
            <div>
              <div className="font-semibold text-gray-700 mb-1">{t.faq}</div>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>AI ile CV nasıl oluşturulur?</li>
                <li>Simülasyon raporlarıma nasıl ulaşırım?</li>
                <li>Üyelik ve ödeme işlemleri nasıl yapılır?</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-gray-700 mb-1">{t.contact}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" /> {t.email}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.support}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 