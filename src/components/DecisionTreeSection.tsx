import { useState } from 'react';
import { DECISION_TREE_QUESTIONS } from '../data/initialData';
import { GitBranch, Check, X, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';

interface DecisionTreeSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function DecisionTreeSection({ onNavigate }: DecisionTreeSectionProps) {
  // Store user answers for the decision tree
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({});

  const handleSelect = (questionId: number, answer: 'yes' | 'no') => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: answer };
      // If user answers 'no', clear subsequent answers since this is the bottleneck
      if (answer === 'no') {
        Object.keys(updated).forEach((key) => {
          const num = Number(key);
          if (num > questionId) {
            delete updated[num];
          }
        });
      }
      return updated;
    });
  };

  // Find first 'no'
  const bottleneckQuestionId = Object.keys(answers)
    .map(Number)
    .sort((a, b) => a - b)
    .find((id) => answers[id] === 'no');

  const bottleneckQuestion = bottleneckQuestionId
    ? DECISION_TREE_QUESTIONS.find((q) => q.id === bottleneckQuestionId)
    : null;

  return (
    <section id="decision-tree" className="py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-8">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5" />
              <span>WHERE TO START? | من أين تبدأ؟</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              شجرة القرار: ما الخطوة التالية المناسبة لك؟
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
            Page 04
          </span>
        </div>

        {/* Diagnosis Banner if user reached a bottleneck */}
        {bottleneckQuestion && (
          <div className="mb-8 p-5 rounded-xl bg-amber-500/15 border-2 border-amber-500/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="font-bold text-zinc-100 text-base">
                  تم تشخيص خطوتك التالية الفورية:
                </span>
              </div>
              <p className="text-amber-300 text-sm font-semibold">
                {bottleneckQuestion.noText}
              </p>
            </div>
            <button
              onClick={() => onNavigate(bottleneckQuestion.noTargetTab)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-lg flex items-center gap-2 transition-colors shrink-0 shadow-md"
            >
              <span>فتح الأداة المطلوبة فوراً</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* The 7 Decision Questions List */}
        <div className="space-y-4">
          {DECISION_TREE_QUESTIONS.map((item) => {
            const currentAnswer = answers[item.id];
            const isBottleneck = bottleneckQuestionId === item.id;
            const isPassed = currentAnswer === 'yes';

            return (
              <div
                key={item.id}
                className={`p-5 rounded-xl border transition-all duration-200 ${
                  isBottleneck
                    ? 'bg-amber-950/20 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : isPassed
                    ? 'bg-zinc-900/40 border-emerald-500/30'
                    : 'bg-zinc-900/60 border-zinc-800'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Question & Index */}
                  <div className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {item.id}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-base sm:text-lg font-bold text-zinc-100">
                        {item.questionAr}
                      </h4>
                      <div className="text-xs text-zinc-400 flex flex-wrap items-center gap-3">
                        <span>
                          <span className="text-red-400 font-medium">ال → </span>
                          {item.noText}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span>
                          <span className="text-emerald-400 font-medium">نعم → </span>
                          {item.yesText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Yes / No Choice Buttons */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => handleSelect(item.id, 'yes')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                        currentAnswer === 'yes'
                          ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>نعم</span>
                    </button>
                    <button
                      onClick={() => handleSelect(item.id, 'no')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                        currentAnswer === 'no'
                          ? 'bg-red-500 text-white shadow-sm'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>ال</span>
                    </button>
                  </div>
                </div>

                {/* Direct Action jump if user answered NO */}
                {currentAnswer === 'no' && (
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-xs text-amber-300 font-medium">
                      خطوتك المباشرة: {item.noText}
                    </p>
                    <button
                      onClick={() => onNavigate(item.noTargetTab)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
                    >
                      <span>الانتقال للأداة المحددة</span>
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Page 4 Bottom Rule Box */}
        <div className="mt-8 p-5 rounded-xl bg-[#14151a] border border-amber-500/40 text-amber-200">
          <p className="text-sm sm:text-base font-bold text-amber-300">
            قاعدة: ما تحاولش تصلح مرحلة 7 لو المرحلة 2 لسه غير واضحة.
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            لا تبحث عن حلول اقتصادية متقدمة أو إعلانات ممولة قبل أن يكون لديك عرض تم بحثه والتحقق من شروطه.
          </p>
        </div>
      </div>
    </section>
  );
}
