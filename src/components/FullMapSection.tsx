import { useState } from 'react';
import { SYSTEM_MAP_STEPS } from '../data/initialData';
import { Layers, ChevronDown, ChevronUp, Check, ExternalLink } from 'lucide-react';

interface FullMapSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function FullMapSection({ onNavigate }: FullMapSectionProps) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  // Map each step to appropriate section
  const stepTargetMap: Record<number, string> = {
    1: 'diagnostic',
    2: 'diagnostic',
    3: 'diagnostic',
    4: 'scorecard',
    5: 'funnel',
    6: 'funnel',
    7: 'funnel',
    8: 'content',
    9: 'tracking',
    10: 'tracking',
    11: 'content',
    12: 'plan',
    13: 'next-action',
  };

  return (
    <section id="system-map" className="py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-8">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>THE SYSTEM | النظام</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              الخريطة الكاملة: من السوق حتى التوسّع
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
            Page 03
          </span>
        </div>

        {/* Warning / Core insight from original PDF */}
        <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-100 text-sm sm:text-base leading-relaxed mb-8">
          <p>
            <span className="font-bold text-amber-300">المشكلة الشائعة: </span>
            إن الناس تبدأ من منتصف اللعبة: منتج ثم رابط. الخريطة دي تخليك تعرف كل طبقة واقفة على إيه.
          </p>
        </div>

        {/* Interactive Layers Stack */}
        <div className="space-y-3">
          {SYSTEM_MAP_STEPS.map((step) => {
            const isSelected = selectedStep === step.step;
            const targetSection = stepTargetMap[step.step];

            return (
              <div
                key={step.step}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'bg-zinc-800/90 border-amber-500/60 shadow-lg'
                    : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800/90 hover:border-zinc-700'
                }`}
              >
                <div
                  onClick={() => setSelectedStep(isSelected ? null : step.step)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Step Number */}
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-amber-400 font-mono text-xs sm:text-sm font-bold flex items-center justify-center shrink-0">
                      {step.step.toString().padStart(2, '0')}
                    </span>

                    {/* Step Title & Action */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-100 text-base sm:text-lg">
                          {step.nameAr}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          ({step.nameEn})
                        </span>
                      </div>
                      <span className="hidden sm:inline text-zinc-600">←</span>
                      <span className="text-sm font-medium text-amber-300/90">
                        {step.actionAr}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (targetSection) onNavigate(targetSection);
                      }}
                      className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-300 px-2.5 py-1 rounded bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 transition-colors"
                    >
                      <span>انتقل للأداة</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    {isSelected ? (
                      <ChevronUp className="w-5 h-5 text-amber-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500" />
                    )}
                  </div>
                </div>

                {/* Collapsible detail */}
                {isSelected && (
                  <div className="px-5 pb-5 pt-1 border-t border-zinc-800/80 bg-zinc-950/40 space-y-3">
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-amber-400">نصيحة التنفيذ: </span>
                      {step.hintAr}
                    </p>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          if (targetSection) onNavigate(targetSection);
                        }}
                        className="text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <span>الذهاب لأداة هذه المرحلة</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
