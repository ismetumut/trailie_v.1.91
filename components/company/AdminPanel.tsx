'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Users, 
  Settings,
  Crown,
  TrendingUp,
  DollarSign,
  Building2,
  Star,
  FileText
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  personalityType: string;
  discColor: 'red' | 'yellow' | 'green' | 'blue';
  discScore: number;
  skills: string[];
  expertise: string[];
  expertiseScore: number;
  suggestedRole: string;
  location: string;
  experience: string;
  education: string;
  assessmentScore?: number;
  assessmentCompleted: boolean;
  aiInterviewScore?: number;
  aiInterviewCompleted: boolean;
  simulationScore?: number;
  cvUrl?: string;
  avatar?: string;
  lastActive: string;
}

interface CompanyStats {
  totalCandidates: number;
  monthlyViews: number;
  annualViews: number;
  currentPlan: 'monthly' | 'annual';
  viewsUsed: number;
  viewsLimit: number;
}

interface Filters {
  personalityType: string;
  discColor: string;
  discScoreMin: number;
  discScoreMax: number;
  skills: string;
  expertise: string;
  expertiseScoreMin: number;
  expertiseScoreMax: number;
  location: string;
  role: string;
  experience: string;
  assessmentScoreMin: number;
  assessmentScoreMax: number;
  assessmentCompleted: boolean | null;
  aiInterviewScoreMin: number;
  aiInterviewScoreMax: number;
  aiInterviewCompleted: boolean | null;
  simulationScoreMin: number;
  simulationScoreMax: number;
}

interface AdminPanelProps {
  language?: 'tr' | 'en';
}

export function AdminPanel({ language = 'tr' }: AdminPanelProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    personalityType: 'all',
    discColor: 'all',
    discScoreMin: 0,
    discScoreMax: 100,
    skills: '',
    expertise: '',
    expertiseScoreMin: 0,
    expertiseScoreMax: 100,
    location: 'all',
    role: 'all',
    experience: 'all',
    assessmentScoreMin: 0,
    assessmentScoreMax: 100,
    assessmentCompleted: null,
    aiInterviewScoreMin: 0,
    aiInterviewScoreMax: 100,
    aiInterviewCompleted: null,
    simulationScoreMin: 0,
    simulationScoreMax: 100
  });

  const [showFilters, setShowFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [stats] = useState<CompanyStats>({
    totalCandidates: 1247,
    monthlyViews: 20,
    annualViews: 0,
    currentPlan: 'monthly',
    viewsUsed: 8,
    viewsLimit: 20
  });

  // Sample candidates data with enhanced fields
  const sampleCandidates: Candidate[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@email.com',
      personalityType: 'INTJ',
      discColor: 'red',
      discScore: 85,
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      expertise: ['Frontend Development', 'Backend Development'],
      expertiseScore: 88,
      suggestedRole: 'Senior Frontend Developer',
      location: 'İstanbul',
      experience: '5-7 yıl',
      education: 'Bilgisayar Mühendisliği',
      assessmentScore: 87,
      assessmentCompleted: true,
      aiInterviewScore: 92,
      aiInterviewCompleted: true,
      simulationScore: 87,
      avatar: '/placeholder-user.jpg',
      lastActive: '2024-01-15'
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse.demir@email.com',
      personalityType: 'ENFP',
      discColor: 'yellow',
      discScore: 78,
      skills: ['Product Management', 'Agile', 'User Research', 'Data Analysis'],
      expertise: ['Product Management', 'User Experience'],
      expertiseScore: 92,
      suggestedRole: 'Product Manager',
      location: 'Ankara',
      experience: '3-5 yıl',
      education: 'İşletme',
      assessmentScore: 94,
      assessmentCompleted: true,
      aiInterviewScore: 89,
      aiInterviewCompleted: true,
      simulationScore: 92,
      avatar: '/placeholder-user.jpg',
      lastActive: '2024-01-14'
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet.kaya@email.com',
      personalityType: 'ISTP',
      discColor: 'green',
      discScore: 72,
      skills: ['Python', 'Machine Learning', 'Data Science', 'SQL'],
      expertise: ['Data Science', 'Machine Learning'],
      expertiseScore: 85,
      suggestedRole: 'Data Scientist',
      location: 'İzmir',
      experience: '2-4 yıl',
      education: 'İstatistik',
      assessmentScore: 78,
      assessmentCompleted: true,
      aiInterviewScore: 81,
      aiInterviewCompleted: true,
      simulationScore: 78,
      avatar: '/placeholder-user.jpg',
      lastActive: '2024-01-13'
    },
    {
      id: '4',
      name: 'Fatma Özkan',
      email: 'fatma.ozkan@email.com',
      personalityType: 'ESFJ',
      discColor: 'blue',
      discScore: 90,
      skills: ['Marketing', 'Social Media', 'Content Creation', 'Analytics'],
      expertise: ['Digital Marketing', 'Content Strategy'],
      expertiseScore: 89,
      suggestedRole: 'Marketing Manager',
      location: 'İstanbul',
      experience: '4-6 yıl',
      education: 'İletişim',
      assessmentScore: 91,
      assessmentCompleted: true,
      aiInterviewScore: 87,
      aiInterviewCompleted: true,
      simulationScore: 89,
      avatar: '/placeholder-user.jpg',
      lastActive: '2024-01-12'
    },
    {
      id: '5',
      name: 'Ali Çelik',
      email: 'ali.celik@email.com',
      personalityType: 'ENTP',
      discColor: 'red',
      discScore: 82,
      skills: ['Sales', 'Negotiation', 'CRM', 'Business Development'],
      expertise: ['Sales Management', 'Business Development'],
      expertiseScore: 76,
      suggestedRole: 'Sales Manager',
      location: 'Bursa',
      experience: '6-8 yıl',
      education: 'İşletme',
      assessmentScore: 85,
      assessmentCompleted: true,
      aiInterviewScore: 79,
      aiInterviewCompleted: true,
      simulationScore: 82,
      avatar: '/placeholder-user.jpg',
      lastActive: '2024-01-11'
    }
  ];

  useEffect(() => {
    setCandidates(sampleCandidates);
    setFilteredCandidates(sampleCandidates);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let filtered = candidates;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.suggestedRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        candidate.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Enhanced filters
    if (filters.personalityType && filters.personalityType !== 'all') {
      filtered = filtered.filter(candidate => candidate.personalityType === filters.personalityType);
    }
    if (filters.discColor && filters.discColor !== 'all') {
      filtered = filtered.filter(candidate => candidate.discColor === filters.discColor);
    }
    if (filters.discScoreMin > 0 || filters.discScoreMax < 100) {
      filtered = filtered.filter(candidate => 
        candidate.discScore >= filters.discScoreMin && candidate.discScore <= filters.discScoreMax
      );
    }
    if (filters.skills) {
      filtered = filtered.filter(candidate => 
        candidate.skills.some(skill => skill.toLowerCase().includes(filters.skills.toLowerCase()))
      );
    }
    if (filters.expertise) {
      filtered = filtered.filter(candidate => 
        candidate.expertise.some(exp => exp.toLowerCase().includes(filters.expertise.toLowerCase()))
      );
    }
    if (filters.expertiseScoreMin > 0 || filters.expertiseScoreMax < 100) {
      filtered = filtered.filter(candidate => 
        candidate.expertiseScore >= filters.expertiseScoreMin && candidate.expertiseScore <= filters.expertiseScoreMax
      );
    }
    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(candidate => candidate.location === filters.location);
    }
    if (filters.role && filters.role !== 'all') {
      filtered = filtered.filter(candidate => candidate.suggestedRole === filters.role);
    }
    if (filters.experience && filters.experience !== 'all') {
      filtered = filtered.filter(candidate => candidate.experience === filters.experience);
    }
    if (filters.assessmentScoreMin > 0 || filters.assessmentScoreMax < 100) {
      filtered = filtered.filter(candidate => 
        candidate.assessmentScore && 
        candidate.assessmentScore >= filters.assessmentScoreMin && 
        candidate.assessmentScore <= filters.assessmentScoreMax
      );
    }
    if (filters.assessmentCompleted !== null) {
      filtered = filtered.filter(candidate => candidate.assessmentCompleted === filters.assessmentCompleted);
    }
    if (filters.aiInterviewScoreMin > 0 || filters.aiInterviewScoreMax < 100) {
      filtered = filtered.filter(candidate => 
        candidate.aiInterviewScore && 
        candidate.aiInterviewScore >= filters.aiInterviewScoreMin && 
        candidate.aiInterviewScore <= filters.aiInterviewScoreMax
      );
    }
    if (filters.aiInterviewCompleted !== null) {
      filtered = filtered.filter(candidate => candidate.aiInterviewCompleted === filters.aiInterviewCompleted);
    }
    if (filters.simulationScoreMin > 0 || filters.simulationScoreMax < 100) {
      filtered = filtered.filter(candidate => 
        candidate.simulationScore && 
        candidate.simulationScore >= filters.simulationScoreMin && 
        candidate.simulationScore <= filters.simulationScoreMax
      );
    }

    setFilteredCandidates(filtered);
  }, [candidates, searchTerm, filters]);

  const handleViewCV = (candidate: Candidate) => {
    if (stats.viewsUsed >= stats.viewsLimit) {
      alert('CV görüntüleme limitiniz dolmuştur. Paketinizi yükseltin.');
      return;
    }
    // Handle CV viewing logic
    console.log('Viewing CV for:', candidate.name);
  };

  const handleDownloadCV = (candidate: Candidate) => {
    if (stats.viewsUsed >= stats.viewsLimit) {
      alert('CV indirme limitiniz dolmuştur. Paketinizi yükseltin.');
      return;
    }
    // Handle CV download logic
    console.log('Downloading CV for:', candidate.name);
  };

  const t = {
    tr: {
      title: 'Şirket Yönetim Paneli',
      subtitle: "Nitelikli adayları keşfedin ve CV'lerini inceleyin",
      settings: 'Ayarlar',
      upgrade: 'Paket Yükselt',
      totalCandidates: 'Toplam Aday',
      cvViews: 'CV Görüntüleme',
      currentPlan: 'Mevcut Paket',
      planPrice: 'Paket Ücreti',
      monthly: 'Aylık',
      annual: 'Yıllık',
      searchFilter: 'Aday Arama ve Filtreleme',
      searchPlaceholder: 'isim, rol veya beceri ile arama yapın...',
      personalityType: 'Kişilik Tipi',
      discColor: 'DISC Rengi',
      skill: 'Beceri',
      location: 'Konum',
      experience: 'Deneyim',
      all: 'Tümü',
      advancedFilters: 'Gelişmiş Filtreler',
      candidates: 'Adaylar',
      results: 'sonuç',
      viewCV: 'CV Görüntüle',
      download: 'İndir',
      assessment: 'Assessment',
      aiInterview: 'AI Mülakat',
      simulation: 'Simülasyon',
      frontend: 'Frontend Development',
      backend: 'Backend Development',
      product: 'Product Management',
      marketing: 'Marketing',
      sales: 'Sales',
      senior: 'Kıdemli',
      manager: 'Yönetici',
      filter: 'Filtrele',
      clear: 'Temizle',
    },
    en: {
      title: 'Company Admin Panel',
      subtitle: 'Discover qualified candidates and review their CVs',
      settings: 'Settings',
      upgrade: 'Upgrade Plan',
      totalCandidates: 'Total Candidates',
      cvViews: 'CV Views',
      currentPlan: 'Current Plan',
      planPrice: 'Plan Price',
      monthly: 'Monthly',
      annual: 'Annual',
      searchFilter: 'Candidate Search & Filter',
      searchPlaceholder: 'search by name, role or skill...',
      personalityType: 'Personality Type',
      discColor: 'DISC Color',
      skill: 'Skill',
      location: 'Location',
      experience: 'Experience',
      all: 'All',
      advancedFilters: 'Advanced Filters',
      candidates: 'Candidates',
      results: 'results',
      viewCV: 'View CV',
      download: 'Download',
      assessment: 'Assessment',
      aiInterview: 'AI Interview',
      simulation: 'Simulation',
      frontend: 'Frontend Development',
      backend: 'Backend Development',
      product: 'Product Management',
      marketing: 'Marketing',
      sales: 'Sales',
      senior: 'Senior',
      manager: 'Manager',
      filter: 'Filter',
      clear: 'Clear',
    }
  }[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-teal-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{t.subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2 md:mt-0 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <Settings className="w-4 h-4 mr-2" />
              {t.settings}
            </Button>
            <Button className="w-full sm:w-auto">
              <Crown className="w-4 h-4 mr-2" />
              {t.upgrade}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t.totalCandidates}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.totalCandidates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t.cvViews}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.viewsUsed}/{stats.viewsLimit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.currentPlan}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.currentPlan === 'monthly' ? t.monthly : t.annual}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.planPrice}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.currentPlan === 'monthly' ? '9.999₺' : '100.000₺'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtreler ve arama */}
        <Card className="overflow-x-auto">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span className="text-base sm:text-lg">{t.searchFilter}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto mt-2 sm:mt-0"
                  onClick={() => setShowFilters((v) => !v)}
                >
                  <Filter className="w-4 h-4" />
                  <span>{showFilters ? t.clear : t.advancedFilters}</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-2 py-2 text-sm w-full"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4">
              <div className="space-y-2">
                <Label>{t.personalityType}</Label>
                <Select value={filters.personalityType} onValueChange={(value) => setFilters({...filters, personalityType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.all} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="INTJ">INTJ</SelectItem>
                    <SelectItem value="INTP">INTP</SelectItem>
                    <SelectItem value="ENTJ">ENTJ</SelectItem>
                    <SelectItem value="ENTP">ENTP</SelectItem>
                    <SelectItem value="INFJ">INFJ</SelectItem>
                    <SelectItem value="INFP">INFP</SelectItem>
                    <SelectItem value="ENFJ">ENFJ</SelectItem>
                    <SelectItem value="ENFP">ENFP</SelectItem>
                    <SelectItem value="ISTJ">ISTJ</SelectItem>
                    <SelectItem value="ISFJ">ISFJ</SelectItem>
                    <SelectItem value="ESTJ">ESTJ</SelectItem>
                    <SelectItem value="ESFJ">ESFJ</SelectItem>
                    <SelectItem value="ISTP">ISTP</SelectItem>
                    <SelectItem value="ISFP">ISFP</SelectItem>
                    <SelectItem value="ESTP">ESTP</SelectItem>
                    <SelectItem value="ESFP">ESFP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.discColor}</Label>
                <Select value={filters.discColor} onValueChange={(value) => setFilters({...filters, discColor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.all} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="red">Kırmızı (Dominant)</SelectItem>
                    <SelectItem value="yellow">Sarı (Influential)</SelectItem>
                    <SelectItem value="green">Yeşil (Steady)</SelectItem>
                    <SelectItem value="blue">Mavi (Conscientious)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.skill}</Label>
                <Input
                  placeholder="React, Python..."
                  value={filters.skills}
                  onChange={(e) => setFilters({...filters, skills: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.location}</Label>
                <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.all} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="İstanbul">İstanbul</SelectItem>
                    <SelectItem value="Ankara">Ankara</SelectItem>
                    <SelectItem value="İzmir">İzmir</SelectItem>
                    <SelectItem value="Bursa">Bursa</SelectItem>
                    <SelectItem value="Antalya">Antalya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.experience}</Label>
                <Select value={filters.experience} onValueChange={(value) => setFilters({...filters, experience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.all} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="0-2 yıl">0-2 yıl</SelectItem>
                    <SelectItem value="2-4 yıl">2-4 yıl</SelectItem>
                    <SelectItem value="3-5 yıl">3-5 yıl</SelectItem>
                    <SelectItem value="5-7 yıl">5-7 yıl</SelectItem>
                    <SelectItem value="7+ yıl">7+ yıl</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 mt-2">
                <div className="space-y-3">
                  <Label>DISC Skor Aralığı</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.discScoreMin}
                      onChange={(e) => setFilters({...filters, discScoreMin: parseInt(e.target.value) || 0})}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.discScoreMax}
                      onChange={(e) => setFilters({...filters, discScoreMax: parseInt(e.target.value) || 100})}
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Uzmanlık Alanı</Label>
                  <Input
                    placeholder="Frontend, Marketing..."
                    value={filters.expertise}
                    onChange={(e) => setFilters({...filters, expertise: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Uzmanlık Skor Aralığı</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.expertiseScoreMin}
                      onChange={(e) => setFilters({...filters, expertiseScoreMin: parseInt(e.target.value) || 0})}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.expertiseScoreMax}
                      onChange={(e) => setFilters({...filters, expertiseScoreMax: parseInt(e.target.value) || 100})}
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Assessment Skor Aralığı</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.assessmentScoreMin}
                      onChange={(e) => setFilters({...filters, assessmentScoreMin: parseInt(e.target.value) || 0})}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.assessmentScoreMax}
                      onChange={(e) => setFilters({...filters, assessmentScoreMax: parseInt(e.target.value) || 100})}
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Assessment Durumu</Label>
                  <Select value={filters.assessmentCompleted?.toString() || 'all'} onValueChange={(value) => setFilters({...filters, assessmentCompleted: value === 'all' ? null : value === 'true'})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tümü" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="true">Tamamlandı</SelectItem>
                      <SelectItem value="false">Tamamlanmadı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>AI Mülakat Skor Aralığı</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.aiInterviewScoreMin}
                      onChange={(e) => setFilters({...filters, aiInterviewScoreMin: parseInt(e.target.value) || 0})}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.aiInterviewScoreMax}
                      onChange={(e) => setFilters({...filters, aiInterviewScoreMax: parseInt(e.target.value) || 100})}
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>AI Mülakat Durumu</Label>
                  <Select value={filters.aiInterviewCompleted?.toString() || 'all'} onValueChange={(value) => setFilters({...filters, aiInterviewCompleted: value === 'all' ? null : value === 'true'})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tümü" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="true">Tamamlandı</SelectItem>
                      <SelectItem value="false">Tamamlanmadı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Simülasyon Skor Aralığı</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.simulationScoreMin}
                      onChange={(e) => setFilters({...filters, simulationScoreMin: parseInt(e.target.value) || 0})}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.simulationScoreMax}
                      onChange={(e) => setFilters({...filters, simulationScoreMax: parseInt(e.target.value) || 100})}
                      className="w-20"
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-2 sm:mt-0"
                  onClick={() => setFilters({
                    personalityType: '',
                    discColor: '',
                    discScoreMin: 0,
                    discScoreMax: 100,
                    skills: '',
                    expertise: '',
                    expertiseScoreMin: 0,
                    expertiseScoreMax: 100,
                    location: '',
                    role: '',
                    experience: '',
                    assessmentScoreMin: 0,
                    assessmentScoreMax: 100,
                    assessmentCompleted: null,
                    aiInterviewScoreMin: 0,
                    aiInterviewScoreMax: 100,
                    aiInterviewCompleted: null,
                    simulationScoreMin: 0,
                    simulationScoreMax: 100
                  })}
                >
                  {t.clear}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aday Listesi */}
        <Card className="overflow-x-auto">
          <CardHeader>
            <CardTitle>
              <span className="text-base sm:text-lg">{t.candidates} ({filteredCandidates.length} {t.results})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="flex flex-col gap-2 p-2 border-b last:border-b-0 bg-white rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-row items-start gap-3 w-full">
                    <Avatar className="w-14 h-14 min-w-[56px]">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg break-words">{candidate.name}</div>
                      <div className="text-gray-500 text-sm break-all">{candidate.email}</div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{candidate.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{candidate.experience}</span>
                        <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" />{candidate.education}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">{candidate.personalityType}</Badge>
                        <Badge variant="destructive" className="text-xs">DISC: {candidate.discScore}/100</Badge>
                        <Badge variant="default" className="text-xs">{candidate.suggestedRole}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="default" className="bg-purple-100 text-purple-700 border-purple-200 text-xs">Uzmanlık: {candidate.expertiseScore}/100</Badge>
                        {candidate.assessmentScore && (
                          <Badge variant="default" className="bg-green-100 text-green-700 border-green-200 text-xs">Assessment: {candidate.assessmentScore}/100</Badge>
                        )}
                        {candidate.aiInterviewScore && (
                          <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">AI Interview: {candidate.aiInterviewScore}/100</Badge>
                        )}
                        {candidate.simulationScore && (
                          <Badge variant="default" className="flex items-center space-x-1 bg-orange-100 text-orange-700 border-orange-200 text-xs"><Star className="w-3 h-3" /><span>Simulation: {candidate.simulationScore}/100</span></Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {candidate.expertise.map((exp, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{exp}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {candidate.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto sm:items-end mt-2 sm:mt-0">
                    <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{t.viewCV}</span>
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>{t.download}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 