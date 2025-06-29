"use client";
import { useAuth } from "@/contexts/AuthContext";
import AIChatbot from "@/components/AIChatbot";

export default function ChatbotPortal() {
  const { user, userType } = useAuth();
  if (!user && !userType) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AIChatbot />
    </div>
  );
} 