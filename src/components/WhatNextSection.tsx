import { Sparkles, Shield, XCircle, CheckCircle, ChevronUp } from 'lucide-react';

interface WhatNextSectionProps {
  onScrollToTop: () => void;
}

export function WhatNextSection({ onScrollToTop }: WhatNextSectionProps) {
  return (
    <section id="what-next" className="py-16 border-t border-zinc-800 bg-[#090a0d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1">
              WHAT NEXT? | ماذا بعد؟
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-100">
              أنت معاك الخريطة. التنفيذ الكامل يحتاج نظامًا.
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
            Page 16
          </span>
        </div>

        {/* Narrative */}
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
          لو استخدمت الـBlueprint صح، المفروض دلوقتي تعرف أنت واقف فين، وإيه اللي ناقص، وإيه أول خطوة.
          المرحلة التالية هي بناء كل جزء بعمق وربطه بباقي النظام.
        </p>

        {/* ACE Engine Card from Page 16 */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border-2 border-amber-500/40 relative overflow-hidden space-y-6 mb-10 shadow-2xl">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

          {/* Engine Title */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-amber-400 font-sans tracking-wide">
              ACE - Auto Commission Engine
            </h3>
            <div className="text-lg font-bold text-zinc-100 mt-0.5">
              (نظام ACE لمحرك العمولات)
            </div>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            داخل ACE بنحوّل نفس الخريطة إلى <span className="font-semibold text-amber-300">Implementation System (نظام تنفيذ)</span>:
            اختيار السوق والعرض، الفانل، المحتوى، التتبع، الاقتصاديات، الأدوات والقوالب، ثم التحسين والتوسع.
          </p>

          {/* Not For You vs For You from Page 16 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Not for you */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>مش مناسب ليك لو:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                بتدور على نيتش مضمون أو دخل مضمون أو اختصار بدون بحث واختبار.
              </p>
            </div>

            {/* For you */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>مناسب ليك لو:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                عايز تبني نظامًا قابلًا للقياس وتتعلم اتخاذ القرار بنفسك.
              </p>
            </div>
          </div>
        </div>

        {/* Disclosure from Page 16 */}
        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-right space-y-1.5 mb-12">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold">
            <Shield className="w-4 h-4 text-amber-500/70" />
            <span>Disclosure (إخلاء مسؤولية):</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            هذا الملف تعليمي. لا توجد ضمانات للدخل أو النتائج. أي نتائج تعتمد على السوق والعرض والجمهور والتنفيذ والاختبار وعوامل أخرى.
          </p>
        </div>

        {/* Signatures & Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">Mohamed Adel</span>
            <span>•</span>
            <span>Affiliate Systems</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">ACE</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-zinc-400">
              ACE Affiliate System Blueprint
            </span>
            <button
              onClick={onScrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors flex items-center gap-1"
              title="العودة للأعلى"
            >
              <ChevronUp className="w-4 h-4" />
              <span className="text-[11px]">للأعلى</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
