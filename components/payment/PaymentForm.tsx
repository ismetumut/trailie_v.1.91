"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CreditCard, Lock, CheckCircle, XCircle } from "lucide-react";

const content = {
  tr: {
    title: "Güvenli Ödeme",
    subtitle: "Kart bilgilerinizi güvenle girin",
    cardNumber: "Kart Numarası",
    cardHolder: "Kart Sahibi",
    expiry: "Son Kullanma Tarihi",
    cvv: "Güvenlik Kodu",
    address: "Fatura Adresi",
    city: "Şehir",
    zipCode: "Posta Kodu",
    country: "Ülke",
    payButton: "Ödemeyi Tamamla",
    processing: "İşleniyor...",
    success: "Ödeme Başarılı!",
    successDesc: "Paketiniz aktif edildi. Tüm modüllere erişebilirsiniz.",
    error: "Ödeme Başarısız",
    errorDesc: "Kart bilgilerinizi kontrol edip tekrar deneyin.",
    secure: "256-bit SSL ile korunmaktadır",
    total: "Toplam Tutar"
  },
  en: {
    title: "Secure Payment",
    subtitle: "Enter your card details securely",
    cardNumber: "Card Number",
    cardHolder: "Card Holder",
    expiry: "Expiry Date",
    cvv: "Security Code",
    address: "Billing Address",
    city: "City",
    zipCode: "ZIP Code",
    country: "Country",
    payButton: "Complete Payment",
    processing: "Processing...",
    success: "Payment Successful!",
    successDesc: "Your package has been activated. You can access all modules.",
    error: "Payment Failed",
    errorDesc: "Please check your card details and try again.",
    secure: "Protected by 256-bit SSL",
    total: "Total Amount"
  }
};

interface PaymentFormProps {
  amount: string;
  packageName: string;
  language?: "tr" | "en";
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PaymentForm({ 
  amount, 
  packageName, 
  language = "tr",
  onSuccess,
  onCancel 
}: PaymentFormProps) {
  const t = content[language];
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
    address: "",
    city: "",
    zipCode: "",
    country: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsError(false);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simulate 90% success rate
    const isPaymentSuccessful = Math.random() > 0.1;
    
    if (isPaymentSuccessful) {
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } else {
      setIsError(true);
    }
    
    setIsProcessing(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">{t.success}</h2>
            <p className="text-gray-600 mb-6">{t.successDesc}</p>
            <Button onClick={onSuccess} className="w-full">
              {language === "tr" ? "Devam Et" : "Continue"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CreditCard className="w-6 h-6" />
            {t.title}
          </CardTitle>
          <p className="text-sm text-gray-500">{t.subtitle}</p>
        </CardHeader>
        <CardContent>
          {isError && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {t.errorDesc}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">{t.cardNumber}</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  maxLength={19}
                  disabled={isProcessing}
                />
              </div>

              <div>
                <Label htmlFor="cardHolder">{t.cardHolder}</Label>
                <Input
                  id="cardHolder"
                  type="text"
                  placeholder="John Doe"
                  value={formData.cardHolder}
                  onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                  disabled={isProcessing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">{t.expiry}</Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={(e) => handleInputChange('expiry', formatExpiry(e.target.value))}
                    maxLength={5}
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">{t.cvv}</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    maxLength={4}
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">{t.address}</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={isProcessing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">{t.city}</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Istanbul"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">{t.zipCode}</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="34000"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country">{t.country}</Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="Turkey"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{packageName}</span>
              <span className="font-bold text-lg">{amount}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                {t.secure}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isProcessing}
              onClick={handleSubmit}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.processing}
                </>
              ) : (
                t.payButton
              )}
            </Button>
            
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={onCancel}
                disabled={isProcessing}
              >
                {language === "tr" ? "İptal" : "Cancel"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 