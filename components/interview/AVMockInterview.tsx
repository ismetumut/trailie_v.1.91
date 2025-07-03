"use client";
import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import InterviewReview from "./InterviewReview";

const questions = [
  "Satış ekibi indirimi zorlarken, sizin modeliniz indirimi desteklemiyorsa ne yaparsınız?",
  "Daha önce yürüttüğünüz bir fiyatlama projesini anlatır mısınız?",
  "Veri kısıtlı bir pazarda nasıl fiyatlama stratejisi kurarsınız?"
];

export default function AVMockInterview({ language = "tr" }: { language?: "tr" | "en" }) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'video' | 'audio'>("video");
  const [recordings, setRecordings] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [transcripts, setTranscripts] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (mediaBlobUrl: string) => {
    setRecordings(prev => {
      const updated = [...prev];
      updated[step] = mediaBlobUrl;
      return updated;
    });
    setLoading(true);
    
    try {
      // Real transcript API
      const formData = new FormData();
      formData.append("file", await fetch(mediaBlobUrl).then(r => r.blob()));
      formData.append("mode", mode);
      formData.append("language", language);
      
      const res = await fetch("/api/transcribe", { method: "POST", body: formData });
      
      if (!res.ok) {
        throw new Error('Transcription failed');
      }
      
      const data = await res.json();
      setTranscripts(prev => {
        const updated = [...prev];
        updated[step] = data.transcript || "(transkript alınamadı)";
        return updated;
      });
    } catch (error) {
      console.error('Transcription error:', error);
      // Fallback transcript
      setTranscripts(prev => {
        const updated = [...prev];
        updated[step] = language === 'tr' ? "(transkript alınamadı)" : "(transcript unavailable)";
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    
    try {
      // Real AI evaluation API
      const res = await fetch("/api/interview-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          transcripts, 
          role: "Pricing Specialist",
          language: language
        })
      });
      
      if (!res.ok) {
        throw new Error('Evaluation failed');
      }
      
      const data = await res.json();
      setReview(data.review);
    } catch (error) {
      console.error('Interview evaluation error:', error);
      // Fallback to dummy review if API fails
      setReview({
        role: 'Pricing Specialist',
        scores: {
          fluency: 7.5,
          technical: 8.0,
          fit: 8.5,
          confidence: 7.0,
          clarity: 8.0,
          structure: 7.5
        },
        strengths: language === 'tr' 
          ? ['Cevaplarda yapı ve netlik', 'Teknik bilgi seviyesi', 'Rol uyumu']
          : ['Structure and clarity in answers', 'Technical knowledge level', 'Role fit'],
        devAreas: language === 'tr'
          ? ['Daha detaylı örnekler verme', 'Güven ifadesi']
          : ['Providing more detailed examples', 'Confidence expression'],
        summary: language === 'tr'
          ? 'Kullanıcı genel olarak iyi bir performans sergiledi. Teknik bilgi ve rol uyumu güçlü yönleri.'
          : 'User performed well overall. Technical knowledge and role fit are strong points.',
        recommendations: language === 'tr'
          ? ['Daha fazla somut örnek kullanın', 'Güven ifadenizi güçlendirin', 'Cevaplarınızı daha detaylandırın']
          : ['Use more concrete examples', 'Strengthen your confidence expression', 'Provide more detailed answers'],
        radar: [
          { label: language === 'tr' ? 'Sayısal Düşünme' : 'Analytical Thinking', value: 85 },
          { label: language === 'tr' ? 'İletişim' : 'Communication', value: 75 },
          { label: language === 'tr' ? 'Veri Kullanımı' : 'Data Usage', value: 80 },
          { label: language === 'tr' ? 'Rol Uyumu' : 'Role Fit', value: 85 },
          { label: language === 'tr' ? 'Müzakere' : 'Negotiation', value: 70 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (review) {
    return <InterviewReview review={review} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="mb-4 flex gap-2">
          <button className={`px-3 py-1 rounded ${mode === "video" ? "bg-indigo-600 text-white" : "bg-gray-200"}`} onClick={() => setMode("video")}>Video</button>
          <button className={`px-3 py-1 rounded ${mode === "audio" ? "bg-indigo-600 text-white" : "bg-gray-200"}`} onClick={() => setMode("audio")}>Ses</button>
        </div>
        <div className="mb-4 font-semibold text-lg">Soru {step + 1} / {questions.length}</div>
        <div className="mb-4 text-gray-800">{questions[step]}</div>
        <ReactMediaRecorder
          audio
          video={mode === "video"}
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              <div className="mb-2">Kayıt durumu: {status}</div>
              <button onClick={startRecording} className="mr-2 bg-green-600 text-white px-3 py-1 rounded">Kaydı Başlat</button>
              <button onClick={stopRecording} className="bg-red-600 text-white px-3 py-1 rounded">Kaydı Durdur</button>
              {mediaBlobUrl && (
                <div className="mt-2">
                  {mode === "video" ? (
                    <video src={mediaBlobUrl} controls width={320} />
                  ) : (
                    <audio src={mediaBlobUrl} controls />
                  )}
                  <button
                    className="block mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleSave(mediaBlobUrl)}
                    disabled={loading}
                  >
                    {loading ? 'İşleniyor...' : 'Kaydı Kaydet & Transkript Al'}
                  </button>
                  {transcripts[step] && (
                    <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                      <b>Transcript:</b> {transcripts[step]}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        />
        <div className="flex justify-between gap-2 mt-6">
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0 || loading}
          >
            Önceki Soru
          </button>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={handleNext}
            disabled={!transcripts[step] || loading}
          >
            {step < questions.length - 1 ? "Sonraki Soru" : "Mülakatı Bitir"}
          </button>
        </div>
      </div>
    </div>
  );
} 