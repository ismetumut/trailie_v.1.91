"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Presentation, 
  CheckCircle, 
  ArrowRight,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  MessageSquare,
  AlertTriangle
} from "lucide-react";

interface PresentationTaskProps {
  onComplete: (result: any) => void;
  language?: "en" | "tr";
}

export default function PresentationTask({ onComplete, language = "tr" }: PresentationTaskProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    tr: {
      title: "Görev 3: Üst Yönetim Müzakeresi",
      subtitle: "Fiyatlandırma stratejinizi savunun",
      description: "CEO ve CFO ile fiyatlandırma stratejinizi tartışın. Hazırladığınız one-pager'ı kullanarak argümanlarınızı sunun.",
      steps: [
        {
          title: "Sunum Açılışı",
          description: "DomiX ürününün pazar potansiyelini ve fiyatlandırma yaklaşımınızı özetleyin.",
          challenge: "CEO: 'Bu fiyatlandırma stratejisi çok agresif görünüyor. Rakip ürünlerden %20 daha yüksek fiyat nasıl haklı çıkarılabilir?'",
          placeholder: "CEO'nun endişesine yanıtınızı yazın...",
          tips: [
            "Veri odaklı argümanlar kullanın",
            "Rekabet avantajlarını vurgulayın",
            "Hedef müşteri segmentini belirtin",
            "Kar marjı hedeflerini açıklayın"
          ]
        },
        {
          title: "Finansal Analiz",
          description: "CFO'nun maliyet ve kar hedefleriyle ilgili sorularını yanıtlayın.",
          challenge: "CFO: 'Bu fiyatlandırma ile %35 kar marjı hedefliyoruz. Satış hacmi beklentileriniz gerçekçi mi?'",
          placeholder: "CFO'nun finansal endişelerine yanıtınızı yazın...",
          tips: [
            "Pazar büyüklüğü verilerini kullanın",
            "Satış tahminlerinizi destekleyin",
            "Maliyet yapısını açıklayın",
            "Risk faktörlerini belirtin"
          ]
        },
        {
          title: "Risk Değerlendirmesi",
          description: "Potansiyel riskleri ve bunlarla nasıl başa çıkılacağını açıklayın.",
          challenge: "CEO: 'Rakipler fiyat savaşı başlatırsa ne yapacağız? Bu strateji sürdürülebilir mi?'",
          placeholder: "Risk yönetimi stratejinizi açıklayın...",
          tips: [
            "Farklılaştırma stratejilerini vurgulayın",
            "Müşteri sadakati programları önerin",
            "Esnek fiyatlandırma modelleri sunun",
            "Uzun vadeli stratejiyi açıklayın"
          ]
        }
      ],
      submitButton: "Yanıtı Gönder",
      nextButton: "Devam Et",
      result: {
        title: "Müzakeresi Tamamlandı",
        message: "Üst yönetimle başarılı bir müzakeresi gerçekleştirdiniz. Fiyatlandırma stratejiniz onaylandı.",
        nextTask: "Simülasyon tamamlandı - Dashboard'a dön"
      }
    },
    en: {
      title: "Task 3: Executive Negotiation",
      subtitle: "Defend your pricing strategy",
      description: "Discuss your pricing strategy with the CEO and CFO. Use your prepared one-pager to present your arguments.",
      steps: [
        {
          title: "Presentation Opening",
          description: "Summarize DomiX product's market potential and your pricing approach.",
          challenge: "CEO: 'This pricing strategy seems too aggressive. How can a 20% higher price than competitors be justified?'",
          placeholder: "Write your response to the CEO's concern...",
          tips: [
            "Use data-driven arguments",
            "Highlight competitive advantages",
            "Specify target customer segment",
            "Explain profit margin targets"
          ]
        },
        {
          title: "Financial Analysis",
          description: "Answer CFO's questions about costs and profit targets.",
          challenge: "CFO: 'With this pricing, we're targeting 35% profit margin. Are your sales volume expectations realistic?'",
          placeholder: "Write your response to the CFO's financial concerns...",
          tips: [
            "Use market size data",
            "Support your sales projections",
            "Explain cost structure",
            "Address risk factors"
          ]
        },
        {
          title: "Risk Assessment",
          description: "Explain potential risks and how to address them.",
          challenge: "CEO: 'What if competitors start a price war? Is this strategy sustainable?'",
          placeholder: "Explain your risk management strategy...",
          tips: [
            "Emphasize differentiation strategies",
            "Suggest customer loyalty programs",
            "Offer flexible pricing models",
            "Explain long-term strategy"
          ]
        }
      ],
      submitButton: "Submit Response",
      nextButton: "Continue",
      result: {
        title: "Negotiation Completed",
        message: "You successfully negotiated with top management. Your pricing strategy has been approved.",
        nextTask: "Simulation completed - Return to Dashboard"
      }
    }
  };

  const currentContent = content[language];
  const currentStepData = currentContent.steps[currentStep];

  const handleSubmit = () => {
    if (!responses[currentStep]?.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      if (currentStep < currentContent.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResult(true);
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const handleContinue = () => {
    onComplete({
      responses: responses,
      stepCount: currentContent.steps.length,
      completed: true
    });
  };

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses];
    newResponses[currentStep] = value;
    setResponses(newResponses);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-2" />
              {language === "tr" ? "Tamamlandı" : "Completed"}
            </Badge>
            <h1 className="text-2xl font-bold text-gray-900">{currentContent.result.title}</h1>
          </div>

          <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Presentation className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">{currentContent.result.message}</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">{currentContent.result.nextTask}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={handleContinue}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              {currentContent.nextButton}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
            <Presentation className="w-4 h-4 mr-2" />
            {currentContent.title}
          </Badge>
          <h1 className="text-2xl font-bold text-gray-900">{currentContent.subtitle}</h1>
          <p className="text-gray-600">{currentContent.description}</p>
          
          {/* Progress */}
          <div className="flex justify-center space-x-2 mt-4">
            {currentContent.steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Step */}
        <Card className="border-indigo-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-indigo-800 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>{currentStepData.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{currentStepData.description}</p>
            
            {/* Challenge */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">
                    {language === "tr" ? "Zorluk:" : "Challenge:"}
                  </h4>
                  <p className="text-red-700 text-sm">{currentStepData.challenge}</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                {language === "tr" ? "💡 İpuçları:" : "💡 Tips:"}
              </h4>
              <ul className="space-y-1">
                {currentStepData.tips.map((tip, index) => (
                  <li key={index} className="text-blue-700 text-sm flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response Input */}
            <div className="space-y-2">
              <Label htmlFor="response" className="text-gray-700 font-medium">
                {language === "tr" ? "Yanıtınız:" : "Your Response:"}
              </Label>
              <Textarea
                id="response"
                placeholder={currentStepData.placeholder}
                value={responses[currentStep] || ""}
                onChange={(e) => handleResponseChange(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!responses[currentStep]?.trim() || isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{language === "tr" ? "Gönderiliyor..." : "Submitting..."}</span>
              </div>
            ) : (
              <>
                <ArrowRight className="w-5 h-5 mr-2" />
                {currentContent.submitButton}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 
