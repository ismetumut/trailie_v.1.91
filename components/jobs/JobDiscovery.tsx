"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, ExternalLink } from "lucide-react";

const content = {
  tr: {
    title: "AI ile Önerilen Rol İçin İş İlanları",
    subtitle: "Hazırladığın CV ve AI'ın önerdiği role göre, önde gelen platformlardaki açık pozisyonlar:",
    role: "Önerilen Rol",
    cv: "Kullandığın CV",
    apply: "Başvur",
    details: "Detay",
    platform: "Platform",
    location: "Lokasyon",
    posted: "Yayınlanma Tarihi"
  },
  en: {
    title: "Job Listings for AI-Recommended Role",
    subtitle: "Open positions from leading platforms, matched to your CV and AI-recommended role:",
    role: "Recommended Role",
    cv: "Your CV",
    apply: "Apply",
    details: "Details",
    platform: "Platform",
    location: "Location",
    posted: "Posted"
  }
};

const dummyRole = {
  tr: "Ürün Yöneticisi (Product Manager)",
  en: "Product Manager"
};
const dummyCV = {
  name: "Product Manager CV",
  img: "/placeholder-cv.svg"
};
const dummyJobs = [
  {
    id: 1,
    title: "Product Manager",
    company: "Google",
    platform: "LinkedIn",
    platformLogo: "/linkedin.svg",
    location: "Dublin, Ireland",
    posted: "2 gün önce",
    url: "https://www.linkedin.com/jobs/view/123456"
  },
  {
    id: 2,
    title: "Senior Product Manager",
    company: "Amazon",
    platform: "Indeed",
    platformLogo: "/indeed.svg",
    location: "London, UK",
    posted: "1 gün önce",
    url: "https://www.indeed.com/viewjob?jk=abcdef"
  },
  {
    id: 3,
    title: "Product Owner",
    company: "Spotify",
    platform: "Glassdoor",
    platformLogo: "/glassdoor.svg",
    location: "Stockholm, Sweden",
    posted: "Bugün",
    url: "https://www.glassdoor.com/job-listing/78910"
  }
];

export default function JobDiscovery({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{t.title}</h1>
          <div className="text-gray-500 text-sm mb-2">{t.subtitle}</div>
          <div className="flex flex-col md:flex-row gap-4 items-center bg-white/80 rounded-xl shadow p-4">
            <div className="flex-1 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-indigo-500" />
              <div>
                <div className="text-xs text-gray-500 font-semibold">{t.role}</div>
                <div className="font-bold text-lg text-gray-800">{dummyRole[language]}</div>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <Image src={dummyCV.img} alt={dummyCV.name} width={48} height={64} className="rounded border bg-white" />
              <div>
                <div className="text-xs text-gray-500 font-semibold">{t.cv}</div>
                <div className="font-bold text-lg text-gray-800">{dummyCV.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          {dummyJobs.map(job => (
            <Card key={job.id} className="flex flex-col md:flex-row items-center gap-4 p-4 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 min-w-[120px]">
                <Image src={job.platformLogo} alt={job.platform} width={36} height={36} className="rounded" />
                <div className="text-xs text-gray-500">{job.platform}</div>
              </div>
              <div className="flex-1 min-w-0">
                <CardHeader className="p-0 mb-1">
                  <CardTitle className="text-lg font-bold text-gray-900 truncate">{job.title} <span className="text-sm font-normal text-gray-500">@ {job.company}</span></CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-gray-500 text-sm flex gap-4">
                  <span><Globe className="inline w-4 h-4 mr-1" />{t.location}: {job.location}</span>
                  <span>{t.posted}: {job.posted}</span>
                </CardContent>
              </div>
              <div className="flex flex-col gap-2 min-w-[120px]">
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" /> {t.details}
                  </a>
                </Button>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold">
                  {t.apply}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 