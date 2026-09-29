import { ContentTestRow } from '../types/blueprint';
import { Video, HelpCircle, Lightbulb } from 'lucide-react';

interface ContentTestsProps {
  tests: ContentTestRow[];
  onTestsChange: (updatedTests: ContentTestRow[]) => void;
}

export function ContentTestsSection({ tests, onTestsChange }: ContentTestsProps) {
  const handleChange = (index: number, field: keyof ContentTestRow, value: string) => {
    const next = [...tests];
    next[index] = { ...next[index], [field]: value };
    onTestsChange(next);
  };

  const completedCount = tests.filter((t) => t.topic.trim() !== '').length;

  return (
    <section id="content" className="py-12 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              <span>CONTENT TESTS 10 | المحتوى</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              أول 10 اختبارات بدل انتظار الفيديو ”الفيرال“
            </h2>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
              Page 11
            </span>
          </div>
        </div>

        {/* Subtitle Rule */}
        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-300">
            <span className="font-bold text-amber-400">القاعدة: </span>
            كل صف = <span className="text-amber-300 font-mono font-semibold">Hypothesis (فرضية)</span>.
            غيّر عنصرًا واضحًا قدر الإمكان حتى تعرف ماذا تعلمت.
          </p>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 shrink-0">
            {completedCount} / 10 اختبارات مسجلة
          </span>
        </div>

        {/* 10 Tests Table */}
        <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 overflow-x-auto mb-8">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs font-bold text-zinc-400">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-2">Topic (الموضوع)</div>
              <div className="col-span-2">Hook (الخطاف)</div>
              <div className="col-span-2">Angle (الزاوية)</div>
              <div className="col-span-2">CTA (الدعوة)</div>
              <div className="col-span-3">Learning (ماذا تعلمت؟)</div>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {tests.map((row, idx) => (
                <div
                  key={row.id}
                  className="grid grid-cols-12 gap-3 p-3 items-center hover:bg-zinc-800/30 transition-colors"
                >
                  {/* # */}
                  <div className="col-span-1 text-center font-mono font-bold text-xs text-amber-400">
                    {row.id}
                  </div>

                  {/* Topic */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={row.topic}
                      onChange={(e) => handleChange(idx, 'topic', e.target.value)}
                      placeholder="الموضوع الرئيسي..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>

                  {/* Hook */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={row.hook}
                      onChange={(e) => handleChange(idx, 'hook', e.target.value)}
                      placeholder="أول 3 ثوانٍ..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>

                  {/* Angle */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={row.angle}
                      onChange={(e) => handleChange(idx, 'angle', e.target.value)}
                      placeholder="مقارنة، خطأ، قصة..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>

                  {/* CTA */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={row.cta}
                      onChange={(e) => handleChange(idx, 'cta', e.target.value)}
                      placeholder="الدعوة للرابط أو الهدية..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>

                  {/* Learning */}
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={row.learning}
                      onChange={(e) => handleChange(idx, 'learning', e.target.value)}
                      placeholder="النتيجة أو النمط الملاحظ..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Insight Box from Page 11 */}
        <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-600/30 flex items-start gap-3.5">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <span className="font-bold text-amber-300 text-sm block">
              بعد 10 اختبارات، لا تسأل: ”مين فاز؟“ فقط.
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              اسأل: أي <span className="font-mono text-amber-300 font-bold">Pattern (نمط)</span> تكرر؟
              أي مشكلة جذبت؟ أي زاوية حافظت على الاهتمام؟ وأي <span className="font-mono text-amber-300 font-bold">CTA</span> جاب Leads؟
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
