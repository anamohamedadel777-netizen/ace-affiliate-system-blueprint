import { PlanWeek, ExecutionStatus } from '../types/blueprint';
import { Calendar, CheckCircle2, Circle, Clock, Check } from 'lucide-react';

interface ThirtyDayPlanProps {
  weeks: PlanWeek[];
  onWeekStatusChange: (weekNum: number, status: ExecutionStatus) => void;
  notes: string;
  onNotesChange: (val: string) => void;
  weeklyReview: {
    keep: string;
    stop: string;
    iterate: string;
    retest: string;
  };
  onReviewChange: (field: 'keep' | 'stop' | 'iterate' | 'retest', value: string) => void;
}

export function ThirtyDayPlanSection({
  weeks,
  onWeekStatusChange,
  notes,
  onNotesChange,
  weeklyReview,
  onReviewChange,
}: ThirtyDayPlanProps) {
  const getStatusBadge = (status: ExecutionStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>مكتمل</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>قيد التنفيذ</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
            <Circle className="w-3.5 h-3.5" />
            <span>لم يبدأ</span>
          </span>
        );
    }
  };

  const week1And2 = weeks.filter((w) => w.weekNum <= 2);
  const week3And4 = weeks.filter((w) => w.weekNum > 2);

  return (
    <section id="plan" className="py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>30 DAY PLAN | خطة 30 يوم</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              خطة الـ 30 يومًا لبناء النظام
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
            Pages 13 - 14
          </span>
        </div>

        {/* PAGE 13: WEEKS 1-2: RESEARCH & OFFER */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>الأسبوع 1-2: البحث ثم العرض</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">Page 13</span>
          </div>

          <div className="space-y-4 mb-6">
            {week1And2.map((item) => (
              <div
                key={item.weekNum}
                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-500/20">
                      Week {item.weekNum} | الأسبوع {item.weekNum}
                    </span>
                    <h4 className="text-base font-bold text-zinc-100">
                      {item.titleAr} <span className="text-xs font-mono text-zinc-400">({item.titleEn})</span>
                    </h4>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-zinc-300">
                    <span className="font-bold text-zinc-200">المهام: </span>
                    {item.tasks}
                  </p>
                  <p className="text-amber-300/90 font-medium">
                    <span className="font-bold text-zinc-200">المخرج: </span>
                    {item.output}
                  </p>
                </div>

                {/* Status Toggle Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-zinc-400 ml-2 font-medium">حالة التنفيذ:</span>
                  {(['not_started', 'in_progress', 'completed'] as ExecutionStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => onWeekStatusChange(item.weekNum, st)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                        item.status === st
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {st === 'not_started' ? 'لم يبدأ' : st === 'in_progress' ? 'قيد التنفيذ' : 'مكتمل'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rule of the Week */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-sm mb-6">
            <span className="font-bold text-amber-300">قاعدة الأسبوع: </span>
            لا تنتقل للمرحلة التالية لأنك مللت؛ انتقل لما يكون عندك Output (مخرج) واضح يمكن مراجعته.
          </div>

          {/* Notes / Evidence Textarea */}
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <label className="block text-xs font-bold text-zinc-300">
              ملاحظات / أدلة
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="اكتب ملاحظاتك، الأدلة التي جمعتها، أو العبارات المستخرجة من الجمهور..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* PAGE 14: WEEKS 3-4: FUNNEL, TRAFFIC & TRACKING */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>الأسبوع 3-4: الفانل ثم الترافيك والتتبع</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">Page 14</span>
          </div>

          <div className="space-y-4 mb-8">
            {week3And4.map((item) => (
              <div
                key={item.weekNum}
                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-500/20">
                      Week {item.weekNum} | الأسبوع {item.weekNum}
                    </span>
                    <h4 className="text-base font-bold text-zinc-100">
                      {item.titleAr} <span className="text-xs font-mono text-zinc-400">({item.titleEn})</span>
                    </h4>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-zinc-300">
                    <span className="font-bold text-zinc-200">المهام: </span>
                    {item.tasks}
                  </p>
                  <p className="text-amber-300/90 font-medium">
                    <span className="font-bold text-zinc-200">المخرج: </span>
                    {item.output}
                  </p>
                </div>

                {/* Status Toggle Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-zinc-400 ml-2 font-medium">حالة التنفيذ:</span>
                  {(['not_started', 'in_progress', 'completed'] as ExecutionStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => onWeekStatusChange(item.weekNum, st)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                        item.status === st
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {st === 'not_started' ? 'لم يبدأ' : st === 'in_progress' ? 'قيد التنفيذ' : 'مكتمل'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Review Quadrants from Page 14 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-zinc-100">
                Weekly Review (المراجعة الأسبوعية)
              </h4>
              <span className="text-xs text-zinc-400">أربع قرارات أسبوعية للحفاظ على التركيز</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* KEEP */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <label className="block text-xs font-bold text-emerald-400">
                  KEEP (استمر)
                </label>
                <textarea
                  rows={3}
                  value={weeklyReview.keep}
                  onChange={(e) => onReviewChange('keep', e.target.value)}
                  placeholder="ما الذي أثبت نجاحه ويجب الاستمرار فيه؟"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* STOP */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <label className="block text-xs font-bold text-red-400">
                  STOP (أوقف)
                </label>
                <textarea
                  rows={3}
                  value={weeklyReview.stop}
                  onChange={(e) => onReviewChange('stop', e.target.value)}
                  placeholder="ما الذي يهدر الوقت أو لا يؤدي لنتائج ويجب إيقافه؟"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* ITERATE */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <label className="block text-xs font-bold text-amber-400">
                  ITERATE (عدّل)
                </label>
                <textarea
                  rows={3}
                  value={weeklyReview.iterate}
                  onChange={(e) => onReviewChange('iterate', e.target.value)}
                  placeholder="ما الفكرة الجيدة التي تحتاج لتعديل الزاوية أو العنوان؟"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* RETEST */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <label className="block text-xs font-bold text-blue-400">
                  RETEST (أعد الاختبار)
                </label>
                <textarea
                  rows={3}
                  value={weeklyReview.retest}
                  onChange={(e) => onReviewChange('retest', e.target.value)}
                  placeholder="ما الاختبار الذي يحتاج لإعادة طرحه بجمهور أو سياق مختلف؟"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
