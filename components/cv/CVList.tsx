"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Plus } from "lucide-react";

const content = {
  tr: {
    title: "Özgeçmişlerim",
    subtitle: "AI destekli oluşturduğun tüm CV'lere buradan erişebilirsin.",
    newCV: "Yeni CV Oluştur",
    preview: "Önizle",
    download: "İndir",
    empty: "Henüz bir CV oluşturmadın.",
  },
  en: {
    title: "My Resumes",
    subtitle: "Access all your AI-powered CVs here.",
    newCV: "Create New CV",
    preview: "Preview",
    download: "Download",
    empty: "You haven't created any CVs yet.",
  }
};

const dummyCVs = [
  {
    id: 1,
    name: "Product Manager CV",
    date: "2024-06-10",
    img: "/placeholder-cv.svg",
    file: "/dummy-cv1.pdf"
  },
  {
    id: 2,
    name: "Marketing Specialist CV",
    date: "2024-05-28",
    img: "/placeholder-cv.svg",
    file: "/dummy-cv2.pdf"
  }
];

export default function CVList({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            <div className="text-gray-500 text-sm">{t.subtitle}</div>
          </div>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-4 py-2 rounded-xl shadow">
            <Plus className="w-5 h-5" /> {t.newCV}
          </Button>
        </div>
        <div className="grid gap-6">
          {dummyCVs.length === 0 ? (
            <div className="text-center text-gray-400 py-16">{t.empty}</div>
          ) : (
            dummyCVs.map(cv => (
              <Card key={cv.id} className="flex flex-col md:flex-row items-center gap-4 p-4 shadow-lg hover:shadow-xl transition-all">
                <Image src={cv.img} alt={cv.name} width={90} height={120} className="rounded-lg border bg-white" />
                <div className="flex-1 min-w-0">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg font-bold text-gray-900 truncate">{cv.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-gray-500 text-sm">{cv.date}</CardContent>
                </div>
                <div className="flex flex-col gap-2 min-w-[120px]">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => alert('Önizleme yakında!')}>
                    <Eye className="w-4 h-4" /> {t.preview}
                  </Button>
                  <Button variant="secondary" className="flex items-center gap-2" asChild>
                    <a href={cv.file} download>
                      <Download className="w-4 h-4" /> {t.download}
                    </a>
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 