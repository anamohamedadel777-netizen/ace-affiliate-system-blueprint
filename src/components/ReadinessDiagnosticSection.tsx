import { CHECKLIST_QUESTIONS, STAGES_INTERPRETATION } from '../data/initialData';
import { ClipboardCheck, Check, X, Target, ArrowLeft } from 'lucide-react';

interface ReadinessDiagnosticSectionProps {
  answers: Record<number, 'yes' | 'no' | null>;
  onAnswerChange: (questionId: number, answer: 'yes' | 'no') => void;
  onNavigate: (sectionId: string) => void;
}

export function ReadinessDiagnosticSection({
  answers,
  onAnswerChange,
  onNavigate,
}: ReadinessDiagnosticSectionProps) {
  // Calculate score
  const totalAnswered = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter((val) => val === 'yes').length;
  const noCount = Object.values(answers).filter((val) => val === 'no').length;

  // Find first 'no' question to diagnose bottleneck stage
  const firstNoQuestionId = Object.keys(answers)
    .map(Number)
    .sort((a, b) => a - b)
    .find((id) => answers[id] === 'no');

  const firstNoQuestion = firstNoQuestionId
    ? CHECKLIST_QUESTIONS.find((q) => q.id === firstNoQuestionId)
    : null;

  // Determine diagnosed stage (1-8)
  let diagnosedStageId = 1;
  if (!firstNoQuestionId && yesCount === 20) {
    diagnosedStageId = 8;
  } else if (firstNoQuestion) {
    if (firstNoQuestion.id <= 3) diagnosedStageId = 1;
    else if (firstNoQuestion.id <= 6) diagnosedStageId = 2;
    else if (firstNoQuestion.id <= 10) diagnosedStageId = 3;
    else if (firstNoQuestion.id <= 13) diagnosedStageId = 4;
    else if (firstNoQuestion.id <= 16) diagnosedStageId = 5;
    else if (firstNoQuestion.id <= 18) diagnosedStageId = 6;
    else if (firstNoQuestion.id === 19) diagnosedStageId = 7;
    else if (firstNoQuestion.id === 20) diagnosedStageId = 8;
  }

  // Split into Diagnostic 1/2 (Questions 1-10) and Diagnostic 2/2 (Questions 11-20)
  const part1Questions = CHECKLIST_QUESTIONS.slice(0, 10);
  const part2Questions = CHECKLIST_QUESTIONS.slice(10, 20);

  return (
    <section id="diagnostic" className="py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>DIAGNOSTIC | التشخيص</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              اختبار الجاهزية لتحديد مرحلتك
            </h2>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
              Pages 05 - 07
            </span>
          </div>
        </div>

        {/* Instructions banner */}
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-300">
            <span className="font-bold text-amber-400">توجيه دقيق: </span>
            علّم <span className="text-emerald-400 font-bold">”نعم“</span> فقط لو عندك شيء ملموس يدعم الإجابة.
            لو لسه بتخطط، اختار <span className="text-red-400 font-bold">”ال“</span>.
          </p>
          <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
            <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              نعم: {yesCount}
            </span>
            <span className="text-red-400 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/20">
              ال: {noCount}
            </span>
            <span className="text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded">
              {totalAnswered} / 20 مكتمل
            </span>
          </div>
        </div>

        {/* PART 1: PAGE 5 - الأساس والجمهور والعرض */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>الجزء الأول: الأساس والجمهور والعرض (DIAGNOSTIC 1/2)</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">Page 05</span>
          </div>

          <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 text-xs font-bold text-zinc-400">
              <div className="col-span-1">#</div>
              <div className="col-span-3">المرحلة</div>
              <div className="col-span-6">السؤال</div>
              <div className="col-span-2 text-center">الإجابة</div>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {part1Questions.map((q) => {
                const answer = answers[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-4 sm:grid sm:grid-cols-12 gap-4 items-center hover:bg-zinc-800/30 transition-colors"
                  >
                    <div className="font-mono text-xs text-amber-400 font-bold mb-1 sm:mb-0 sm:col-span-1">
                      {q.id.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-zinc-400 mb-2 sm:mb-0 sm:col-span-3 font-medium">
                      {q.stage} <span className="font-mono text-zinc-500">| {q.stageEn}</span>
                    </div>
                    <div className="text-sm text-zinc-200 mb-3 sm:mb-0 sm:col-span-6 leading-relaxed">
                      {q.question}
                    </div>
                    <div className="flex items-center justify-end sm:justify-center gap-2 sm:col-span-2">
                      <button
                        onClick={() => onAnswerChange(q.id, 'yes')}
                        className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all ${
                          answer === 'yes'
                            ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>نعم</span>
                      </button>
                      <button
                        onClick={() => onAnswerChange(q.id, 'no')}
                        className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all ${
                          answer === 'no'
                            ? 'bg-red-500 text-white shadow-sm'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <X className="w-3 h-3" />
                        <span>ال</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PART 2: PAGE 6 - الفانل والترافيك والتتبع */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>الجزء الثاني: الفانل والترافيك والتتبع (DIAGNOSTIC 2/2)</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">Page 06</span>
          </div>

          <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 text-xs font-bold text-zinc-400">
              <div className="col-span-1">#</div>
              <div className="col-span-3">المرحلة</div>
              <div className="col-span-6">السؤال</div>
              <div className="col-span-2 text-center">الإجابة</div>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {part2Questions.map((q) => {
                const answer = answers[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-4 sm:grid sm:grid-cols-12 gap-4 items-center hover:bg-zinc-800/30 transition-colors"
                  >
                    <div className="font-mono text-xs text-amber-400 font-bold mb-1 sm:mb-0 sm:col-span-1">
                      {q.id.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-zinc-400 mb-2 sm:mb-0 sm:col-span-3 font-medium">
                      {q.stage} <span className="font-mono text-zinc-500">| {q.stageEn}</span>
                    </div>
                    <div className="text-sm text-zinc-200 mb-3 sm:mb-0 sm:col-span-6 leading-relaxed">
                      {q.question}
                    </div>
                    <div className="flex items-center justify-end sm:justify-center gap-2 sm:col-span-2">
                      <button
                        onClick={() => onAnswerChange(q.id, 'yes')}
                        className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all ${
                          answer === 'yes'
                            ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>نعم</span>
                      </button>
                      <button
                        onClick={() => onAnswerChange(q.id, 'no')}
                        className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all ${
                          answer === 'no'
                            ? 'bg-red-500 text-white shadow-sm'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <X className="w-3 h-3" />
                        <span>ال</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PAGE 7: YOUR STAGE / مرحلتك */}
        <div className="mt-14 pt-8 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1">
                YOUR STAGE | مرحلتك
              </div>
              <h3 className="text-2xl font-extrabold text-zinc-100">
                فسّر النتيجة وحدد أولويتك
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
              Page 07
            </span>
          </div>

          {/* Active Diagnosed Notification */}
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs text-zinc-400">المرحلة الموصى بها لوضعك الحالي:</span>
                <p className="text-base font-bold text-amber-300">
                  {STAGES_INTERPRETATION.find((s) => s.id === diagnosedStageId)?.titleAr} (
                  {STAGES_INTERPRETATION.find((s) => s.id === diagnosedStageId)?.titleEn})
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (diagnosedStageId <= 2) onNavigate('cover');
                else if (diagnosedStageId === 3) onNavigate('scorecard');
                else if (diagnosedStageId === 4) onNavigate('funnel');
                else if (diagnosedStageId === 5) onNavigate('content');
                else if (diagnosedStageId === 6) onNavigate('tracking');
                else onNavigate('plan');
              }}
              className="text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <span>تنفيذ الخطوة الموصى بها</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* 8 Stages Grid from Page 7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STAGES_INTERPRETATION.map((stage) => {
              const isCurrent = stage.id === diagnosedStageId;

              return (
                <div
                  key={stage.id}
                  className={`p-5 rounded-xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-zinc-800/90 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                      : 'bg-zinc-900/50 border-zinc-800/90'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 right-0 left-0 h-1 bg-amber-400" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 font-bold font-mono text-sm flex items-center justify-center">
                        {stage.id}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                          مرحلتك الحالية
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-zinc-100 mb-2">
                      ({stage.titleAr}) <span className="font-mono text-sm text-zinc-400">{stage.titleEn}</span>
                    </h4>

                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80">
                    <p className="text-xs font-semibold text-amber-300/90">
                      <span className="text-zinc-400 font-normal">الخطوة: </span>
                      {stage.action}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
