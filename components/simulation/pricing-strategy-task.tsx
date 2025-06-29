"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  BarChart3
} from "lucide-react";

interface PricingStrategyTaskProps {
  onComplete: (result: any) => void;
  language?: "en" | "tr";
}

export default function PricingStrategyTask({ onComplete, language = "tr" }: PricingStrategyTaskProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    tr: {
      title: "Görev 1: Fiyatlandırma Stratejisi",
      subtitle: "DomiX için en uygun fiyatlandırma stratejisini belirleyin",
      description: "Aşağıdaki verileri inceleyerek yeni ürün için en iyi fiyatlandırma stratejisini seçin.",
      marketData: {
        title: "Pazar Verileri",
        items: [
          "Rakip pizza zincirleri ortalama fiyat: 45-65 TL",
          "Premium segment ortalama fiyat: 70-90 TL",
          "Hedef müşteri segmenti: 25-40 yaş, orta-üst gelir",
          "Tahmini üretim maliyeti: 25 TL",
          "Pazar payı hedefi: %15 (ilk yıl)"
        ]
      },
      strategies: [
        {
          id: "premium",
          name: "Premium Fiyatlandırma",
          description: "Yüksek kalite algısı için üst segment fiyatlandırması",
          price: "75-85 TL",
          pros: ["Yüksek kar marjı", "Premium marka algısı"],
          cons: ["Düşük satış hacmi riski", "Rekabet zorluğu"]
        },
        {
          id: "penetration",
          name: "Penetrasyon Fiyatlandırması",
          description: "Pazar payı kazanmak için düşük fiyat stratejisi",
          price: "35-45 TL",
          pros: ["Hızlı pazar penetrasyonu", "Yüksek satış hacmi"],
          cons: ["Düşük kar marjı", "Kalite algısı riski"]
        },
        {
          id: "competitive",
          name: "Rekabetçi Fiyatlandırma",
          description: "Rakip fiyatlarına yakın, dengeli strateji",
          price: "50-60 TL",
          pros: ["Güvenli pazar pozisyonu", "Dengeli kar marjı"],
          cons: ["Farklılaşma zorluğu", "Orta seviye büyüme"]
        }
      ],
      customPriceLabel: "Özel Fiyat Öneriniz (TL):",
      submitButton: "Analizi Tamamla",
      nextButton: "Devam Et",
      result: {
        title: "Analiz Sonucu",
        recommendation: "Önerilen Strateji: Rekabetçi Fiyatlandırma (55 TL)",
        reasoning: "Bu strateji, pazar payı kazanma ve kar marjı arasında optimal dengeyi sağlar.",
        nextTask: "Bir sonraki görev: One-pager hazırlama"
      }
    },
    en: {
      title: "Task 1: Pricing Strategy",
      subtitle: "Determine the optimal pricing strategy for DomiX",
      description: "Analyze the data below to select the best pricing strategy for the new product.",
      marketData: {
        title: "Market Data",
        items: [
          "Competitor pizza chains average price: 45-65 TL",
          "Premium segment average price: 70-90 TL",
          "Target customer segment: 25-40 age, middle-upper income",
          "Estimated production cost: 25 TL",
          "Market share target: 15% (first year)"
        ]
      },
      strategies: [
        {
          id: "premium",
          name: "Premium Pricing",
          description: "High-end pricing for quality perception",
          price: "75-85 TL",
          pros: ["High profit margin", "Premium brand perception"],
          cons: ["Low volume risk", "Competition difficulty"]
        },
        {
          id: "penetration",
          name: "Penetration Pricing",
          description: "Low price strategy to gain market share",
          price: "35-45 TL",
          pros: ["Fast market penetration", "High sales volume"],
          cons: ["Low profit margin", "Quality perception risk"]
        },
        {
          id: "competitive",
          name: "Competitive Pricing",
          description: "Balanced strategy close to competitor prices",
          price: "50-60 TL",
          pros: ["Safe market position", "Balanced profit margin"],
          cons: ["Differentiation difficulty", "Moderate growth"]
        }
      ],
      customPriceLabel: "Your Custom Price Suggestion (TL):",
      submitButton: "Complete Analysis",
      nextButton: "Continue",
      result: {
        title: "Analysis Result",
        recommendation: "Recommended Strategy: Competitive Pricing (55 TL)",
        reasoning: "This strategy provides optimal balance between market share gain and profit margin.",
        nextTask: "Next task: One-pager preparation"
      }
    }
  };

  const currentContent = content[language];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setShowResult(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleContinue = () => {
    onComplete({
      strategy: selectedStrategy,
      customPrice: customPrice,
      recommendedPrice: "55 TL"
    });
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-teal-50 p-4">
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
                  <Target className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">{currentContent.result.recommendation}</h3>
                </div>
                <p className="text-gray-700">{currentContent.result.reasoning}</p>
                <div className="bg-mint-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">{currentContent.result.nextTask}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={handleContinue}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">
            <Target className="w-4 h-4 mr-2" />
            {currentContent.title}
          </Badge>
          <h1 className="text-2xl font-bold text-gray-900">{currentContent.subtitle}</h1>
          <p className="text-gray-600">{currentContent.description}</p>
        </div>

        {/* Market Data */}
        <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-teal-800 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>{currentContent.marketData.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentContent.marketData.items.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Pricing Strategies */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            {language === "tr" ? "Fiyatlandırma Stratejileri" : "Pricing Strategies"}
          </h2>
          <RadioGroup value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <div className="grid gap-4">
              {currentContent.strategies.map((strategy) => (
                <Card key={strategy.id} className="border-mint-200 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={strategy.id} id={strategy.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor={strategy.id} className="text-lg font-semibold text-gray-900 cursor-pointer">
                            {strategy.name}
                          </Label>
                          <Badge variant="outline" className="bg-mint-50 text-teal-700">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {strategy.price}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{strategy.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-green-700 mb-1">
                              {language === "tr" ? "Avantajlar" : "Pros"}
                            </h4>
                            <ul className="space-y-1">
                              {strategy.pros.map((pro, index) => (
                                <li key={index} className="text-xs text-green-600 flex items-center space-x-1">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-red-700 mb-1">
                              {language === "tr" ? "Dezavantajlar" : "Cons"}
                            </h4>
                            <ul className="space-y-1">
                              {strategy.cons.map((con, index) => (
                                <li key={index} className="text-xs text-red-600 flex items-center space-x-1">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Custom Price Input */}
        <Card className="border-mint-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <Label htmlFor="custom-price" className="text-sm font-medium text-gray-700">
              {currentContent.customPriceLabel}
            </Label>
            <Input
              id="custom-price"
              type="number"
              placeholder="55"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              className="mt-2"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <Button
            onClick={handleSubmit}
            disabled={!selectedStrategy || isSubmitting}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{language === "tr" ? "Analiz ediliyor..." : "Analyzing..."}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>{currentContent.submitButton}</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 