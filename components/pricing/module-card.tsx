"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Lock, Star } from "lucide-react"

interface ModuleCardProps {
  title: string;
  features: string[];
  price: string;
  isBest?: boolean;
  locked?: boolean;
  onSelect: () => void;
  language?: "tr" | "en";
}

export default function ModuleCard({
  title,
  features,
  price,
  isBest = false,
  locked = false,
  onSelect,
  language = "tr"
}: ModuleCardProps) {
  return (
    <Card className={`relative ${isBest ? 'ring-2 ring-blue-500 shadow-lg' : ''} hover:shadow-md transition-all duration-200`}>
      {isBest && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white px-3 py-1 flex items-center gap-1">
            <Star className="w-3 h-3" />
            {language === "tr" ? "En Popüler" : "Most Popular"}
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="text-3xl font-bold text-blue-600">{price}</div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onSelect}
          className={`w-full ${isBest ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}`}
          size="lg"
        >
          {locked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              {language === "tr" ? "Kilidi Aç" : "Unlock"}
            </>
          ) : (
            language === "tr" ? "Satın Al" : "Purchase"
          )}
          </Button>
      </CardContent>
    </Card>
  )
}
