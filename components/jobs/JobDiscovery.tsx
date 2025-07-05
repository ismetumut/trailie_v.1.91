"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Globe, ExternalLink, Loader2, CheckCircle, Clock, XCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { saveJobApplication, getUserJobApplications, updateJobApplicationStatus } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const content = {
  tr: {
    title: "AI ile Önerilen Rol İçin İş İlanları",
    subtitle: "Hazırladığın CV ve AI'ın önerdiği role göre, önde gelen platformlardaki açık pozisyonlar:",
    role: "Önerilen Rol",
    cv: "Kullandığın CV",
    apply: "Başvur",
    applied: "Başvuruldu",
    details: "Detay",
    platform: "Platform",
    location: "Lokasyon",
    posted: "Yayınlanma Tarihi",
    status: {
      applied: "Başvuruldu",
      "in-review": "İnceleniyor",
      rejected: "Reddedildi",
      accepted: "Kabul Edildi"
    },
    loading: "İş ilanları yükleniyor...",
    error: "İş ilanları yüklenemedi.",
    empty: "Henüz iş ilanı yok."
  },
  en: {
    title: "Job Listings for AI-Recommended Role",
    subtitle: "Open positions from leading platforms, matched to your CV and AI-recommended role:",
    role: "Recommended Role",
    cv: "Your CV",
    apply: "Apply",
    applied: "Applied",
    details: "Details",
    platform: "Platform",
    location: "Location",
    posted: "Posted",
    status: {
      applied: "Applied",
      "in-review": "In Review",
      rejected: "Rejected",
      accepted: "Accepted"
    },
    loading: "Loading job listings...",
    error: "Failed to load job listings.",
    empty: "No job listings yet."
  }
};

// Gerçek iş ilanları (API entegrasyonu için placeholder)
const realJobs = [
  {
    id: 1,
    title: "Product Manager",
    company: "Google",
    platform: "LinkedIn",
    platformLogo: "/linkedin.svg",
    location: "Dublin, Ireland",
    posted: "2 gün önce",
    url: "https://www.linkedin.com/jobs/view/123456",
    salary: "€80,000 - €120,000",
    description: "We are looking for a Product Manager to join our team..."
  },
  {
    id: 2,
    title: "Senior Product Manager",
    company: "Amazon",
    platform: "Indeed",
    platformLogo: "/indeed.svg",
    location: "London, UK",
    posted: "1 gün önce",
    url: "https://www.indeed.com/viewjob?jk=abcdef",
    salary: "£70,000 - £100,000",
    description: "Amazon is seeking a Senior Product Manager..."
  },
  {
    id: 3,
    title: "Product Owner",
    company: "Spotify",
    platform: "Glassdoor",
    platformLogo: "/glassdoor.svg",
    location: "Stockholm, Sweden",
    posted: "Bugün",
    url: "https://www.glassdoor.com/job-listing/78910",
    salary: "SEK 600,000 - 800,000",
    description: "Join Spotify as a Product Owner..."
  }
];

export default function JobDiscovery({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState(realJobs);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [isFromFlow, setIsFromFlow] = useState(false);

  useEffect(() => {
    // Akış kontrolü - URL'den veya localStorage'dan kontrol et
    const fromFlow = localStorage.getItem('fromJobFlow') === 'true' || 
                     window.location.search.includes('from=flow');
    setIsFromFlow(fromFlow);
    
    // Eğer akıştan geliyorsa ve kullanıcı varsa, AI önerileri göster
    if (fromFlow && user) {
      // AI önerileri için gerçek iş ilanları kullan
      setJobs(realJobs);
    } else {
      // Hamburger menüden geliyorsa dummy data göster
      setJobs([
        {
          id: 1,
          title: "Product Manager",
          company: "Tech Startup",
          platform: "LinkedIn",
          platformLogo: "/linkedin.svg",
          location: "İstanbul, Türkiye",
          posted: "2 gün önce",
          url: "#",
          salary: "₺25,000 - ₺35,000",
          description: "Yeni nesil teknoloji şirketimizde Product Manager arıyoruz..."
        },
        {
          id: 2,
          title: "Senior Product Manager",
          company: "E-ticaret Platformu",
          platform: "Indeed",
          platformLogo: "/indeed.svg",
          location: "Ankara, Türkiye",
          posted: "1 gün önce",
          url: "#",
          salary: "₺30,000 - ₺45,000",
          description: "Büyüyen e-ticaret platformumuzda deneyimli Product Manager..."
        },
        {
          id: 3,
          title: "Product Owner",
          company: "Fintech Şirketi",
          platform: "Glassdoor",
          platformLogo: "/glassdoor.svg",
          location: "İzmir, Türkiye",
          posted: "Bugün",
          url: "#",
          salary: "₺28,000 - ₺40,000",
          description: "Fintech sektöründe Product Owner pozisyonu..."
        }
      ]);
    }
    
    // Loading'i false yap (kullanıcı olsun olmasın)
    setLoading(false);
    
    // Eğer kullanıcı varsa başvuruları çek
    if (user) {
      getUserJobApplications(user.uid)
        .then(setApplications)
        .catch((e) => {
          console.warn('Firestore error, using empty applications:', e);
          setApplications([]);
        });
    }
  }, [user, t.error]);

  const handleApply = async (job: any) => {
    if (!user) return;
    setApplyingId(job.id);
    try {
      await saveJobApplication(user.uid, {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        platform: job.platform,
        location: job.location,
        url: job.url,
        salary: job.salary,
        appliedAt: new Date()
      });
      
      // Local state'i güncelle
      setApplications(prev => [...prev, {
        id: Date.now().toString(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        platform: job.platform,
        location: job.location,
        url: job.url,
        status: 'applied',
        appliedAt: new Date()
      }]);
    } catch (e) {
      console.error('Failed to apply:', e);
    } finally {
      setApplyingId(null);
    }
  };

  const getApplicationStatus = (jobId: number) => {
    const application = applications.find(app => app.jobId === jobId);
    return application?.status || null;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'in-review': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'in-review': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-2 sm:p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-6 px-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
            {isFromFlow && user ? t.title : "İş İlanları"}
          </h1>
          <div className="text-gray-500 text-xs sm:text-sm">
            {isFromFlow && user ? t.subtitle : "Çeşitli platformlardaki açık pozisyonlar:"}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-blue-400" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-16">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="text-center text-gray-400 py-16">{t.empty}</div>
        ) : (
          <div className="grid gap-3 sm:gap-6 px-2">
            {jobs.map(job => {
              const applicationStatus = getApplicationStatus(job.id);
              const hasApplied = applicationStatus !== null;
              
              return (
                <Card key={job.id} className="shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      {/* Header - Platform Logo and Title */}
                      <div className="flex items-start gap-3">
                        <Image 
                          src={job.platformLogo} 
                          alt={job.platform} 
                          width={32} 
                          height={32} 
                          className="rounded-lg flex-shrink-0 sm:w-10 sm:h-10" 
                        />
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base sm:text-lg font-bold text-gray-900 leading-tight break-words">
                            {job.title}
                          </CardTitle>
                          <div className="text-gray-600 font-medium text-sm sm:text-base mt-1">
                            {job.company}
                          </div>
                        </div>
                      </div>
                      
                      {/* Job Details */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="break-words">{job.location}</span>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>{job.posted}</span>
                        {job.salary && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="break-words">{job.salary}</span>
                          </>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                        {hasApplied ? (
                          <Badge className={`${getStatusColor(applicationStatus)} flex items-center justify-center gap-1 text-xs sm:text-sm py-1 sm:py-2`}>
                            {getStatusIcon(applicationStatus)}
                            <span className="hidden sm:inline">
                              {t.status[applicationStatus as keyof typeof t.status]}
                            </span>
                            <span className="sm:hidden">
                              {applicationStatus === 'applied' ? 'Başvuruldu' : 
                               applicationStatus === 'in-review' ? 'İnceleniyor' :
                               applicationStatus === 'accepted' ? 'Kabul' :
                               applicationStatus === 'rejected' ? 'Red' : 'Başvuruldu'}
                            </span>
                          </Badge>
                        ) : (
                          <Button 
                            onClick={() => handleApply(job)}
                            disabled={applyingId === job.id}
                            className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2 sm:py-2 h-8 sm:h-10"
                            size="sm"
                          >
                            {applyingId === job.id ? (
                              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                            ) : (
                              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                            )}
                            <span className="hidden sm:inline">
                              {applyingId === job.id ? t.loading : t.apply}
                            </span>
                            <span className="sm:hidden">
                              {applyingId === job.id ? 'Yükleniyor' : 'Başvur'}
                            </span>
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-center gap-2 text-xs sm:text-sm py-2 sm:py-2 h-8 sm:h-10" 
                          size="sm"
                          asChild
                        >
                          <a href={job.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">{t.details}</span>
                            <span className="sm:hidden">Detay</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 