"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const content = {
  tr: {
    title: "Ayarlar",
    notifications: "Bildirimleri Aç/Kapat",
    theme: "Tema Seçimi",
    light: "Açık Tema",
    dark: "Koyu Tema",
    delete: "Hesabı Sil",
    save: "Kaydet"
  },
  en: {
    title: "Settings",
    notifications: "Enable/Disable Notifications",
    theme: "Theme Selection",
    light: "Light Theme",
    dark: "Dark Theme",
    delete: "Delete Account",
    save: "Save"
  }
};

export default function ProfileSettings({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">{t.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 mt-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">{t.notifications}</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">{t.theme}</span>
              <div className="flex gap-2">
                <Button variant="outline">{t.light}</Button>
                <Button variant="outline">{t.dark}</Button>
              </div>
            </div>
            <Button variant="destructive" className="mt-4">{t.delete}</Button>
            <Button className="mt-2">{t.save}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 