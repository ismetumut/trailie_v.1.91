"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Target, Presentation, FileText } from "lucide-react";

interface SimulationIntroProps {
  onStart: () => void;
  language?: "en" | "tr";
}

export default function SimulationIntro({ onStart, language }: SimulationIntroProps) {
  const [isStarting, setIsStarting] = useState(false);

  const content = {
    tr: {
      title: "Rol Simülasyonu",
      subtitle: "Pricing Specialist - Domino's Türkiye",
      welcome: "Domino's Türkiye'ye hoş geldiniz!",
      role: "Pricing Specialist olarak görev yapacaksınız",
      description: "Yeni ürün projesi DomiX için fiyatlandırma stratejisi geliştirecek ve pazarlama kampanyaları yöneteceksiniz.",
      tasks: [
        {
          title: "Fiyatlandırma Stratejisi",
          description: "Farklı fiyatlandırma stratejilerini karşılaştırın ve yeni ürün için en iyi fiyatı bulun",
          icon: Target
        },
        {
          title: "One-pager Güncelleme",
          description: "Bulgularınızı üst yönetime dağıtılacak bir özet halinde sunun",
          icon: FileText
        },
        {
          title: "Üst Yönetim Müzakeresi",
          description: "Fiyatlandırma stratejinizi CEO ve CFO ile tartışın, sorulara yanıt verin ve stratejinizi savunun.",
          icon: Presentation
        }
      ],
      startButton: "Simülasyona Başla"
    },
    en: {
      title: "Role Simulation",
      subtitle: "Pricing Specialist - Domino's Turkey",
      welcome: "Welcome to Domino's Turkey!",
      role: "You'll act as a Pricing Specialist",
      description: "You'll develop pricing strategies for the new DomiX product and manage marketing campaigns.",
      tasks: [
        {
          title: "Pricing Strategy",
          description: "Compare different pricing strategies and find the best price for the new product",
          icon: Target
        },
        {
          title: "One-pager Update",
          description: "Summarize your findings in a one-pager to be distributed to top management",
          icon: FileText
        },
        {
          title: "Executive Negotiation",
          description: "Discuss your pricing strategy with the CEO and CFO, answer their questions, and defend your approach.",
          icon: Presentation
        }
      ],
      startButton: "Start Simulation"
    }
  };

  const currentContent = content[language === "en" ? "en" : "tr"];

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      onStart();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-teal-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">
            <Briefcase className="w-4 h-4 mr-2" />
            {currentContent.subtitle}
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900">{currentContent.title}</h1>
          <p className="text-lg text-gray-600">{currentContent.welcome}</p>
        </div>

        {/* Role Card */}
        <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-teal-800">{currentContent.role}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{currentContent.description}</p>
          </CardContent>
        </Card>

        {/* Tasks */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            {language === "tr" ? "Görevleriniz" : "Your Tasks"}
          </h2>
          <div className="grid gap-4">
            {currentContent.tasks.map((task, index) => {
              const Icon = task.icon;
              return (
                <Card key={index} className="border-mint-200 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-teal-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {index + 1}. {task.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{task.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button
            onClick={handleStart}
            disabled={isStarting}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            {isStarting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{language === "tr" ? "Başlatılıyor..." : "Starting..."}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{currentContent.startButton}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 