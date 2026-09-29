import { ArrowLeft, Sparkles, Compass, ShieldAlert, Award } from 'lucide-react';

interface CoverHeroProps {
  onNavigate: (sectionId: string) => void;
}

export function CoverHero({ onNavigate }: CoverHeroProps) {
  const quickLinks = [
    { id: 'diagnostic', label: 'اختبار الجاهزية' },
    { id: 'scorecard', label: 'بطاقة تقييم العرض' },
    { id: 'funnel', label: 'مخطط الفانل' },
    { id: 'content', label: 'أول 10 اختبارات محتوى' },
    { id: 'plan', label: 'خطة 30 يومًا' },
  ];

  const steps = [
    {
      num: '01',
      title: 'شخّص وضعك',
      text: 'جاوب على اختبار الجاهزية بصدق. لا تعتبر "لا" فشلًا؛ هي ببساطة إشارة لمكان العمل التالي.',
      actionId: 'diagnostic',
    },
    {
      num: '02',
      title: 'حدد عنق الزجاجة',
      text: 'اشتغل على أقدم مرحلة غير مكتملة قبل ما تضيف أدوات أو ترافيك جديد.',
      actionId: 'decision-tree',
    },
    {
      num: '03',
      title: 'حوّل التخمين لاختبار',
      text: 'في النيتش والعرض والمحتوى: سجّل الأدلة، الفرضيات، والنتائج بدل الاعتماد على الإحساس.',
      actionId: 'scorecard',
    },
    {
      num: '04',
      title: 'راجع أسبوعيًا',
      text: 'اسأل: Keep / Stop / Iterate / Retest (استمر / أوقف / عدّل / أعد الاختبار).',
      actionId: 'plan',
    },
  ];

  return (
    <section id="cover" className="relative pt-8 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* PAGE 1: HERO / COVER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-widest uppercase">
            <span>MOHAMED ADEL</span>
            <span className="text-zinc-600">•</span>
            <span>ACE</span>
          </div>

          {/* Titles */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-amber-400 font-sans">
              ACE Affiliate System Blueprint
            </h1>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-100 tracking-tight leading-tight">
              مخطط ACE لبناء نظام
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                الأفلييت من الصفر
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 leading-relaxed">
            اعرف أنت فين في رحلة Affiliate Marketing (التسويق بالعمولة)، إيه اللي ناقصك،
            وإيه أول 3 خطوات تنفذها بعد الفيديو.
          </p>

          {/* Quick Nav Badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
            {quickLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-amber-500/60 rounded-full transition-all duration-150 shadow-sm hover:text-amber-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Founder Visual Frame (Page 1 Visual) */}
          <div className="pt-6 pb-2 flex justify-center">
            <div className="relative group">
              {/* Concentric Golden Rings */}
              <div className="absolute -inset-4 rounded-full border border-amber-500/20 animate-pulse" />
              <div className="absolute -inset-2 rounded-full border border-amber-500/40" />
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 p-1 border-2 border-amber-500 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(245,158,11,0.18)]">
                <div className="w-full h-full rounded-full bg-[#121316] flex flex-col items-center justify-center p-3 relative overflow-hidden">
                  <div className="text-amber-400 mb-1">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 mx-auto opacity-90" />
                  </div>
                  <span className="text-zinc-100 font-bold text-sm sm:text-base">محمد عادل</span>
                  <span className="text-amber-400 font-mono text-[11px] font-semibold tracking-wider">ACE FOUNDER</span>
                  <span className="text-zinc-400 text-[10px] mt-0.5">Affiliate Systems Architect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Callout Notice */}
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-zinc-900/80 border-r-4 border-amber-500 border-y border-l border-zinc-800 text-right">
            <p className="text-sm font-semibold text-zinc-200">
              <span className="text-amber-400 font-bold">الهدف: </span>
              وضوح + قرار + أول خطوة. مش وعد بدخل أو نتائج مضمونة.
            </p>
          </div>
        </div>
      </div>

      {/* PAGE 2: START HERE / ابدأ من هنا */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 mt-16 border-t border-zinc-800">
        <div className="space-y-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1">
                START HERE | ابدأ من هنا
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                كيف تستخدم الـBlueprint في أقل من 30 دقيقة؟
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start sm:self-auto">
              Page 02
            </span>
          </div>

          {/* Blueprint Usage Note */}
          <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 text-zinc-300 leading-relaxed text-sm sm:text-base">
            <p>
              الملف ده مش كتاب تقرأه وتقفله. استخدمه كـ<span className="text-amber-300 font-semibold">Decision Tool (أداة قرار)</span>:
              شخّص مكانك، اختار الأداة المناسبة، وحدد خطوة واحدة تنفذها فورًا.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                onClick={() => onNavigate(step.actionId)}
                className="group p-5 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xl font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded">
                      {step.num}
                    </span>
                    <ArrowLeft className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {step.text}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 group-hover:text-zinc-300">
                  <span>فتح الأداة المرتبطة</span>
                  <span>←</span>
                </div>
              </div>
            ))}
          </div>

          {/* Important note */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 text-amber-200/90 text-sm leading-relaxed">
            <span className="font-bold text-amber-400">مهم: </span>
            الدرجة العالية في أي نموذج هنا لا تعني أن النيتش أو العرض "مربح". هي فقط تساعدك ترتب البحث وتحدد ما يحتاج تحققًا.
          </div>

          {/* The Guiding Rule */}
          <div className="p-6 rounded-2xl bg-[#14151a] border border-amber-500/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />
            <div className="space-y-2">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                القاعدة اللي هنمشي عليها
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-amber-400 tracking-wide">
                Evidence &gt; Assumptions
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pt-1">
                الدليل أهم من الافتراض. لو معلومة مش معروفة، اكتب <span className="text-amber-300 font-semibold font-mono">"Needs Verification (تحتاج تحقق)"</span> بدل ما تمأل الفراغ بتخمين.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
