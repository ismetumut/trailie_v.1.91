import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a1733] py-6 flex justify-center items-center">
      <div className="flex flex-wrap gap-6 items-center justify-center">
        {/* Sosyal Medya İkonları */}
        <Link href="https://x.com" target="_blank" aria-label="X" className="hover:opacity-80">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4 12 15.5l-4-4L2 20"/><path d="M17 4h5v5"/></svg>
        </Link>
        <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className="hover:opacity-80">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </Link>
        <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="hover:opacity-80">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </Link>
        <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn" className="hover:opacity-80">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="16" y1="8" x2="16" y2="16"/><line x1="8" y1="8" x2="8" y2="16"/><line x1="12" y1="12" x2="12" y2="16"/></svg>
        </Link>
        <Link href="https://youtube.com" target="_blank" aria-label="YouTube" className="hover:opacity-80">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="4"/><polygon points="10 9 15 12 10 15 10 9"/></svg>
        </Link>
        <Link href="#" target="_blank" aria-label="Butterfly" className="hover:opacity-80">
          {/* Butterfly SVG örnek */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c2-2 6-2 8 0s6 2 8 0 6-2 8 0"/><circle cx="12" cy="12" r="2"/></svg>
        </Link>
        {/* App Store ve Google Play Butonları */}
        <Link href="https://apps.apple.com/" target="_blank" aria-label="App Store" className="ml-4">
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-10" />
        </Link>
        <Link href="https://play.google.com/store" target="_blank" aria-label="Google Play" className="ml-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" />
        </Link>
      </div>
    </footer>
  );
} 