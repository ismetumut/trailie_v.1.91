"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ReportsPanel from '../ReportsPanel';

const content = {
  tr: {
    title: "Hesap Bilgileri",
    name: "Ad Soyad",
    email: "E-posta",
    phone: "Telefon",
    changePassword: "Şifreyi Değiştir",
    payment: "Ödeme Bilgileri",
    card: "Kayıtlı Kart",
    update: "Güncelle",
    lang: "Dil Seçimi",
    save: "Kaydet",
    logout: "Çıkış Yap"
  },
  en: {
    title: "Account Information",
    name: "Full Name",
    email: "Email",
    phone: "Phone",
    changePassword: "Change Password",
    payment: "Payment Info",
    card: "Saved Card",
    update: "Update",
    lang: "Language",
    save: "Save",
    logout: "Log Out"
  }
};

export default function ProfileMain({ language = "tr", reportsRef }: { language?: "tr" | "en", reportsRef?: React.RefObject<HTMLDivElement> }) {
  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="flex flex-col items-center gap-2">
            <Image src="/placeholder-user.jpg" alt="Profil" width={80} height={80} className="rounded-full border" />
            <CardTitle className="text-xl font-bold text-center">Demo Kullanıcı</CardTitle>
            <div className="text-gray-500 text-sm">demo@trailie.com</div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">{t.name}</label>
                <Input type="text" value="Demo Kullanıcı" disabled />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">{t.email}</label>
                <Input type="email" value="demo@trailie.com" disabled />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">{t.phone}</label>
                <Input type="tel" value="+90 555 123 4567" disabled />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2">{t.changePassword}</Button>
          </CardContent>
        </Card>
        <div className="mb-6" ref={reportsRef}>
          <ReportsPanel language={language} />
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-bold">{t.payment}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-block w-10 h-6 bg-gray-200 rounded-md" />
              <span className="text-gray-700 font-semibold">**** **** **** 1234</span>
              <Button size="sm" variant="outline">{t.update}</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">{t.lang}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant={language === 'tr' ? 'default' : 'outline'}>TR</Button>
              <Button variant={language === 'en' ? 'default' : 'outline'}>EN</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 