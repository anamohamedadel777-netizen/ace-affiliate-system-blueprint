import { CheckCircle2, RotateCcw, Printer, Share2 } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReset: () => void;
  completionPercentage: number;
}

export function Header({
  activeSection,
  onNavigate,
  onReset,
  completionPercentage,
}: HeaderProps) {
  const [copied, setCopied] = useState(false);

  const navItems = [
    { id: 'cover', label: 'البداية' },
    { id: 'system-map', label: 'الخريطة الكاملة' },
    { id: 'decision-tree', label: 'شجرة القرار' },
    { id: 'diagnostic', label: 'اختبار الجاهزية' },
    { id: 'scorecard', label: 'تقييم العرض' },
    { id: 'funnel', label: 'مخطط الفانل' },
    { id: 'content', label: 'اختبارات المحتوى' },
    { id: 'tracking', label: 'خريطة التتبع' },
    { id: 'plan', label: 'خطة 30 يوم' },
    { id: 'next-action', label: 'تنفيذ 48 ساعة' },
  ];

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#0d0e12]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#cover"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('cover');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs tracking-wider transition-colors group-hover:border-amber-400">
              ACE
            </div>
            <span className="font-bold text-zinc-100 text-sm sm:text-base tracking-tight hover:text-amber-400 transition-colors">
              ACE Affiliate Blueprint
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 overflow-x-auto py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeSection === item.id
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs">
            <span className="text-zinc-400">الإنجاز:</span>
            <span className="font-mono text-amber-400 tabular-nums font-semibold">
              {completionPercentage}%
            </span>
          </div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            title="طباعة / تصدير PDF"
            className="p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden md:inline">طباعة</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            title="نسخ الرابط"
            className="p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            <span className="hidden md:inline">{copied ? 'تم النسخ' : 'مشاركة'}</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            title="إعادة ضبط البيانات"
            className="p-2 text-zinc-500 hover:text-red-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
