import { TrackingMetricRow } from '../types/blueprint';
import { TRACKING_LEAK_CARDS } from '../data/initialData';
import { BarChart3, AlertOctagon, HelpCircle } from 'lucide-react';

interface TrackingMapProps {
  metrics: TrackingMetricRow[];
  onMetricsChange: (updatedMetrics: TrackingMetricRow[]) => void;
}

export function TrackingMapSection({ metrics, onMetricsChange }: TrackingMapProps) {
  const handleChange = (index: number, field: 'currentNumber' | 'hypothesisAction', value: string) => {
    const next = [...metrics];
    next[index] = { ...next[index], [field]: value };
    onMetricsChange(next);
  };

  return (
    <section id="tracking" className="py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>TRACKING MAP | التتبع</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              اعرف مكان المشكلة بدل ما تقول ”الموضوع مش شغال“
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
            Page 12
          </span>
        </div>

        {/* Tracking Metrics Table */}
        <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 overflow-hidden mb-12">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs font-bold text-zinc-400">
            <div className="col-span-4">الانتقال</div>
            <div className="col-span-3">KPI (المؤشر)</div>
            <div className="col-span-2">رقمك الحالي</div>
            <div className="col-span-3">فرضيتك / الإجراء</div>
          </div>

          <div className="divide-y divide-zinc-800/80">
            {metrics.map((row, idx) => (
              <div
                key={idx}
                className="p-4 md:grid md:grid-cols-12 gap-4 items-center hover:bg-zinc-800/30 transition-colors"
              >
                {/* Transition */}
                <div className="md:col-span-4 mb-1 md:mb-0">
                  <span className="font-mono text-xs font-bold text-amber-400 dir-ltr inline-block text-left">
                    {row.transition}
                  </span>
                </div>

                {/* KPI */}
                <div className="md:col-span-3 text-xs sm:text-sm text-zinc-300 font-medium mb-3 md:mb-0">
                  {row.kpi}
                </div>

                {/* Current Number */}
                <div className="md:col-span-2 mb-2 md:mb-0">
                  <label className="block md:hidden text-[11px] font-semibold text-zinc-400 mb-1">
                    رقمك الحالي
                  </label>
                  <input
                    type="text"
                    value={row.currentNumber}
                    onChange={(e) => handleChange(idx, 'currentNumber', e.target.value)}
                    placeholder="مثال: 4.2%"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-amber-300 focus:outline-none"
                  />
                </div>

                {/* Action */}
                <div className="md:col-span-3">
                  <label className="block md:hidden text-[11px] font-semibold text-zinc-400 mb-1">
                    فرضيتك / الإجراء
                  </label>
                  <input
                    type="text"
                    value={row.hypothesisAction}
                    onChange={(e) => handleChange(idx, 'hypothesisAction', e.target.value)}
                    placeholder="تعديل الهوك / تبسيط صفحة..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Drop-off Diagnosis Cards from Page 12 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRACKING_LEAK_CARDS.map((card, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
                <h4 className="text-base font-bold text-zinc-100">
                  {card.title}
                </h4>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {card.advice}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
