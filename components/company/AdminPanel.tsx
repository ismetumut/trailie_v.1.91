"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  Filter, 
  Upload, 
  MessageSquare, 
  Eye, 
  Star,
  TrendingUp,
  UserCheck,
  FileText,
  Loader2,
  Bot,
  Target,
  Award,
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  Download,
  BarChart3,
  Settings,
  Crown
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getCompanyProfile, 
  saveCompanyProfile,
  searchCandidatesForCompany,
  getCompanyAnalytics,
  uploadCompanyAssessment
} from "@/lib/firebase";

const content = {
  tr: {
    title: "Trailie Enterprise Platform",
    subtitle: "AI destekli aday değerlendirme ve filtreleme platformu",
    candidates: "Aday Havuzu",
    assessments: "Değerlendirmeler",
    analytics: "Analitikler",
    profile: "Şirket Profili",
    searchCandidates: "Aday Ara",
    uploadAssessment: "Değerlendirme Yükle",
    aiChatbot: "AI Asistan",
    totalCandidates: "Toplam Aday",
    activeAssessments: "Aktif Değerlendirmeler",
    totalViews: "Toplam Görüntülenme",
    searchPlaceholder: "AI ile aday ara...",
    filters: "Filtreler",
    personalityType: "Kişilik Tipi",
    expertise: "Uzmanlık",
    location: "Lokasyon",
    experienceLevel: "Deneyim Seviyesi",
    technicalScore: "Teknik Skor",
    aiScore: "AI Skor",
    search: "Ara",
    clearFilters: "Filtreleri Temizle",
    assessmentTitle: "Değerlendirme Başlığı",
    assessmentType: "Değerlendirme Tipi",
    uploadFile: "Dosya Yükle",
    uploadLink: "Link Ekle",
    save: "Kaydet",
    cancel: "İptal",
    loading: "Yükleniyor...",
    error: "Yüklenemedi.",
    noCandidates: "Aday bulunamadı.",
    noAssessments: "Değerlendirme yok.",
    noAnalytics: "Analitik verisi yok.",
    subscription: "Abonelik",
    monthlyPlan: "Aylık Plan",
    annualPlan: "Yıllık Plan",
    currentPlan: "Mevcut Plan",
    upgrade: "Yükselt",
    cvViews: "CV Görüntüleme",
    remainingViews: "Kalan Görüntüleme",
    aiAssistant: "AI Asistan",
    describeRole: "Pozisyon gereksinimlerini açıklayın...",
    findCandidates: "Aday Bul",
    candidateProfile: "Aday Profili",
    contactCandidate: "Adayla İletişim",
    viewFullProfile: "Tam Profili Görüntüle",
    downloadReport: "Raporu İndir",
    // Yeni Filtre Çevirileri
    assessmentPlatforms: "Değerlendirme Platformları",
    hackerrankScore: "HackerRank Skoru",
    codilityScore: "Codility Skoru",
    testGorillaScore: "TestGorilla Skoru",
    kandioScore: "Kandio Skoru",
    devSkillerScore: "DevSkiller Skoru",
    imochaScore: "iMocha Skoru",
    languageSkills: "Dil Yeterliliği",
    ieltsScore: "IELTS Skoru",
    toeflScore: "TOEFL Skoru",
    cefrLevel: "CEFR Seviyesi",
    duolingoScore: "Duolingo Skoru",
    cognitiveSkills: "Kognitif & Soft Skills",
    cognitiveTestScore: "Kognitif Test Skoru",
    discType: "DISC Tipi",
    mbtiType: "MBTI Tipi",
    bigFiveOpenness: "Big Five - Açıklık",
    bigFiveConscientiousness: "Big Five - Sorumluluk",
    bigFiveExtraversion: "Big Five - Dışadönüklük",
    bigFiveAgreeableness: "Big Five - Uyumluluk",
    bigFiveNeuroticism: "Big Five - Nevrotiklik",
    additionalFilters: "Ek Filtreler",
    certifications: "Sertifikalar",
    awsCertified: "AWS Sertifikalı",
    azureCertified: "Azure Sertifikalı",
    scrumCertified: "Scrum Sertifikalı",
    pmpCertified: "PMP Sertifikalı",
    googleAnalyticsCertified: "Google Analytics Sertifikalı",
    metaBlueprintCertified: "Meta Blueprint Sertifikalı",
    education: "Eğitim",
    university: "Üniversite",
    gpa: "Not Ortalaması",
    salaryExpectation: "Maaş Beklentisi",
    availability: "Uygunluk Durumu",
    interviewStatus: "Görüşme Durumu",
    minScore: "Min Skor",
    maxScore: "Maks Skor",
    minSalary: "Min Maaş",
    maxSalary: "Maks Maaş",
    availableNow: "Hemen Başlayabilir",
    availableInMonth: "1 Ay İçinde",
    freelanceOnly: "Sadece Freelance",
    preInterviewDone: "Ön Görüşme Yapıldı",
    interviewScheduled: "Mülakat Planlandı",
    interviewCompleted: "Mülakat Tamamlandı",
    offerSent: "Teklif Gönderildi",
    hired: "İşe Alındı",
    rejected: "Reddedildi"
  },
  en: {
    title: "Trailie Enterprise Platform",
    subtitle: "AI-powered candidate assessment and filtering platform",
    candidates: "Candidate Pool",
    assessments: "Assessments",
    analytics: "Analytics",
    profile: "Company Profile",
    searchCandidates: "Search Candidates",
    uploadAssessment: "Upload Assessment",
    aiChatbot: "AI Assistant",
    totalCandidates: "Total Candidates",
    activeAssessments: "Active Assessments",
    totalViews: "Total Views",
    searchPlaceholder: "Search candidates with AI...",
    filters: "Filters",
    personalityType: "Personality Type",
    expertise: "Expertise",
    location: "Location",
    experienceLevel: "Experience Level",
    technicalScore: "Technical Score",
    aiScore: "AI Score",
    search: "Search",
    clearFilters: "Clear Filters",
    assessmentTitle: "Assessment Title",
    assessmentType: "Assessment Type",
    uploadFile: "Upload File",
    uploadLink: "Add Link",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "Failed to load.",
    noCandidates: "No candidates found.",
    noAssessments: "No assessments.",
    noAnalytics: "No analytics data.",
    subscription: "Subscription",
    monthlyPlan: "Monthly Plan",
    annualPlan: "Annual Plan",
    currentPlan: "Current Plan",
    upgrade: "Upgrade",
    cvViews: "CV Views",
    remainingViews: "Remaining Views",
    aiAssistant: "AI Assistant",
    describeRole: "Describe the role requirements...",
    findCandidates: "Find Candidates",
    candidateProfile: "Candidate Profile",
    contactCandidate: "Contact Candidate",
    viewFullProfile: "View Full Profile",
    downloadReport: "Download Report",
    // New Filter Translations
    assessmentPlatforms: "Assessment Platforms",
    hackerrankScore: "HackerRank Score",
    codilityScore: "Codility Score",
    testGorillaScore: "TestGorilla Score",
    kandioScore: "Kandio Score",
    devSkillerScore: "DevSkiller Score",
    imochaScore: "iMocha Score",
    languageSkills: "Language Skills",
    ieltsScore: "IELTS Score",
    toeflScore: "TOEFL Score",
    cefrLevel: "CEFR Level",
    duolingoScore: "Duolingo Score",
    cognitiveSkills: "Cognitive & Soft Skills",
    cognitiveTestScore: "Cognitive Test Score",
    discType: "DISC Type",
    mbtiType: "MBTI Type",
    bigFiveOpenness: "Big Five - Openness",
    bigFiveConscientiousness: "Big Five - Conscientiousness",
    bigFiveExtraversion: "Big Five - Extraversion",
    bigFiveAgreeableness: "Big Five - Agreeableness",
    bigFiveNeuroticism: "Big Five - Neuroticism",
    additionalFilters: "Additional Filters",
    certifications: "Certifications",
    awsCertified: "AWS Certified",
    azureCertified: "Azure Certified",
    scrumCertified: "Scrum Certified",
    pmpCertified: "PMP Certified",
    googleAnalyticsCertified: "Google Analytics Certified",
    metaBlueprintCertified: "Meta Blueprint Certified",
    education: "Education",
    university: "University",
    gpa: "GPA",
    salaryExpectation: "Salary Expectation",
    availability: "Availability",
    interviewStatus: "Interview Status",
    minScore: "Min Score",
    maxScore: "Max Score",
    minSalary: "Min Salary",
    maxSalary: "Max Salary",
    availableNow: "Available Now",
    availableInMonth: "Available in 1 Month",
    freelanceOnly: "Freelance Only",
    preInterviewDone: "Pre-Interview Done",
    interviewScheduled: "Interview Scheduled",
    interviewCompleted: "Interview Completed",
    offerSent: "Offer Sent",
    hired: "Hired",
    rejected: "Rejected"
  }
};

// Örnek aday verileri
const DUMMY_CANDIDATES = [
  {
    id: '1',
    name: 'Ayşe Yılmaz',
    title: 'Product Manager',
    company: 'ABC Teknoloji',
    location: 'İstanbul',
    experience: '5 yıl',
    personalityType: 'D',
    expertise: 'Product',
    technicalScore: 85,
    aiScore: 92,
    personalityScore: { D: 75, I: 60, S: 45, C: 80 },
    expertiseScore: { Marketing: 70, Sales: 60, Brand: 65, Product: 90 },
    simulationScore: 88,
    interviewScore: 85,
    cvScore: 90,
    skills: ['Product Management', 'Agile', 'Figma', 'SQL'],
    education: 'Boğaziçi Üniversitesi - MBA',
    certifications: ['PMP', 'CSPO'],
    languages: ['Türkçe', 'İngilizce'],
    lastActive: '2 gün önce',
    image: ''
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    title: 'Senior Developer',
    company: 'XYZ Yazılım',
    location: 'Ankara',
    experience: '7 yıl',
    personalityType: 'C',
    expertise: 'Product',
    technicalScore: 95,
    aiScore: 88,
    personalityScore: { D: 45, I: 50, S: 70, C: 90 },
    expertiseScore: { Marketing: 40, Sales: 35, Brand: 45, Product: 85 },
    simulationScore: 82,
    interviewScore: 78,
    cvScore: 85,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    education: 'ODTÜ - Bilgisayar Mühendisliği',
    certifications: ['AWS Certified Developer'],
    languages: ['Türkçe', 'İngilizce'],
    lastActive: '1 gün önce',
    image: ''
  },
  {
    id: '3',
    name: 'Elif Kaya',
    title: 'Marketing Manager',
    company: 'StartUpX',
    location: 'İzmir',
    experience: '4 yıl',
    personalityType: 'I',
    expertise: 'Marketing',
    technicalScore: 70,
    aiScore: 95,
    personalityScore: { D: 60, I: 85, S: 55, C: 40 },
    expertiseScore: { Marketing: 95, Sales: 75, Brand: 80, Product: 60 },
    simulationScore: 90,
    interviewScore: 92,
    cvScore: 88,
    skills: ['Digital Marketing', 'Google Analytics', 'Facebook Ads', 'Content Marketing'],
    education: 'İstanbul Üniversitesi - İletişim',
    certifications: ['Google Ads Certified', 'Facebook Blueprint'],
    languages: ['Türkçe', 'İngilizce', 'Almanca'],
    lastActive: 'Bugün',
    image: ''
  }
];

// Örnek değerlendirme verileri
const DUMMY_ASSESSMENTS = [
  {
    id: '1',
    title: 'Teknik Mülakat Soruları',
    type: 'Technical',
    status: 'active',
    candidates: 45,
    avgScore: 78,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Kişilik Envanteri',
    type: 'Personality',
    status: 'active',
    candidates: 120,
    avgScore: 82,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'Liderlik Simülasyonu',
    type: 'Simulation',
    status: 'draft',
    candidates: 0,
    avgScore: 0,
    createdAt: new Date('2024-01-20')
  }
];

export default function AdminPanel({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  const { user } = useAuth();
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>(DUMMY_CANDIDATES);
  const [assessments, setAssessments] = useState<any[]>(DUMMY_ASSESSMENTS);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState({
    personalityType: "",
    expertise: "",
    location: "",
    experienceLevel: "",
    technicalScoreMin: "",
    aiScoreMin: "",
    // Değerlendirme Platformları
    hackerrankScoreMin: "",
    codilityScoreMin: "",
    testGorillaScoreMin: "",
    kandioScoreMin: "",
    devSkillerScoreMin: "",
    imochaScoreMin: "",
    // Dil Yeterliliği
    ieltsScoreMin: "",
    toeflScoreMin: "",
    cefrLevel: "",
    duolingoScoreMin: "",
    // Kognitif & Soft Skills
    cognitiveTestScoreMin: "",
    discType: "",
    mbtiType: "",
    bigFiveOpennessMin: "",
    bigFiveConscientiousnessMin: "",
    bigFiveExtraversionMin: "",
    bigFiveAgreeablenessMin: "",
    bigFiveNeuroticismMin: "",
    // Sertifikalar
    awsCertified: false,
    azureCertified: false,
    scrumCertified: false,
    pmpCertified: false,
    googleAnalyticsCertified: false,
    metaBlueprintCertified: false,
    // Eğitim
    university: "",
    gpaMin: "",
    // Maaş & Uygunluk
    salaryMin: "",
    salaryMax: "",
    availability: "",
    interviewStatus: ""
  });
  const [aiQuery, setAiQuery] = useState("");
  const [assessmentDialogOpen, setAssessmentDialogOpen] = useState(false);
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    type: "",
    file: null as File | null,
    link: ""
  });
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [candidateDialogOpen, setCandidateDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadCompanyData();
  }, [user]);

  const loadCompanyData = async () => {
    if (!user) return;
    // Demo mode - hemen yükle
    setCompanyProfile(null);
    setAnalytics([]);
  };

  const handleSearchCandidates = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const results = await searchCandidatesForCompany(searchFilters);
      setCandidates(results);
    } catch (e) {
      console.warn('Firestore error, using dummy candidates:', e);
      setCandidates(DUMMY_CANDIDATES);
    } finally {
      setLoading(false);
    }
  };

  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;
    // AI arama simülasyonu
    setLoading(true);
    setTimeout(() => {
      const filtered = DUMMY_CANDIDATES.filter(candidate => 
        candidate.title.toLowerCase().includes(aiQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(aiQuery.toLowerCase()))
      );
      setCandidates(filtered);
      setLoading(false);
    }, 1000);
  };

  const handleUploadAssessment = async () => {
    if (!user) return;
    try {
      await uploadCompanyAssessment(user.uid, newAssessment);
      setAssessments(prev => [...prev, {
        id: Date.now().toString(),
        ...newAssessment,
        status: 'active',
        candidates: 0,
        avgScore: 0,
        createdAt: new Date()
      }]);
      setNewAssessment({ title: "", type: "", file: null, link: "" });
      setAssessmentDialogOpen(false);
    } catch (e) {
      console.error('Failed to upload assessment:', e);
    }
  };

  const clearFilters = () => {
    setSearchFilters({
      personalityType: "",
      expertise: "",
      location: "",
      experienceLevel: "",
      technicalScoreMin: "",
      aiScoreMin: "",
      // Değerlendirme Platformları
      hackerrankScoreMin: "",
      codilityScoreMin: "",
      testGorillaScoreMin: "",
      kandioScoreMin: "",
      devSkillerScoreMin: "",
      imochaScoreMin: "",
      // Dil Yeterliliği
      ieltsScoreMin: "",
      toeflScoreMin: "",
      cefrLevel: "",
      duolingoScoreMin: "",
      // Kognitif & Soft Skills
      cognitiveTestScoreMin: "",
      discType: "",
      mbtiType: "",
      bigFiveOpennessMin: "",
      bigFiveConscientiousnessMin: "",
      bigFiveExtraversionMin: "",
      bigFiveAgreeablenessMin: "",
      bigFiveNeuroticismMin: "",
      // Sertifikalar
      awsCertified: false,
      azureCertified: false,
      scrumCertified: false,
      pmpCertified: false,
      googleAnalyticsCertified: false,
      metaBlueprintCertified: false,
      // Eğitim
      university: "",
      gpaMin: "",
      // Maaş & Uygunluk
      salaryMin: "",
      salaryMax: "",
      availability: "",
      interviewStatus: ""
    });
    setCandidates(DUMMY_CANDIDATES);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin w-8 h-8 text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadCompanyData}>{t.loading}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-2 sm:p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <div className="text-gray-500 text-xs sm:text-sm">{t.subtitle}</div>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 mb-4 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{t.totalCandidates}</p>
                  <p className="text-lg sm:text-2xl font-bold">{candidates.length}</p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{t.activeAssessments}</p>
                  <p className="text-lg sm:text-2xl font-bold">{assessments.filter(a => a.status === 'active').length}</p>
                </div>
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{t.cvViews}</p>
                  <p className="text-lg sm:text-2xl font-bold">1,247</p>
                </div>
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{t.remainingViews}</p>
                  <p className="text-lg sm:text-2xl font-bold">753</p>
                </div>
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="candidates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="candidates" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.candidates}</span>
              <span className="sm:hidden">Adaylar</span>
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.assessments}</span>
              <span className="sm:hidden">Testler</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.analytics}</span>
              <span className="sm:hidden">Analiz</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.profile}</span>
              <span className="sm:hidden">Profil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-lg sm:text-xl">{t.searchCandidates}</span>
                  <Button onClick={() => setAssessmentDialogOpen(true)} className="w-full sm:w-auto">
                    <Upload className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t.uploadAssessment}</span>
                    <span className="sm:hidden">Yükle</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* AI Asistan */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800 text-sm sm:text-base">{t.aiAssistant}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input 
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder={t.describeRole}
                      className="flex-1 text-sm"
                    />
                    <Button onClick={handleAiSearch} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                      <Search className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">{t.findCandidates}</span>
                      <span className="sm:hidden">Ara</span>
                    </Button>
                  </div>
                </div>

                {/* Filtreler */}
                <div className="space-y-4">
                  {/* Temel Filtreler */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    <div>
                      <Label>{t.personalityType}</Label>
                      <Select value={searchFilters.personalityType} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, personalityType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="D">Dominant (D)</SelectItem>
                          <SelectItem value="I">Influencer (I)</SelectItem>
                          <SelectItem value="S">Steady (S)</SelectItem>
                          <SelectItem value="C">Compliant (C)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t.expertise}</Label>
                      <Select value={searchFilters.expertise} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, expertise: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Brand">Brand</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t.location}</Label>
                      <Input 
                        value={searchFilters.location}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Lokasyon"
                      />
                    </div>
                    <div>
                      <Label>{t.experienceLevel}</Label>
                      <Select value={searchFilters.experienceLevel} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, experienceLevel: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                          <SelectItem value="executive">Executive Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t.technicalScore}</Label>
                      <Input 
                        value={searchFilters.technicalScoreMin}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, technicalScoreMin: e.target.value }))}
                        placeholder="Min skor"
                        type="number"
                      />
                    </div>
                    <div>
                      <Label>{t.aiScore}</Label>
                      <Input 
                        value={searchFilters.aiScoreMin}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, aiScoreMin: e.target.value }))}
                        placeholder="Min skor"
                        type="number"
                      />
                    </div>
                  </div>

                  {/* Gelişmiş Filtreler - Accordion */}
                  <div className="border rounded-lg">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          <span className="font-medium">{t.filters} - Gelişmiş</span>
                        </div>
                        <div className="text-gray-500 group-open:rotate-180 transition-transform">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      
                      <div className="p-4 space-y-6">
                        {/* Değerlendirme Platformları */}
                        <div>
                          <h4 className="font-medium mb-3 text-sm">{t.assessmentPlatforms}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-xs">{t.hackerrankScore}</Label>
                              <Input 
                                value={searchFilters.hackerrankScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, hackerrankScoreMin: e.target.value }))}
                                placeholder="Min 70/100"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.codilityScore}</Label>
                              <Input 
                                value={searchFilters.codilityScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, codilityScoreMin: e.target.value }))}
                                placeholder="Min 80%"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.testGorillaScore}</Label>
                              <Input 
                                value={searchFilters.testGorillaScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, testGorillaScoreMin: e.target.value }))}
                                placeholder="Min skor"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.kandioScore}</Label>
                              <Input 
                                value={searchFilters.kandioScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, kandioScoreMin: e.target.value }))}
                                placeholder="Min skor"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.devSkillerScore}</Label>
                              <Input 
                                value={searchFilters.devSkillerScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, devSkillerScoreMin: e.target.value }))}
                                placeholder="Min skor"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.imochaScore}</Label>
                              <Input 
                                value={searchFilters.imochaScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, imochaScoreMin: e.target.value }))}
                                placeholder="Min skor"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dil Yeterliliği */}
                        <div>
                          <h4 className="font-medium mb-3 text-sm">{t.languageSkills}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                              <Label className="text-xs">{t.ieltsScore}</Label>
                              <Input 
                                value={searchFilters.ieltsScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, ieltsScoreMin: e.target.value }))}
                                placeholder="Min 6.5"
                                type="number"
                                step="0.5"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.toeflScore}</Label>
                              <Input 
                                value={searchFilters.toeflScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, toeflScoreMin: e.target.value }))}
                                placeholder="Min 90"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.cefrLevel}</Label>
                              <Select value={searchFilters.cefrLevel} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, cefrLevel: value }))}>
                                <SelectTrigger className="text-xs">
                                  <SelectValue placeholder="Seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="A1">A1 - Başlangıç</SelectItem>
                                  <SelectItem value="A2">A2 - Temel</SelectItem>
                                  <SelectItem value="B1">B1 - Orta</SelectItem>
                                  <SelectItem value="B2">B2 - İyi</SelectItem>
                                  <SelectItem value="C1">C1 - İleri</SelectItem>
                                  <SelectItem value="C2">C2 - Uzman</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">{t.duolingoScore}</Label>
                              <Input 
                                value={searchFilters.duolingoScoreMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, duolingoScoreMin: e.target.value }))}
                                placeholder="Min 110"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Sertifikalar */}
                        <div>
                          <h4 className="font-medium mb-3 text-sm">{t.certifications}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="awsCertified"
                                checked={searchFilters.awsCertified}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, awsCertified: e.target.checked }))}
                                className="rounded"
                              />
                              <Label htmlFor="awsCertified" className="text-xs">{t.awsCertified}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="azureCertified"
                                checked={searchFilters.azureCertified}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, azureCertified: e.target.checked }))}
                                className="rounded"
                              />
                              <Label htmlFor="azureCertified" className="text-xs">{t.azureCertified}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="scrumCertified"
                                checked={searchFilters.scrumCertified}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, scrumCertified: e.target.checked }))}
                                className="rounded"
                              />
                              <Label htmlFor="scrumCertified" className="text-xs">{t.scrumCertified}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="pmpCertified"
                                checked={searchFilters.pmpCertified}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, pmpCertified: e.target.checked }))}
                                className="rounded"
                              />
                              <Label htmlFor="pmpCertified" className="text-xs">{t.pmpCertified}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="googleAnalyticsCertified"
                                checked={searchFilters.googleAnalyticsCertified}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, googleAnalyticsCertified: e.target.checked }))}
                                className="rounded"
                              />
                              <Label htmlFor="googleAnalyticsCertified" className="text-xs">{t.googleAnalyticsCertified}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="metaBlueprintCertified"
                                checked={searchFilters.metaBlueprintCertified}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, metaBlueprintCertified: e.target.checked }))}
                                className="rounded"
                              />
                              <Label htmlFor="metaBlueprintCertified" className="text-xs">{t.metaBlueprintCertified}</Label>
                            </div>
                          </div>
                        </div>

                        {/* Eğitim & Maaş */}
                        <div>
                          <h4 className="font-medium mb-3 text-sm">{t.education} & {t.salaryExpectation}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                              <Label className="text-xs">{t.university}</Label>
                              <Input 
                                value={searchFilters.university}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, university: e.target.value }))}
                                placeholder="Üniversite adı"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.gpa}</Label>
                              <Input 
                                value={searchFilters.gpaMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, gpaMin: e.target.value }))}
                                placeholder="Min 3.0"
                                type="number"
                                step="0.1"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.minSalary}</Label>
                              <Input 
                                value={searchFilters.salaryMin}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, salaryMin: e.target.value }))}
                                placeholder="Min USD"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">{t.maxSalary}</Label>
                              <Input 
                                value={searchFilters.salaryMax}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, salaryMax: e.target.value }))}
                                placeholder="Maks USD"
                                type="number"
                                className="text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Uygunluk & Görüşme Durumu */}
                        <div>
                          <h4 className="font-medium mb-3 text-sm">{t.availability} & {t.interviewStatus}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">{t.availability}</Label>
                              <Select value={searchFilters.availability} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, availability: value }))}>
                                <SelectTrigger className="text-xs">
                                  <SelectValue placeholder="Seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="now">{t.availableNow}</SelectItem>
                                  <SelectItem value="month">{t.availableInMonth}</SelectItem>
                                  <SelectItem value="freelance">{t.freelanceOnly}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">{t.interviewStatus}</Label>
                              <Select value={searchFilters.interviewStatus} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, interviewStatus: value }))}>
                                <SelectTrigger className="text-xs">
                                  <SelectValue placeholder="Seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pre-interview">{t.preInterviewDone}</SelectItem>
                                  <SelectItem value="scheduled">{t.interviewScheduled}</SelectItem>
                                  <SelectItem value="completed">{t.interviewCompleted}</SelectItem>
                                  <SelectItem value="offer">{t.offerSent}</SelectItem>
                                  <SelectItem value="hired">{t.hired}</SelectItem>
                                  <SelectItem value="rejected">{t.rejected}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleSearchCandidates} className="w-full sm:w-auto">
                    <Search className="w-4 h-4 mr-2" />
                    {t.search}
                  </Button>
                  <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                    {t.clearFilters}
                  </Button>
                </div>

                {/* Aday Listesi */}
                <div className="space-y-3 sm:space-y-4">
                  {candidates.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">{t.noCandidates}</div>
                  ) : (
                    candidates.map(candidate => (
                      <Card key={candidate.id} className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                <h4 className="font-semibold text-sm sm:text-base truncate">{candidate.name}</h4>
                                <Badge variant="outline" className="text-xs w-fit">
                                  {candidate.personalityType}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 truncate">{candidate.title} • {candidate.company}</p>
                              <p className="text-xs text-gray-500 truncate">{candidate.location} • {candidate.experience}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <Badge className={`${getScoreBadge(candidate.technicalScore)} text-xs`}>
                                  <span className="hidden sm:inline">Teknik: </span>{candidate.technicalScore}
                                </Badge>
                                <Badge className={`${getScoreBadge(candidate.aiScore)} text-xs`}>
                                  <span className="hidden sm:inline">AI: </span>{candidate.aiScore}
                                </Badge>
                                <Badge className={`${getScoreBadge(candidate.simulationScore)} text-xs`}>
                                  <span className="hidden sm:inline">Sim: </span>{candidate.simulationScore}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1 sm:gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={() => {
                              setSelectedCandidate(candidate);
                              setCandidateDialogOpen(true);
                            }} className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline ml-1">Görüntüle</span>
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
                              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline ml-1">Mesaj</span>
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
                              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline ml-1">İndir</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-lg sm:text-xl">{t.assessments}</span>
                  <Button onClick={() => setAssessmentDialogOpen(true)} className="w-full sm:w-auto">
                    <Upload className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t.uploadAssessment}</span>
                    <span className="sm:hidden">Yükle</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {assessments.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">{t.noAssessments}</div>
                  ) : (
                    assessments.map(assessment => (
                      <Card key={assessment.id} className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base truncate">{assessment.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{assessment.type} • {assessment.candidates} aday</p>
                            <p className="text-xs text-gray-500 truncate">
                              {assessment.createdAt.toLocaleDateString()} • Ortalama: {assessment.avgScore}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <Badge variant={assessment.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                              {assessment.status}
                            </Badge>
                            <Button size="sm" variant="outline" className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.analytics}</CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">{t.noAnalytics}</div>
                ) : (
                  <div className="space-y-4">
                    {analytics.map(analytic => (
                      <div key={analytic.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{analytic.title}</h4>
                          <p className="text-sm text-gray-600">{analytic.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{analytic.views || 0}</p>
                          <p className="text-xs text-gray-500">Görüntülenme</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{t.subscription}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-semibold text-sm sm:text-base">{t.currentPlan}</h3>
                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm sm:text-base">Aylık Plan</span>
                        <Badge className="bg-blue-600 text-xs">Aktif</Badge>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">$999/ay</p>
                      <p className="text-xs sm:text-sm text-gray-600">1,000 CV görüntüleme dahil</p>
                    </div>
                    <Button className="w-full h-10 sm:h-11 text-sm sm:text-base">
                      {t.upgrade}
                    </Button>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-semibold text-sm sm:text-base">Yıllık Plan</h3>
                    <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm sm:text-base">Yıllık Plan</span>
                        <Badge className="bg-green-600 text-xs">%17 İndirim</Badge>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-green-600">$9,999/yıl</p>
                      <p className="text-xs sm:text-sm text-gray-600">12,000 CV görüntüleme dahil</p>
                    </div>
                    <Button variant="outline" className="w-full h-10 sm:h-11 text-sm sm:text-base">
                      {t.upgrade}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Değerlendirme Yükleme Dialog */}
      <Dialog open={assessmentDialogOpen} onOpenChange={setAssessmentDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] sm:w-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">{t.uploadAssessment}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label className="text-sm sm:text-base">{t.assessmentTitle}</Label>
              <Input 
                value={newAssessment.title}
                onChange={(e) => setNewAssessment(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Değerlendirme başlığı"
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-base">{t.assessmentType}</Label>
              <Select value={newAssessment.type} onValueChange={(value) => setNewAssessment(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Değerlendirme tipi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Teknik</SelectItem>
                  <SelectItem value="Personality">Kişilik</SelectItem>
                  <SelectItem value="Simulation">Simülasyon</SelectItem>
                  <SelectItem value="Interview">Mülakat</SelectItem>
                  <SelectItem value="Custom">Özel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label className="text-sm sm:text-base">{t.uploadFile}</Label>
                <Input 
                  type="file"
                  onChange={(e) => setNewAssessment(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                  accept=".pdf,.doc,.docx"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-sm sm:text-base">{t.uploadLink}</Label>
                <Input 
                  value={newAssessment.link}
                  onChange={(e) => setNewAssessment(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="Değerlendirme linki"
                  className="text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleUploadAssessment} className="flex-1 h-10 sm:h-11 text-sm sm:text-base">
                {t.save}
              </Button>
              <Button variant="outline" onClick={() => setAssessmentDialogOpen(false)} className="h-10 sm:h-11 text-sm sm:text-base">
                {t.cancel}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Aday Profili Dialog */}
      <Dialog open={candidateDialogOpen} onOpenChange={setCandidateDialogOpen}>
        <DialogContent className="max-w-4xl w-[95vw] sm:w-auto max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">{t.candidateProfile}</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4 sm:space-y-6">
              {/* Temel Bilgiler */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold truncate">{selectedCandidate.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 truncate">{selectedCandidate.title} • {selectedCandidate.company}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{selectedCandidate.location} • {selectedCandidate.experience}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{selectedCandidate.personalityType}</Badge>
                    <Badge variant="outline" className="text-xs">{selectedCandidate.expertise}</Badge>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline ml-1">Mail</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline ml-1">İndir</span>
                  </Button>
                </div>
              </div>

              {/* Skorlar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className={`text-xl sm:text-2xl font-bold ${getScoreColor(selectedCandidate.technicalScore)}`}>
                    {selectedCandidate.technicalScore}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Teknik Skor</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className={`text-xl sm:text-2xl font-bold ${getScoreColor(selectedCandidate.aiScore)}`}>
                    {selectedCandidate.aiScore}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">AI Skor</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className={`text-xl sm:text-2xl font-bold ${getScoreColor(selectedCandidate.simulationScore)}`}>
                    {selectedCandidate.simulationScore}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Simülasyon</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className={`text-xl sm:text-2xl font-bold ${getScoreColor(selectedCandidate.interviewScore)}`}>
                    {selectedCandidate.interviewScore}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Mülakat</div>
                </div>
              </div>

              {/* Detaylar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Yetenekler</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Eğitim & Sertifikalar</h4>
                  <div className="space-y-2">
                    <p className="text-sm">{selectedCandidate.education}</p>
                    {selectedCandidate.certifications.map((cert: string, index: number) => (
                      <Badge key={index} variant="secondary">{cert}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kişilik ve Uzmanlık Skorları */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Kişilik Envanteri</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedCandidate.personalityScore).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm">{key}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Uzmanlık Analizi</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedCandidate.expertiseScore).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm">{key}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 