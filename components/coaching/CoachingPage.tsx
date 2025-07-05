"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  saveCoachingSession, 
  getUserCoachingSessions, 
  updateCoachingSession,
  saveCoachingNote,
  getCoachingNotes
} from "@/lib/firebase";

const content = {
  tr: {
    title: "Koçluk",
    subtitle: "Uzman koçlarla kariyer yolculuğunuzu hızlandırın",
    sessions: "Seanslarım",
    book: "Seans Rezerve Et",
    topics: "Koçluk Konuları",
    coaches: "Uzman Koçlarımız",
    remaining: "Kalan Seans",
    bookSession: "Koçluk Seansı Rezerve Et",
    sessionTitle: "Seans Başlığı",
    sessionDate: "Seans Tarihi",
    sessionTime: "Seans Saati",
    sessionTopic: "Konu",
    sessionNotes: "Notlar",
    save: "Kaydet",
    cancel: "İptal",
    completed: "Tamamlandı",
    cancelled: "İptal Edildi",
    scheduled: "Planlandı",
    loading: "Yükleniyor...",
    error: "Yüklenemedi.",
    empty: "Henüz seans yok.",
    addNote: "Not Ekle",
    notes: "Notlar",
    noNotes: "Henüz not yok."
  },
  en: {
    title: "Coaching",
    subtitle: "Accelerate your career journey with expert coaches",
    sessions: "My Sessions",
    book: "Book Session",
    topics: "Coaching Topics",
    coaches: "Our Expert Coaches",
    remaining: "Remaining Sessions",
    bookSession: "Book Coaching Session",
    sessionTitle: "Session Title",
    sessionDate: "Session Date",
    sessionTime: "Session Time",
    sessionTopic: "Topic",
    sessionNotes: "Notes",
    save: "Save",
    cancel: "Cancel",
    completed: "Completed",
    cancelled: "Cancelled",
    scheduled: "Scheduled",
    loading: "Loading...",
    error: "Failed to load.",
    empty: "No sessions yet.",
    addNote: "Add Note",
    notes: "Notes",
    noNotes: "No notes yet."
  }
};

// Örnek koçlar
const coaches = [
  {
    id: 1,
    name: "Dr. Ayşe Demir",
    title: "Kariyer Koçu",
    experience: "15+ yıl deneyim",
    specialty: "Teknoloji",
    avatar: "AD",
    rating: 4.9,
    sessions: 150
  },
  {
    id: 2,
    name: "Mehmet Özkan",
    title: "İK Uzmanı",
    experience: "12+ yıl deneyim",
    specialty: "Finans",
    avatar: "MÖ",
    rating: 4.8,
    sessions: 120
  },
  {
    id: 3,
    name: "Zeynep Kaya",
    title: "Liderlik Koçu",
    experience: "10+ yıl deneyim",
    specialty: "Pazarlama",
    avatar: "ZK",
    rating: 4.9,
    sessions: 95
  }
];

// Koçluk konuları
const topics = [
  "Kariyer hedefleri belirleme",
  "CV ve LinkedIn profili optimizasyonu",
  "Mülakat teknikleri",
  "Maaş müzakeresi stratejileri",
  "Kişisel marka oluşturma",
  "İş-yaşam dengesi",
  "Liderlik becerileri",
  "Networking stratejileri"
];

const DUMMY_COACHING = [
  {
    id: '1',
    coach: 'Dr. Zeynep Aksoy',
    specialty: 'Kariyer Koçluğu',
    company: 'Koçluk Merkezi',
    location: 'İstanbul',
    experience: '10 yıl',
    image: '',
    note: 'Kariyer hedeflerinize ulaşmanız için birlikte çalışabiliriz.'
  },
  {
    id: '2',
    coach: 'Ahmet Korkmaz',
    specialty: 'Liderlik',
    company: 'Liderlik Akademisi',
    location: 'Ankara',
    experience: '8 yıl',
    image: '',
    note: 'Liderlik becerilerinizi geliştirmek için destek olabilirim.'
  },
  {
    id: '3',
    coach: 'Selin Yıldız',
    specialty: 'İletişim',
    company: 'İletişim Atölyesi',
    location: 'İzmir',
    experience: '6 yıl',
    image: '',
    note: 'Etkili iletişim ve özgüven için koçluk sunuyorum.'
  },
];

export default function CoachingPage({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [sessionNotes, setSessionNotes] = useState<any[]>([]);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    topic: "",
    coachId: 1
  });
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function fetchCoaching() {
      setLoading(true);
      setError(null);
      try {
        // Firestore'dan veri çek
        const data = await getUserCoachingSessions(user?.uid);
        if (!cancelled) {
          if (!data || data.length === 0) {
            setSessions(DUMMY_COACHING);
          } else {
            setSessions(data);
          }
        }
      } catch (e) {
        if (!cancelled) {
          console.warn('Firestore error, using dummy data:', e);
          setSessions(DUMMY_COACHING);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchCoaching();
    return () => { cancelled = true; };
  }, [user]);

  const handleBookSession = async () => {
    if (!user) return;
    try {
      const coach = coaches.find(c => c.id === newSession.coachId);
      await saveCoachingSession(user.uid, {
        ...newSession,
        coachName: coach?.name,
        coachTitle: coach?.title,
        status: 'scheduled'
      });
      
      setSessions(prev => [...prev, {
        id: Date.now().toString(),
        ...newSession,
        coachName: coach?.name,
        coachTitle: coach?.title,
        status: 'scheduled',
        createdAt: new Date()
      }]);
      
      setNewSession({ title: "", date: "", time: "", topic: "", coachId: 1 });
      setBookDialogOpen(false);
    } catch (e) {
      console.error('Failed to book session:', e);
    }
  };

  const handleUpdateSessionStatus = async (sessionId: string, status: string) => {
    if (!user) return;
    try {
      await updateCoachingSession(user.uid, sessionId, { status });
      setSessions(prev => prev.map(session => 
        session.id === sessionId ? { ...session, status } : session
      ));
    } catch (e) {
      console.error('Failed to update session:', e);
    }
  };

  const handleAddNote = async () => {
    if (!user || !selectedSession || !newNote.trim()) return;
    try {
      await saveCoachingNote(user.uid, selectedSession.id, {
        content: newNote,
        author: user.displayName || user.email
      });
      
      setSessionNotes(prev => [...prev, {
        id: Date.now().toString(),
        content: newNote,
        author: user.displayName || user.email,
        createdAt: new Date()
      }]);
      
      setNewNote("");
    } catch (e) {
      console.error('Failed to add note:', e);
    }
  };

  const handleViewNotes = async (session: any) => {
    setSelectedSession(session);
    setNoteDialogOpen(true);
    if (user) {
      try {
        const notes = await getCoachingNotes(user.uid, session.id);
        setSessionNotes(notes);
      } catch (e) {
        console.error('Failed to load notes:', e);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionsByStatus = (status: string) => {
    return sessions.filter(session => session.status === status);
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
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Sol Panel - Seanslar */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="sessions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sessions" className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    {t.sessions}
                  </TabsTrigger>
                  <TabsTrigger value="book" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {t.book}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="sessions" className="mt-6">
                  <div className="space-y-4">
                    {sessions.length === 0 ? (
                      <div className="text-center text-gray-400 py-16">{t.empty}</div>
                    ) : (
                      sessions.map(session => (
                        <Card key={session.id} className="shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold">{session.title}</h4>
                                <p className="text-sm text-gray-600">{session.topic}</p>
                                <p className="text-xs text-gray-500">
                                  {session.date} • {session.time} • {session.coachName}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={`${getStatusColor(session.status)} flex items-center gap-1`}>
                                  {getStatusIcon(session.status)}
                                  {t[session.status as keyof typeof t]}
                                </Badge>
                                <Button size="sm" variant="outline" onClick={() => handleViewNotes(session)}>
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                                {session.status === 'scheduled' && (
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline" onClick={() => handleUpdateSessionStatus(session.id, 'completed')}>
                                      {t.completed}
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleUpdateSessionStatus(session.id, 'cancelled')}>
                                      {t.cancelled}
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
                </TabsContent>
                
                <TabsContent value="book" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.bookSession}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>{t.sessionTitle}</Label>
                          <Input 
                            value={newSession.title}
                            onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Seans başlığı"
                          />
                        </div>
                        <div>
                          <Label>{t.sessionTopic}</Label>
                          <select 
                            className="w-full p-2 border rounded-md"
                            value={newSession.topic}
                            onChange={(e) => setNewSession(prev => ({ ...prev, topic: e.target.value }))}
                          >
                            <option value="">Konu seçin</option>
                            {topics.map((topic, index) => (
                              <option key={index} value={topic}>{topic}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label>{t.sessionDate}</Label>
                          <Input 
                            type="date"
                            value={newSession.date}
                            onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>{t.sessionTime}</Label>
                          <Input 
                            type="time"
                            value={newSession.time}
                            onChange={(e) => setNewSession(prev => ({ ...prev, time: e.target.value }))}
                          />
                        </div>
                      </div>
                      <Button onClick={handleBookSession} className="w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        {t.save}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sağ Panel - Koçlar ve Konular */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-amber-600" />
                    <span>{t.coaches}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {coaches.map(coach => (
                    <div key={coach.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-amber-600 text-white">{coach.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{coach.name}</h4>
                        <p className="text-xs text-gray-600">{coach.title}</p>
                        <p className="text-xs text-gray-500">{coach.experience}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {coach.specialty}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.topics}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Notlar Dialog */}
      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.notes} - {selectedSession?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              {sessionNotes.length === 0 ? (
                <div className="text-center text-gray-400 py-8">{t.noNotes}</div>
              ) : (
                sessionNotes.map(note => (
                  <div key={note.id} className="p-3 border rounded-lg">
                    <p className="text-sm">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {note.author} • {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="space-y-2">
              <Label>{t.addNote}</Label>
              <Textarea 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Notunuzu yazın..."
                rows={3}
              />
              <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                {t.addNote}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 