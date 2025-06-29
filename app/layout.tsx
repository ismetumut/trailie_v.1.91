import './globals.css'
import ClientProviders from '@/components/ClientProviders';
import ChatbotPortal from '@/components/ChatbotPortal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientProviders>
          {children}
          <ChatbotPortal />
        </ClientProviders>
      </body>
    </html>
  );
}
