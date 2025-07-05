"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  Check, 
  Star, 
  Zap, 
  Users, 
  Briefcase, 
  FileText, 
  MessageCircle,
  CreditCard,
  Calendar,
  TrendingUp,
  Loader2,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getUserSubscription, 
  saveUserSubscription,
  getUserPayments,
  savePayment,
  updatePaymentStatus
} from "@/lib/firebase";

const content = {
  tr: {
    title: "Premium Paketler",
    subtitle: "Kariyer yolculuğunuzu hızlandırın",
    currentPlan: "Mevcut Plan",
    upgrade: "Yükselt",
    downgrade: "Düşür",
    cancel: "İptal Et",
    subscribe: "Abone Ol",
    payment: "Ödeme",
    subscription: "Abonelik",
    history: "Geçmiş",
    cardNumber: "Kart Numarası",
    expiryDate: "Son Kullanma Tarihi",
    cvv: "CVV",
    cardholderName: "Kart Sahibinin Adı",
    pay: "Öde",
    cancelPayment: "İptal",
    loading: "Yükleniyor...",
    error: "Yüklenemedi.",
    success: "Başarılı!",
    failed: "Başarısız!",
    noSubscription: "Aktif abonelik yok.",
    noPayments: "Ödeme geçmişi yok."
  },
  en: {
    title: "Premium Packages",
    subtitle: "Accelerate your career journey",
    currentPlan: "Current Plan",
    upgrade: "Upgrade",
    downgrade: "Downgrade",
    cancel: "Cancel",
    subscribe: "Subscribe",
    payment: "Payment",
    subscription: "Subscription",
    history: "History",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    cardholderName: "Cardholder Name",
    pay: "Pay",
    cancelPayment: "Cancel",
    loading: "Loading...",
    error: "Failed to load.",
    success: "Success!",
    failed: "Failed!",
    noSubscription: "No active subscription.",
    noPayments: "No payment history."
  }
};

const packages = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    currency: '₺',
    period: 'ay',
    features: [
      'Kişilik Envanteri',
      'Temel CV Oluşturma',
      'Sınırlı İş İlanları',
      'Temel Raporlar'
    ],
    color: 'bg-gray-100',
    textColor: 'text-gray-800',
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    currency: '₺',
    period: 'ay',
    features: [
      'Tüm Basic Özellikler',
      'Uzmanlık Analizi',
      'AI CV Optimizasyonu',
      'Gelişmiş İş Eşleştirme',
      'Mülakat Hazırlığı',
      'Network Önerileri',
      'Koçluk Seansları (1/ay)',
      'Detaylı Raporlar'
    ],
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    currency: '₺',
    period: 'ay',
    features: [
      'Tüm Pro Özellikler',
      'Sınırsız Koçluk',
      'Özel Rol Simülasyonları',
      'Öncelikli Destek',
      'Özel Network Erişimi',
      'Maaş Müzakere Rehberi',
      'Kariyer Yol Haritası',
      'AI Kariyer Danışmanı'
    ],
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    popular: false
  }
];

export default function PremiumPage({ language = "tr" }: { language?: "tr" | "en" }) {
  const t = content[language];
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [subscriptionData, paymentsData] = await Promise.all([
        getUserSubscription(user.uid),
        getUserPayments(user.uid)
      ]);
      
      setSubscription(subscriptionData);
      setPayments(paymentsData);
    } catch (e) {
      console.warn('Firestore error, using empty data:', e);
      setSubscription(null);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (pkg: any) => {
    setSelectedPackage(pkg);
    setPaymentDialogOpen(true);
  };

  const handlePayment = async () => {
    if (!user || !selectedPackage) return;
    setProcessingPayment(true);
    
    try {
      // Ödeme simülasyonu
      const paymentId = await savePayment(user.uid, {
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        amount: selectedPackage.price,
        currency: selectedPackage.currency,
        paymentMethod: 'credit_card',
        cardLast4: paymentData.cardNumber.slice(-4)
      });

      // Ödeme başarılı simülasyonu
      await updatePaymentStatus(user.uid, paymentId, 'completed');

      // Abonelik oluştur
      await saveUserSubscription(user.uid, {
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        price: selectedPackage.price,
        currency: selectedPackage.currency,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün
        paymentId: paymentId
      });

      // Local state'i güncelle
      setSubscription({
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        price: selectedPackage.price,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });

      setPayments(prev => [...prev, {
        id: paymentId,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        amount: selectedPackage.price,
        status: 'completed',
        createdAt: new Date()
      }]);

      setPaymentDialogOpen(false);
      setSelectedPackage(null);
      setPaymentData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
    } catch (e) {
      console.error('Payment failed:', e);
    } finally {
      setProcessingPayment(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin w-8 h-8 text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <div className="text-gray-500 text-sm">{t.subtitle}</div>
        </div>

        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Paketler
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t.subscription}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {t.history}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {packages.map(pkg => {
                const isCurrentPlan = subscription?.packageId === pkg.id;
                const isUpgrade = subscription && pkg.price > subscription.price;
                const isDowngrade = subscription && pkg.price < subscription.price;
                
                return (
                  <Card key={pkg.id} className={`relative ${pkg.color} ${pkg.textColor} shadow-lg hover:shadow-xl transition-all`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1">
                          <Star className="w-3 h-3 mr-1" />
                          En Popüler
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                      <div className="text-4xl font-bold">
                        {pkg.price === 0 ? 'Ücretsiz' : `${pkg.currency}${pkg.price}`}
                        {pkg.price > 0 && <span className="text-lg font-normal">/{pkg.period}</span>}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-4">
                        {isCurrentPlan ? (
                          <Button className="w-full" variant="outline" disabled>
                            Mevcut Plan
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            onClick={() => handleSubscribe(pkg)}
                            disabled={pkg.price === 0}
                          >
                            {isUpgrade ? t.upgrade : isDowngrade ? t.downgrade : t.subscribe}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="subscription" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.currentPlan}</CardTitle>
              </CardHeader>
              <CardContent>
                {subscription ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{subscription.packageName}</h4>
                        <p className="text-sm text-gray-600">
                          {subscription.currency}{subscription.price}/{language === 'tr' ? 'ay' : 'month'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Başlangıç: {new Date(subscription.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Bitiş: {new Date(subscription.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {subscription.status === 'active' ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">{t.noSubscription}</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.history}</CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">{t.noPayments}</div>
                ) : (
                  <div className="space-y-4">
                    {payments.map(payment => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <CreditCard className="w-8 h-8 text-blue-500" />
                          <div>
                            <h4 className="font-semibold">{payment.packageName}</h4>
                            <p className="text-sm text-gray-600">
                              {payment.currency}{payment.amount} • {new Date(payment.createdAt).toLocaleDateString()}
                            </p>
                            {payment.cardLast4 && (
                              <p className="text-xs text-gray-500">Kart: ****{payment.cardLast4}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment.status)}
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status === 'completed' ? 'Tamamlandı' : 
                             payment.status === 'pending' ? 'Beklemede' : 
                             payment.status === 'failed' ? 'Başarısız' : payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ödeme Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.payment} - {selectedPackage?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.cardNumber}</Label>
              <Input 
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t.expiryDate}</Label>
                <Input 
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <Label>{t.cvv}</Label>
                <Input 
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <Label>{t.cardholderName}</Label>
              <Input 
                value={paymentData.cardholderName}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                placeholder="Ad Soyad"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handlePayment} 
                className="flex-1" 
                disabled={processingPayment || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName}
              >
                {processingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    İşleniyor...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    {t.pay} {selectedPackage?.currency}{selectedPackage?.price}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                {t.cancelPayment}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 