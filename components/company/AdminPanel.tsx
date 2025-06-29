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

export function AdminPanel() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Şirket Yönetim Paneli</h1>
            <p className="text-gray-600">Nitelikli adayları keşfedin ve CV'lerini inceleyin</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </Button>
            <Button>
              <Crown className="w-4 h-4 mr-2" />
              Paket Yükselt
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Toplam Aday</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCandidates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">CV Görüntüleme</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.viewsUsed}/{stats.viewsLimit}</p>
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
                  <p className="text-sm text-gray-600">Mevcut Paket</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.currentPlan === 'monthly' ? 'Aylık' : 'Yıllık'}
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
                  <p className="text-sm text-gray-600">Paket Ücreti</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.currentPlan === 'monthly' ? '9.999₺' : '100.000₺'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Aday Arama ve Filtreleme</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>{showFilters ? 'Filtreleri Gizle' : 'Gelişmiş Filtreler'}</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="İsim, rol veya beceri ile arama yapın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Kişilik Tipi</Label>
                <Select value={filters.personalityType} onValueChange={(value) => setFilters({...filters, personalityType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tümü" />
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
                <Label>DISC Rengi</Label>
                <Select value={filters.discColor} onValueChange={(value) => setFilters({...filters, discColor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tümü" />
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
                <Label>Beceri</Label>
                <Input
                  placeholder="React, Python..."
                  value={filters.skills}
                  onChange={(e) => setFilters({...filters, skills: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Konum</Label>
                <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tümü" />
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
                <Label>Deneyim</Label>
                <Select value={filters.experience} onValueChange={(value) => setFilters({...filters, experience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tümü" />
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

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Gelişmiş Filtreler</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* DISC Score Range */}
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

                  {/* Expertise */}
                  <div className="space-y-3">
                    <Label>Uzmanlık Alanı</Label>
                    <Input
                      placeholder="Frontend, Marketing..."
                      value={filters.expertise}
                      onChange={(e) => setFilters({...filters, expertise: e.target.value})}
                    />
                  </div>

                  {/* Expertise Score Range */}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Assessment Score Range */}
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

                  {/* Assessment Completed */}
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

                  {/* AI Interview Score Range */}
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

                  {/* AI Interview Completed */}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Simulation Score Range */}
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

                  {/* Clear Filters Button */}
                  <div className="flex items-end">
                    <Button
                      variant="outline"
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
                      className="w-full"
                    >
                      Filtreleri Temizle
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>
              Adaylar ({filteredCandidates.length} sonuç)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">{candidate.email}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{candidate.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{candidate.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Building2 className="w-4 h-4" />
                            <span>{candidate.education}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{candidate.personalityType}</Badge>
                            <Badge 
                              variant="outline" 
                              className={`${
                                candidate.discColor === 'red' ? 'border-red-300 text-red-700 bg-red-50' :
                                candidate.discColor === 'yellow' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                                candidate.discColor === 'green' ? 'border-green-300 text-green-700 bg-green-50' :
                                'border-blue-300 text-blue-700 bg-blue-50'
                              }`}
                            >
                              DISC: {candidate.discScore}/100
                            </Badge>
                            <Badge variant="outline">{candidate.suggestedRole}</Badge>
                          </div>
                          
                          {/* Expertise and Scores */}
                          <div className="flex items-center space-x-2">
                            <Badge variant="default" className="bg-purple-100 text-purple-700 border-purple-200">
                              Uzmanlık: {candidate.expertiseScore}/100
                            </Badge>
                            {candidate.assessmentScore && (
                              <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                                Assessment: {candidate.assessmentScore}/100
                              </Badge>
                            )}
                            {candidate.aiInterviewScore && (
                              <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200">
                                AI Mülakat: {candidate.aiInterviewScore}/100
                              </Badge>
                            )}
                            {candidate.simulationScore && (
                              <Badge variant="default" className="flex items-center space-x-1 bg-orange-100 text-orange-700 border-orange-200">
                                <Star className="w-3 h-3" />
                                <span>Simülasyon: {candidate.simulationScore}/100</span>
                              </Badge>
                            )}
                          </div>
                          
                          {/* Expertise Areas */}
                          <div className="flex flex-wrap gap-2">
                            {candidate.expertise.map((exp, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
                                {exp}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 4} daha
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCV(candidate)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>CV Görüntüle</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadCV(candidate)}
                        className="flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>İndir</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Completion Status */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${candidate.assessmentCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span>Assessment {candidate.assessmentCompleted ? '✓' : '○'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${candidate.aiInterviewCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span>AI Mülakat {candidate.aiInterviewCompleted ? '✓' : '○'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${candidate.simulationScore ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span>Simülasyon {candidate.simulationScore ? '✓' : '○'}</span>
                        </div>
                      </div>
                      <div className="text-xs">
                        Son aktif: {isClient ? new Date(candidate.lastActive).toLocaleDateString('tr-TR') : candidate.lastActive}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredCandidates.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aday bulunamadı</h3>
                  <p className="text-gray-600">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 