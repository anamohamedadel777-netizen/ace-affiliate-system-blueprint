import { SCORECARD_CRITERIA } from '../data/initialData';
import { Star, ShieldAlert, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface OfferScorecardProps {
  scores: Record<number, number>;
  onScoreChange: (criterionId: number, score: number) => void;
  evidence: {
    offerName: string;
    whyFitsAudience: string;
    whatIsEvidence: string;
    trafficRules: string;
    needsVerification: string;
    rejectionReason: string;
  };
  onEvidenceChange: (field: string, value: string) => void;
}

export function OfferScorecardSection({
  scores,
  onScoreChange,
  evidence,
  onEvidenceChange,
}: OfferScorecardProps) {
  // Calculate total score (max 40)
  const totalScore = Object.values(scores).reduce((sum, val) => sum + (val || 0), 0);
  const scoredCount = Object.values(scores).filter((val) => val > 0).length;

  // Determine recommendation tier
  let tier = {
    title: 'أقل من 16',
    advice: 'لا تتسرع؛ أعد البحث أو قارن بدائل.',
    color: 'text-red-400 border-red-500/40 bg-red-950/20',
  };

  if (totalScore >= 32) {
    tier = {
      title: '32-40',
      advice: 'اجمع الأدلة النهائية وتحقق من القواعد قبل الالتزام.',
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
    };
  } else if (totalScore >= 24) {
    tier = {
      title: '24-31',
      advice: 'يستحق مزيدًا من البحث والمقارنة.',
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/20',
    };
  } else if (totalScore >= 16) {
    tier = {
      title: '16-23',
      advice: 'فيه فجوات مهمة قبل بناء الفانل.',
      color: 'text-orange-400 border-orange-500/40 bg-orange-950/20',
    };
  }

  return (
    <section id="scorecard" className="py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* PAGE 8: OFFER SCORECARD */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" />
              <span>OFFER SCORECARD | تقييم العرض</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              بطاقة تقييم العرض - Research Priority Score
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
            Page 08
          </span>
        </div>

        {/* Subtitle Warning from PDF */}
        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-300">
            <span className="font-bold text-amber-400">توجيه: </span>
            استخدمها للمقارنة وترتيب البحث. لا تحول الرقم إلى توقع أرباح.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-zinc-400">المجموع الكلي:</span>
            <span className="font-mono text-xl font-black text-amber-400 tabular-nums">
              {totalScore} <span className="text-xs font-normal text-zinc-500">/ 40</span>
            </span>
          </div>
        </div>

        {/* 8 Criteria Evaluation Table */}
        <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 overflow-hidden mb-8">
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 text-xs font-bold text-zinc-400">
            <div className="col-span-4">المعيار</div>
            <div className="col-span-5">ما الذي تبحث عنه؟</div>
            <div className="col-span-3 text-center">التقييم (1 - 5)</div>
          </div>

          <div className="divide-y divide-zinc-800/80">
            {SCORECARD_CRITERIA.map((item) => {
              const currentScore = scores[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="p-4 sm:grid sm:grid-cols-12 gap-4 items-center hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="sm:col-span-4 mb-1 sm:mb-0">
                    <span className="font-bold text-zinc-100 text-sm block">
                      {item.criterionAr}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      {item.criterionEn}
                    </span>
                  </div>

                  <div className="sm:col-span-5 text-xs sm:text-sm text-zinc-300 mb-3 sm:mb-0">
                    {item.description}
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-between sm:justify-center gap-1.5">
                    <span className="sm:hidden text-xs text-zinc-500 font-medium">الدرجة:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => onScoreChange(item.id, val)}
                          className={`w-7 h-7 rounded text-xs font-mono font-bold transition-all ${
                            currentScore === val
                              ? 'bg-amber-400 text-zinc-950 font-black scale-105 shadow-sm'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Tier Interpretations Grid from Page 8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div
            className={`p-4 rounded-xl border transition-all ${
              scoredCount > 0 && totalScore >= 32
                ? 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500/50'
                : 'border-zinc-800 bg-zinc-900/40 opacity-70'
            }`}
          >
            <div className="font-mono font-black text-lg text-emerald-400 mb-1">
              32-40
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              اجمع الأدلة النهائية وتحقق من القواعد قبل الالتزام.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border transition-all ${
              scoredCount > 0 && totalScore >= 24 && totalScore < 32
                ? 'border-amber-500 bg-amber-950/30 ring-1 ring-amber-500/50'
                : 'border-zinc-800 bg-zinc-900/40 opacity-70'
            }`}
          >
            <div className="font-mono font-black text-lg text-amber-400 mb-1">
              24-31
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              يستحق مزيدًا من البحث والمقارنة.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border transition-all ${
              scoredCount > 0 && totalScore >= 16 && totalScore < 24
                ? 'border-orange-500 bg-orange-950/30 ring-1 ring-orange-500/50'
                : 'border-zinc-800 bg-zinc-900/40 opacity-70'
            }`}
          >
            <div className="font-mono font-black text-lg text-orange-400 mb-1">
              16-23
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              فيه فجوات مهمة قبل بناء الفانل.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border transition-all ${
              scoredCount > 0 && totalScore < 16
                ? 'border-red-500 bg-red-950/30 ring-1 ring-red-500/50'
                : 'border-zinc-800 bg-zinc-900/40 opacity-70'
            }`}
          >
            <div className="font-mono font-black text-lg text-red-400 mb-1">
              أقل من 16
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              لا تتسرع؛ أعد البحث أو قارن بدائل.
            </p>
          </div>
        </div>

        {/* PAGE 9: EVIDENCE / الأدلة */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
            <div>
              <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>EVIDENCE | الأدلة</span>
              </div>
              <h3 className="text-2xl font-extrabold text-zinc-100">
                قبل ما تختار العرض: اكتب لماذا
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
              Page 09
            </span>
          </div>

          {/* Form Fields from Page 9 */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                العرض الذي أبحثه
              </label>
              <input
                type="text"
                value={evidence.offerName}
                onChange={(e) => onEvidenceChange('offerName', e.target.value)}
                placeholder="اسم المنتج أو العرض أو منصة الأفلييت..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  لماذا يناسب الجمهور؟
                </label>
                <textarea
                  rows={3}
                  value={evidence.whyFitsAudience}
                  onChange={(e) => onEvidenceChange('whyFitsAudience', e.target.value)}
                  placeholder="كيف يحل المشكلة بالضبط للجمهور المستهدف؟"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  ما الدليل؟
                </label>
                <textarea
                  rows={3}
                  value={evidence.whatIsEvidence}
                  onChange={(e) => onEvidenceChange('whatIsEvidence', e.target.value)}
                  placeholder="مراجعات حقيقية، أرقام، دراسات حالة، أو تجربة شخصية..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  أهم Traffic Rules (قواعد الترافيك)
                </label>
                <textarea
                  rows={3}
                  value={evidence.trafficRules}
                  onChange={(e) => onEvidenceChange('trafficRules', e.target.value)}
                  placeholder="القواعد والممنوعات من المصدر الرسمي للعرض..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  ما الذي يحتاج تحققًا؟
                </label>
                <textarea
                  rows={3}
                  value={evidence.needsVerification}
                  onChange={(e) => onEvidenceChange('needsVerification', e.target.value)}
                  placeholder="أي نقطة غامضة، سياسات الدفع، الدعم الفني، إلخ..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                لو رفضت العرض، ما السبب المحدد؟
              </label>
              <textarea
                rows={2}
                value={evidence.rejectionReason}
                onChange={(e) => onEvidenceChange('rejectionReason', e.target.value)}
                placeholder="معيار الرفض الموضوعي إن وجد..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Red Flags Callout from Page 9 */}
          <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-600/30 flex items-start gap-3 text-right">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-300 text-sm">
                Red Flags (إشارات تحذير):
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                ادعاءات غير قابلة للتحقق، قواعد ترافيك غير واضحة، صفحة بيع لا تطابق الجمهور، أو منتج لا تستطيع شرحه بصدق.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
