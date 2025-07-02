"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const content = {
  tr: {
    title: "CV Verilerini İçe Aktar",
    subtitle: "LinkedIn profilinizden veya mevcut CV dosyanızdan verileri otomatik olarak çekin.",
    linkedinTitle: "LinkedIn'den İçe Aktar",
    linkedinDesc: "LinkedIn profil URL'nizi girin, verilerinizi otomatik olarak çekelim.",
    fileTitle: "Dosya Yükle",
    fileDesc: "Mevcut CV'nizi PDF, DOC veya DOCX formatında yükleyin.",
    urlPlaceholder: "LinkedIn profil URL'nizi girin...",
    filePlaceholder: "Dosya seçin veya sürükleyin",
    importBtn: "Verileri İçe Aktar",
    backBtn: "Geri Dön",
    processing: "Veriler işleniyor...",
    success: "Veriler başarıyla içe aktarıldı!",
    error: "Bir hata oluştu. Lütfen tekrar deneyin.",
    supportedFormats: "Desteklenen formatlar: PDF, DOC, DOCX",
    dragDrop: "Dosyayı buraya sürükleyin veya tıklayın",
    or: "veya"
  },
  en: {
    title: "Import CV Data",
    subtitle: "Automatically extract data from your LinkedIn profile or existing CV file.",
    linkedinTitle: "Import from LinkedIn",
    linkedinDesc: "Enter your LinkedIn profile URL, we'll automatically extract your data.",
    fileTitle: "Upload File",
    fileDesc: "Upload your existing CV in PDF, DOC or DOCX format.",
    urlPlaceholder: "Enter your LinkedIn profile URL...",
    filePlaceholder: "Select file or drag and drop",
    importBtn: "Import Data",
    backBtn: "Go Back",
    processing: "Processing data...",
    success: "Data imported successfully!",
    error: "An error occurred. Please try again.",
    supportedFormats: "Supported formats: PDF, DOC, DOCX",
    dragDrop: "Drag and drop file here or click",
    or: "or"
  }
};

export default function CVImport({ 
  language = "tr", 
  onBack, 
  onImportComplete 
}: { 
  language?: "tr" | "en"; 
  onBack: () => void;
  onImportComplete: (data: any) => void;
}) {
  const t = content[language];
  const [importMethod, setImportMethod] = useState<"linkedin" | "file" | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");

  const handleLinkedInImport = async () => {
    if (!linkedinUrl.trim()) return;
    
    setIsProcessing(true);
    setStatus("processing");
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      const mockData = {
        personalInfo: {
          name: "Umut Yılmaz",
          email: "umut@example.com",
          phone: "+90 555 123 4567",
          location: "İstanbul, Türkiye",
          linkedin: linkedinUrl
        },
        experience: [
          {
            title: "Product Manager",
            company: "TechCorp",
            duration: "2022 - Present",
            description: "Led product development for mobile applications"
          },
          {
            title: "Business Analyst",
            company: "DataSoft",
            duration: "2020 - 2022",
            description: "Analyzed business requirements and created solutions"
          }
        ],
        education: [
          {
            degree: "MBA",
            school: "İstanbul Üniversitesi",
            year: "2020"
          }
        ],
        skills: ["Product Management", "Data Analysis", "Agile", "SQL", "Figma"]
      };
      
      setStatus("success");
      setIsProcessing(false);
      
      setTimeout(() => {
        onImportComplete(mockData);
      }, 1500);
    }, 2000);
  };

  const handleFileImport = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setStatus("processing");
    
    // Simüle edilmiş dosya işleme
    setTimeout(() => {
      const mockData = {
        personalInfo: {
          name: "Umut Yılmaz",
          email: "umut@example.com",
          phone: "+90 555 123 4567",
          location: "İstanbul, Türkiye"
        },
        experience: [
          {
            title: "Senior Developer",
            company: "CodeCorp",
            duration: "2021 - Present",
            description: "Full-stack development with React and Node.js"
          }
        ],
        education: [
          {
            degree: "Computer Science",
            school: "Boğaziçi Üniversitesi",
            year: "2019"
          }
        ],
        skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"]
      };
      
      setStatus("success");
      setIsProcessing(false);
      
      setTimeout(() => {
        onImportComplete(mockData);
      }, 1500);
    }, 2000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes('pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="absolute top-4 left-4"
          >
            <img src="/arrow-left.svg" alt="Back" className="w-4 h-4 mr-2" />
            {t.backBtn}
          </Button>
          <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
          <div className="text-center text-gray-500 mb-2">{t.subtitle}</div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {!importMethod ? (
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-3 py-6 text-base font-semibold rounded-xl shadow transition-all duration-200 bg-white/80 text-blue-700 border-blue-200 hover:bg-blue-50 w-full max-w-full"
                onClick={() => setImportMethod("linkedin")}
              >
                <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6 shrink-0" />
                <div className="flex flex-col text-left min-w-0 w-full">
                  <div className="font-bold break-words whitespace-normal leading-tight">{t.linkedinTitle}</div>
                  <div className="text-xs text-gray-600 break-words whitespace-normal leading-tight">{t.linkedinDesc}</div>
                </div>
              </Button>
              <div className="text-center text-gray-400">- {t.or} -</div>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-3 py-6 text-base font-semibold rounded-xl shadow transition-all duration-200 bg-white/80 text-green-700 border-green-200 hover:bg-green-50 w-full max-w-full"
                onClick={() => setImportMethod("file")}
              >
                <img src="/upload.svg" alt="Upload" className="w-6 h-6 shrink-0" />
                <div className="flex flex-col text-left min-w-0 w-full">
                  <div className="font-bold break-words whitespace-normal leading-tight">{t.fileTitle}</div>
                  <div className="text-xs text-gray-600 break-words whitespace-normal leading-tight">{t.fileDesc}</div>
                </div>
              </Button>
            </div>
          ) : importMethod === "linkedin" ? (
            <div className="space-y-4">
              <div className="text-center">
                <img src="/linkedin.svg" alt="LinkedIn" className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">{t.linkedinTitle}</h3>
              </div>
              <Input
                type="url"
                placeholder={t.urlPlaceholder}
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="text-lg"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setImportMethod(null)}
                  className="flex-1"
                >
                  {t.backBtn}
                </Button>
                <Button
                  onClick={handleLinkedInImport}
                  disabled={!linkedinUrl.trim() || isProcessing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? t.processing : t.importBtn}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <img src="/upload.svg" alt="Upload" className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold">{t.fileTitle}</h3>
                <p className="text-sm text-gray-600">{t.supportedFormats}</p>
              </div>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <img src="/file-text.svg" alt="File" className="w-6 h-6 text-green-600" />
                    <span className="font-medium">{selectedFile.name}</span>
                  </div>
                ) : (
                  <div>
                    <img src="/upload.svg" alt="Upload" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">{t.dragDrop}</p>
                  </div>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setImportMethod(null)}
                  className="flex-1"
                >
                  {t.backBtn}
                </Button>
                <Button
                  onClick={handleFileImport}
                  disabled={!selectedFile || isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? t.processing : t.importBtn}
                </Button>
              </div>
            </div>
          )}

          {status === "processing" && (
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              {t.processing}
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <img src="/check-circle.svg" alt="Success" className="w-5 h-5" />
              {t.success}
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center justify-center gap-2 text-red-600">
              <img src="/alert-circle.svg" alt="Error" className="w-5 h-5" />
              {t.error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 