"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, UserCheck, UserX, Loader2, MessageCircle, Globe, Briefcase, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  saveConnection, 
  getUserConnections, 
  updateConnectionStatus, 
  getNetworkSuggestions,
  markSuggestionAsViewed 
} from "@/lib/firebase";
import { UserCard } from "./user-card";

const content = {
  tr: {
    title: "Network",
    subtitle: "Kariyer yolculuğunda sana yardımcı olabilecek profesyonellerle bağlantı kur",
    suggestions: "Öneriler",
    connections: "Bağlantılar",
    pending: "Bekleyen",
    accepted: "Kabul Edilen",
    rejected: "Reddedilen",
    connect: "Bağlantı Kur",
    message: "Mesaj Gönder",
    accept: "Kabul Et",
    reject: "Reddet",
    loading: "Yükleniyor...",
    error: "Yüklenemedi.",
    empty: "Henüz bağlantı yok.",
    noSuggestions: "Henüz öneri yok.",
    status: {
      pending: "Beklemede",
      accepted: "Kabul Edildi",
      rejected: "Reddedildi"
    }
  },
  en: {
    title: "Network",
    subtitle: "Connect with professionals who can help you in your career journey",
    suggestions: "Suggestions",
    connections: "Connections",
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    connect: "Connect",
    message: "Send Message",
    accept: "Accept",
    reject: "Reject",
    loading: "Loading...",
    error: "Failed to load.",
    empty: "No connections yet.",
    noSuggestions: "No suggestions yet.",
    status: {
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected"
    }
  }
};

// Örnek network önerileri
const sampleSuggestions = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    profession: "Product Manager",
    experience: "5+ yıl",
    location: "İstanbul, Türkiye",
    interests: ["Product Strategy", "User Research", "Agile"],
    avatar: "AY",
    company: "TechCorp",
    mutualConnections: 3,
    reason: "Benzer kariyer yolculuğu"
  },
  {
    id: 2,
    name: "Zeynep Kaya",
    profession: "UX Designer",
    experience: "3+ yıl",
    location: "Ankara, Türkiye",
    interests: ["UI/UX", "Design Systems", "User Testing"],
    avatar: "ZK",
    company: "DesignStudio",
    mutualConnections: 2,
    reason: "Ortak ilgi alanları"
  },
  {
    id: 3,
    name: "Mehmet Demir",
    profession: "Data Scientist",
    experience: "4+ yıl",
    location: "İzmir, Türkiye",
    interests: ["Machine Learning", "Python", "Data Analysis"],
    avatar: "MD",
    company: "DataTech",
    mutualConnections: 1,
    reason: "Aynı sektör"
  }
];

const DUMMY_NETWORK = [
  {
    id: '1',
    name: 'Ayşe Yılmaz',
    title: 'Pazarlama Müdürü',
    company: 'ABC Teknoloji',
    location: 'İstanbul',
    expertise: 'Pazarlama',
    personalityType: 'I',
    image: '',
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    title: 'Satış Uzmanı',
    company: 'XYZ Danışmanlık',
    location: 'Ankara',
    expertise: 'Satış',
    personalityType: 'D',
    image: '',
  },
  {
    id: '3',
    name: 'Elif Kaya',
    title: 'Ürün Yöneticisi',
    company: 'StartUpX',
    location: 'İzmir',
    expertise: 'Ürün',
    personalityType: 'C',
    image: '',
  },
];

export default function NetworkingPage({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<any[]>(sampleSuggestions);
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectingId, setConnectingId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchNetwork() {
      setLoading(true);
      setError(null);
      try {
        // Firestore'dan veri çek
        const data = await getUserConnections(user?.uid);
        if (!cancelled) {
          if (!data || data.length === 0) {
            setConnections(DUMMY_NETWORK);
          } else {
            setConnections(data);
          }
        }
      } catch (e) {
        if (!cancelled) {
          console.warn('Firestore error, using dummy data:', e);
          setConnections(DUMMY_NETWORK);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchNetwork();
    return () => { cancelled = true; };
  }, [user]);

  const handleConnect = async (suggestion: any) => {
    if (!user) return;
    setConnectingId(suggestion.id);
    try {
      await saveConnection(user.uid, {
        targetUserId: suggestion.id,
        targetUserName: suggestion.name,
        targetUserProfession: suggestion.profession,
        targetUserCompany: suggestion.company,
        reason: suggestion.reason,
        mutualConnections: suggestion.mutualConnections
      });
      
      // Local state'i güncelle
      setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      setConnections(prev => [...prev, {
        id: Date.now().toString(),
        targetUserId: suggestion.id,
        targetUserName: suggestion.name,
        targetUserProfession: suggestion.profession,
        targetUserCompany: suggestion.company,
        status: 'pending',
        createdAt: new Date()
      }]);
    } catch (e) {
      console.error('Failed to connect:', e);
    } finally {
      setConnectingId(null);
    }
  };

  const handleConnectionAction = async (connectionId: string, action: 'accept' | 'reject') => {
    if (!user) return;
    try {
      await updateConnectionStatus(user.uid, connectionId, action === 'accept' ? 'accepted' : 'rejected');
      setConnections(prev => prev.map(conn => 
        conn.id === connectionId ? { ...conn, status: action === 'accept' ? 'accepted' : 'rejected' } : conn
      ));
    } catch (e) {
      console.error('Failed to update connection:', e);
    }
  };

  const getConnectionsByStatus = (status: string) => {
    return connections.filter(conn => conn.status === status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <UserCheck className="w-4 h-4" />;
      case 'rejected': return <UserX className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <div className="text-gray-500 text-sm">{t.subtitle}</div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-blue-400" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-16">{error}</div>
        ) : (
          <Tabs defaultValue="suggestions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestions" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t.suggestions}
              </TabsTrigger>
              <TabsTrigger value="connections" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                {t.connections}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="suggestions" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.length === 0 ? (
                  <div className="col-span-full text-center text-gray-400 py-16">{t.noSuggestions}</div>
                ) : (
                  suggestions.map(suggestion => (
                    <Card key={suggestion.id} className="shadow-lg hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-teal-600 text-white">{suggestion.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold">{suggestion.name}</h3>
                            <p className="text-gray-600">{suggestion.profession}</p>
                            <p className="text-sm text-gray-500">
                              {suggestion.experience} • {suggestion.location}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{suggestion.company}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {suggestion.interests.map((interest: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                              <Users className="w-3 h-3" />
                              {suggestion.mutualConnections} ortak bağlantı
                            </div>
                            <p className="text-xs text-blue-600 mt-1">{suggestion.reason}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-teal-600 hover:bg-teal-700 flex-1" 
                            onClick={() => handleConnect(suggestion)}
                            disabled={connectingId === suggestion.id}
                          >
                            {connectingId === suggestion.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <UserPlus className="w-4 h-4" />
                            )}
                            {connectingId === suggestion.id ? t.loading : t.connect}
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="connections" className="mt-6">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-yellow-600">{t.pending}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{getConnectionsByStatus('pending').length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-green-600">{t.accepted}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{getConnectionsByStatus('accepted').length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-red-600">{t.rejected}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{getConnectionsByStatus('rejected').length}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  {connections.length === 0 ? (
                    <div className="text-center text-gray-400 py-16">{t.empty}</div>
                  ) : (
                    connections.map(connection => (
                      <Card key={connection.id} className="shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-teal-600 text-white">
                                  {connection.targetUserName?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">{connection.targetUserName}</h4>
                                <p className="text-sm text-gray-600">{connection.targetUserProfession}</p>
                                <p className="text-xs text-gray-500">{connection.targetUserCompany}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(connection.status)} flex items-center gap-1`}>
                                {getStatusIcon(connection.status)}
                                {t.status[connection.status as keyof typeof t.status]}
                              </Badge>
                              {connection.status === 'pending' && (
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" onClick={() => handleConnectionAction(connection.id, 'accept')}>
                                    {t.accept}
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleConnectionAction(connection.id, 'reject')}>
                                    {t.reject}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
} 