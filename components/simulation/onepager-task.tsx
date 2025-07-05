"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Edit3,
  Target,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";

interface OnepagerTaskProps {
  onComplete: (result: any) => void;
  pricingResult?: any;
  language?: "en" | "tr";
}

export default function OnepagerTask({ onComplete, pricingResult, language = "tr" }: OnepagerTaskProps) {
  const [summary, setSummary] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    tr: {
      title: "Görev 2: One-pager Güncelleme",
      subtitle: "Bulgularınızı üst yönetime sunun",
      description: "Fiyatlandırma analizinizin sonuçlarını kısa ve öz bir şekilde özetleyin. Bu belge üst yönetime dağıtılacak.",
      guidelines: {
        title: "Yazım Kuralları",
        items: [
          "Maksimum 300 kelime",
          "Net ve anlaşılır dil kullanın",
          "Ana bulguları vurgulayın",
          "Önerilerinizi belirtin",
          "Sonraki adımları özetleyin"
        ]
      },
      template: {
        title: "One-pager Şablonu",
        sections: [
          "Ürün Özeti: DomiX'in temel özellikleri ve hedef pazar",
          "Pazar Analizi: Rekabet durumu ve fırsatlar",
          "Fiyatlandırma Stratejisi: Seçilen yaklaşım ve gerekçesi",
          "Beklenen Sonuçlar: Satış hedefleri ve kar marjı",
          "Risk Faktörleri: Dikkat edilmesi gereken noktalar",
          "Sonraki Adımlar: Uygulama planı"
        ]
      },
      placeholder: "One-pager içeriğinizi buraya yazın...",
      submitButton: "One-pager'ı Tamamla",
      nextButton: "Devam Et",
      result: {
        title: "One-pager Tamamlandı",
        message: "Bulgularınız başarıyla özetlendi ve üst yönetime hazırlandı.",
        nextTask: "Son görev: Üst yönetim müzakeresi"
      }
    },
    en: {
      title: "Task 2: One-pager Update",
      subtitle: "Present your findings to top management",
      description: "Summarize your pricing analysis results concisely. This document will be distributed to top management.",
      guidelines: {
        title: "Writing Guidelines",
        items: [
          "Maximum 300 words",
          "Use clear and understandable language",
          "Highlight key findings",
          "State your recommendations",
          "Summarize next steps"
        ]
      },
      template: {
        title: "One-pager Template",
        sections: [
          "Product Summary: DomiX's key features and target market",
          "Market Analysis: Competitive situation and opportunities",
          "Pricing Strategy: Chosen approach and rationale",
          "Expected Results: Sales targets and profit margin",
          "Risk Factors: Points to consider",
          "Next Steps: Implementation plan"
        ]
      },
      placeholder: "Write your one-pager content here...",
      submitButton: "Complete One-pager",
      nextButton: "Continue",
      result: {
        title: "One-pager Completed",
        message: "Your findings have been successfully summarized and prepared for top management.",
        nextTask: "Final task: Executive negotiation"
      }
    }
  };

  const currentContent = content[language];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete({
        summary: summary,
        wordCount: summary.split(/\s+/).length
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const wordCount = summary.split(/\s+/).filter(word => word.length > 0).length;
  const isOverLimit = wordCount > 300;

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">
            <FileText className="w-4 h-4 mr-2" />
            {currentContent.title}
          </Badge>
          <h1 className="text-2xl font-bold text-gray-900">{currentContent.subtitle}</h1>
          <p className="text-gray-600">{currentContent.description}</p>
        </div>

        {/* Guidelines */}
        <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-teal-800 flex items-center space-x-2">
              <Edit3 className="w-5 h-5" />
              <span>{currentContent.guidelines.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentContent.guidelines.items.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Template */}
        <Card className="border-mint-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-mint-800">{currentContent.template.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {currentContent.template.sections.map((section, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-mint-50 rounded-lg">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-teal-700">{index + 1}</span>
                  </div>
                  <span className="text-sm text-gray-700">{section}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Summary (if available) */}
        {pricingResult && (
          <Card className="border-blue-200 bg-blue-50/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>{language === "tr" ? "Fiyatlandırma Analizi Özeti" : "Pricing Analysis Summary"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    {language === "tr" ? "Strateji" : "Strategy"}: {pricingResult.strategy}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    {language === "tr" ? "Önerilen Fiyat" : "Recommended Price"}: {pricingResult.recommendedPrice}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    {language === "tr" ? "Hedef Segment" : "Target Segment"}: 25-40 yaş
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* One-pager Editor */}
        <Card className="border-mint-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-mint-800">{language === "tr" ? "One-pager İçeriği" : "One-pager Content"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="summary" className="text-sm font-medium text-gray-700">
                {language === "tr" ? "Özet Metni" : "Summary Text"}
              </Label>
              <Textarea
                id="summary"
                placeholder={currentContent.placeholder}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="mt-2 min-h-[200px] resize-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {language === "tr" ? "Kelime Sayısı" : "Word Count"}: {wordCount}/300
              </div>
              {isOverLimit && (
                <div className="text-sm text-red-600">
                  {language === "tr" ? "Kelime limitini aştınız!" : "Word limit exceeded!"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <Button
            onClick={handleSubmit}
            disabled={!summary.trim() || isOverLimit || isSubmitting}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{language === "tr" ? "Hazırlanıyor..." : "Preparing..."}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{currentContent.submitButton}</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 
