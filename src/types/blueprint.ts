export interface ChecklistQuestion {
  id: number;
  stage: string;
  stageEn: string;
  question: string;
  category: 'Foundation' | 'Audience' | 'Offer' | 'Funnel' | 'Traffic' | 'Tracking' | 'Economics' | 'Optimization';
}

export interface ScoreCriterion {
  id: number;
  criterionAr: string;
  criterionEn: string;
  description: string;
  score: number; // 1 - 5
}

export interface FunnelRow {
  stageAr: string;
  stageEn: string;
  goal: string;
  toolsToUse: string;
  ctaKpi: string;
}

export interface ContentTestRow {
  id: number;
  topic: string;
  hook: string;
  angle: string;
  cta: string;
  learning: string;
}

export interface TrackingMetricRow {
  transition: string;
  kpi: string;
  currentNumber: string;
  hypothesisAction: string;
}

export type ExecutionStatus = 'not_started' | 'in_progress' | 'completed';

export interface PlanWeek {
  weekNum: number;
  titleAr: string;
  titleEn: string;
  tasks: string;
  output: string;
  status: ExecutionStatus;
}

export interface BlueprintState {
  // Page 5 & 6
  checklistAnswers: Record<number, 'yes' | 'no' | null>;
  // Page 8 & 9
  offerScores: Record<number, number>;
  offerEvidence: {
    offerName: string;
    whyFitsAudience: string;
    whatIsEvidence: string;
    trafficRules: string;
    needsVerification: string;
    rejectionReason: string;
  };
  // Page 10
  funnelPlan: FunnelRow[];
  // Page 11
  contentTests: ContentTestRow[];
  // Page 12
  trackingMetrics: TrackingMetricRow[];
  // Page 13 & 14
  planWeeks: PlanWeek[];
  planNotes: string;
  weeklyReview: {
    keep: string;
    stop: string;
    iterate: string;
    retest: string;
  };
  // Page 15
  nextAction: {
    currentStage: string;
    mainBottleneck: string;
    firstStep48h: string;
    expectedOutput: string;
    decisions: [string, string, string];
  };
}
