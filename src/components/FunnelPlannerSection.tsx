import { useState, useEffect } from 'react';
import { FunnelRow } from '../types/blueprint';
import { Filter, Play, Pause, RotateCcw, Clock, CheckCircle } from 'lucide-react';

interface FunnelPlannerProps {
  plan: FunnelRow[];
  onPlanChange: (updatedPlan: FunnelRow[]) => void;
}

export function FunnelPlannerSection({ plan, onPlanChange }: FunnelPlannerProps) {
  // 20-second test timer state
  const [timerSeconds, setTimerSeconds] = useState(20);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setTimerFinished(true);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = () => {
    setTimerFinished(false);
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(20);
    setTimerFinished(false);
  };

  const handleRowChange = (index: number, field: 'toolsToUse' | 'ctaKpi', value: string) => {
    const next = [...plan];
    next[index] = { ...next[index], [field]: value };
    onPlanChange(next);
  };

  return (
    <section id="funnel" className="py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>FUNNEL PLANNER | مخطط الفانل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              ارسم الرحلة قبل اختيار الأدوات
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
            Page 10
          </span>
        </div>

        {/* Funnel Planning Interactive Table */}
        <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 overflow-hidden mb-8">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs font-bold text-zinc-400">
            <div className="col-span-3">المرحلة</div>
            <div className="col-span-3">هدفها</div>
            <div className="col-span-3">ما الذي ستستخدمه؟</div>
            <div className="col-span-3">CTA / KPI</div>
          </div>

          <div className="divide-y divide-zinc-800/80">
            {plan.map((row, idx) => (
              <div
                key={idx}
                className="p-4 md:grid md:grid-cols-12 gap-4 items-center hover:bg-zinc-800/30 transition-colors"
              >
                {/* Stage */}
                <div className="md:col-span-3 mb-2 md:mb-0">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-400/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100 text-sm block">
                        {row.stageAr}
                      </span>
                      <span className="font-mono text-xs text-zinc-500">
                        {row.stageEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Goal */}
                <div className="md:col-span-3 text-xs sm:text-sm text-amber-300/90 font-medium mb-3 md:mb-0">
                  {row.goal}
                </div>

                {/* What will you use? */}
                <div className="md:col-span-3 mb-2 md:mb-0">
                  <label className="block md:hidden text-[11px] font-semibold text-zinc-400 mb-1">
                    ما الذي ستستخدمه؟
                  </label>
                  <input
                    type="text"
                    value={row.toolsToUse}
                    onChange={(e) => handleRowChange(idx, 'toolsToUse', e.target.value)}
                    placeholder="مثال: يوتيوب / أداة مجانية / بريد..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-lg px-3 py-1.5 text-xs text-zinc-100 focus:outline-none"
                  />
                </div>

                {/* CTA / KPI */}
                <div className="md:col-span-3">
                  <label className="block md:hidden text-[11px] font-semibold text-zinc-400 mb-1">
                    CTA / KPI
                  </label>
                  <input
                    type="text"
                    value={row.ctaKpi}
                    onChange={(e) => handleRowChange(idx, 'ctaKpi', e.target.value)}
                    placeholder="الرابط / المؤشر المقاس..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-lg px-3 py-1.5 text-xs text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 20-Second Simplicity Test (Bottom of Page 10) */}
        <div className="p-6 rounded-2xl bg-[#14151a] border border-amber-500/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-bold text-zinc-100">
                  اختبار البساطة: هل تستطيع شرح الرحلة كلها في 20 ثانية؟
                </h4>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                لو لا، غالبًا عندك خطوات زائدة أو رسالة غير واضحة. اضغط على المؤقت وجرّب تشرح الفانل الخاص بك بصوت مسموع!
              </p>
            </div>

            {/* Interactive Stopwatch */}
            <div className="flex items-center gap-3 shrink-0 self-center md:self-auto bg-zinc-900 p-3 rounded-xl border border-zinc-800">
              <div className="text-center px-3">
                <span
                  className={`font-mono text-2xl font-black tabular-nums ${
                    timerSeconds <= 5 && timerSeconds > 0
                      ? 'text-red-400 animate-pulse'
                      : timerFinished
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {timerSeconds.toString().padStart(2, '0')}s
                </span>
                <span className="block text-[10px] text-zinc-500">
                  {timerFinished ? 'انتهى الوقت' : 'المؤقت'}
                </span>
              </div>

              <div className="flex items-center gap-1 border-r border-zinc-800 pr-2">
                {!isTimerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    disabled={timerSeconds === 0}
                    className="p-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-lg font-bold transition-colors disabled:opacity-50"
                    title="بدء"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={handlePauseTimer}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg font-bold transition-colors"
                    title="إيقاف مؤقت"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleResetTimer}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-lg transition-colors"
                  title="إعادة ضبط"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
