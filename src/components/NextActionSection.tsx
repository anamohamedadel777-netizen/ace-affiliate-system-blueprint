import { Zap, AlertTriangle, CheckSquare } from 'lucide-react';

interface NextActionProps {
  data: {
    currentStage: string;
    mainBottleneck: string;
    firstStep48h: string;
    expectedOutput: string;
    decisions: [string, string, string];
  };
  onChange: (field: string, val: string | string[]) => void;
}

export function NextActionSection({ data, onChange }: NextActionProps) {
  const handleDecisionChange = (index: number, val: string) => {
    const updated = [...data.decisions] as [string, string, string];
    updated[index] = val;
    onChange('decisions', updated);
  };

  return (
    <section id="next-action" className="py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>NEXT ACTION | الخطوة التالية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              حوّل الـBlueprint إلى تنفيذ خلال 48 ساعة
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
            Page 15
          </span>
        </div>

        {/* 4 Execution Commitments Card from Page 15 */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-5 mb-8">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              مرحلتي الحالية:
            </label>
            <input
              type="text"
              value={data.currentStage}
              onChange={(e) => onChange('currentStage', e.target.value)}
              placeholder="مثال: مرحلة 2 (Audience) أو مرحلة 3 (Offer)..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg p-2.5 text-sm text-zinc-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              عنق الزجاجة الرئيسي:
            </label>
            <input
              type="text"
              value={data.mainBottleneck}
              onChange={(e) => onChange('mainBottleneck', e.target.value)}
              placeholder="ما الذي يعطلك الآن بدقة؟ (مثال: عدم وضوح زوايا المحتوى / عدم فحص صفحة البيع)..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg p-2.5 text-sm text-zinc-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              أول خطوة خلال 48 ساعة:
            </label>
            <input
              type="text"
              value={data.firstStep48h}
              onChange={(e) => onChange('firstStep48h', e.target.value)}
              placeholder="فعل ملموس قابل للإنجاز قبل نهاية اليومين..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg p-2.5 text-sm text-zinc-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              المخرج الذي سأنتجه:
            </label>
            <input
              type="text"
              value={data.expectedOutput}
              onChange={(e) => onChange('expectedOutput', e.target.value)}
              placeholder="ملف، جدول، نص إعلاني، تسجيل فيديو، صفحة هبوط..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg p-2.5 text-sm text-zinc-100 focus:outline-none"
            />
          </div>
        </div>

        {/* 3 Decisions Only for this Week */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 mb-8">
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-400" />
            <span>3 قرارات فقط لهذا الأسبوع</span>
          </h3>

          <div className="space-y-3">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="font-mono font-bold text-amber-400 w-5 text-left">
                  .{idx + 1}
                </span>
                <input
                  type="text"
                  value={data.decisions[idx] || ''}
                  onChange={(e) => handleDecisionChange(idx, e.target.value)}
                  placeholder={`القرار ${idx + 1}...`}
                  className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* The Golden Prohibition Box from Page 15 */}
        <div className="p-5 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-200 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base font-bold text-amber-300 leading-relaxed">
            ممنوع إضافة أداة جديدة هذا الأسبوع إلا لو الأداة تحل عنق الزجاجة الذي كتبته فوق.
          </p>
        </div>
      </div>
    </section>
  );
}
