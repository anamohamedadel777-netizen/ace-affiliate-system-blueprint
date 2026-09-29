/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BlueprintState, ExecutionStatus, FunnelRow, ContentTestRow, TrackingMetricRow } from './types/blueprint';
import { DEFAULT_BLUEPRINT_STATE } from './data/initialData';
import { Header } from './components/Header';
import { CoverHero } from './components/CoverHero';
import { FullMapSection } from './components/FullMapSection';
import { DecisionTreeSection } from './components/DecisionTreeSection';
import { ReadinessDiagnosticSection } from './components/ReadinessDiagnosticSection';
import { OfferScorecardSection } from './components/OfferScorecardSection';
import { FunnelPlannerSection } from './components/FunnelPlannerSection';
import { ContentTestsSection } from './components/ContentTestsSection';
import { TrackingMapSection } from './components/TrackingMapSection';
import { ThirtyDayPlanSection } from './components/ThirtyDayPlanSection';
import { NextActionSection } from './components/NextActionSection';
import { WhatNextSection } from './components/WhatNextSection';

const STORAGE_KEY = 'ace_affiliate_blueprint_v1';

export default function App() {
  const [blueprintState, setBlueprintState] = useState<BlueprintState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_BLUEPRINT_STATE;
  });

  const [activeSection, setActiveSection] = useState<string>('cover');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blueprintState));
    } catch {
      // Ignore
    }
  }, [blueprintState]);

  // Track scroll position to update activeSection
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'cover',
        'system-map',
        'decision-tree',
        'diagnostic',
        'scorecard',
        'funnel',
        'content',
        'tracking',
        'plan',
        'next-action',
        'what-next',
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleResetData = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط جميع الإجابات والبيانات المدخلة؟')) {
      setBlueprintState(DEFAULT_BLUEPRINT_STATE);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // State update handlers
  const handleChecklistAnswer = (questionId: number, answer: 'yes' | 'no') => {
    setBlueprintState((prev) => ({
      ...prev,
      checklistAnswers: {
        ...prev.checklistAnswers,
        [questionId]: answer,
      },
    }));
  };

  const handleScoreChange = (criterionId: number, score: number) => {
    setBlueprintState((prev) => ({
      ...prev,
      offerScores: {
        ...prev.offerScores,
        [criterionId]: score,
      },
    }));
  };

  const handleEvidenceChange = (field: string, value: string) => {
    setBlueprintState((prev) => ({
      ...prev,
      offerEvidence: {
        ...prev.offerEvidence,
        [field]: value,
      },
    }));
  };

  const handleFunnelPlanChange = (updated: FunnelRow[]) => {
    setBlueprintState((prev) => ({
      ...prev,
      funnelPlan: updated,
    }));
  };

  const handleContentTestsChange = (updated: ContentTestRow[]) => {
    setBlueprintState((prev) => ({
      ...prev,
      contentTests: updated,
    }));
  };

  const handleTrackingMetricsChange = (updated: TrackingMetricRow[]) => {
    setBlueprintState((prev) => ({
      ...prev,
      trackingMetrics: updated,
    }));
  };

  const handleWeekStatusChange = (weekNum: number, status: ExecutionStatus) => {
    setBlueprintState((prev) => ({
      ...prev,
      planWeeks: prev.planWeeks.map((w) => (w.weekNum === weekNum ? { ...w, status } : w)),
    }));
  };

  const handlePlanNotesChange = (val: string) => {
    setBlueprintState((prev) => ({
      ...prev,
      planNotes: val,
    }));
  };

  const handleWeeklyReviewChange = (
    field: 'keep' | 'stop' | 'iterate' | 'retest',
    val: string
  ) => {
    setBlueprintState((prev) => ({
      ...prev,
      weeklyReview: {
        ...prev.weeklyReview,
        [field]: val,
      },
    }));
  };

  const handleNextActionChange = (field: string, val: string | string[]) => {
    setBlueprintState((prev) => ({
      ...prev,
      nextAction: {
        ...prev.nextAction,
        [field]: val,
      },
    }));
  };

  // Calculate completion percentage
  const checklistCount = Object.keys(blueprintState.checklistAnswers).length; // out of 20
  const scoresCount = Object.values(blueprintState.offerScores).filter((s) => s > 0).length; // out of 8
  const contentTestsCount = blueprintState.contentTests.filter((t) => t.topic.trim() !== '').length; // out of 10
  const planCompleted = blueprintState.planWeeks.filter((w) => w.status === 'completed').length; // out of 4
  const nextActionsFilled = [
    blueprintState.nextAction.currentStage,
    blueprintState.nextAction.mainBottleneck,
    blueprintState.nextAction.firstStep48h,
    blueprintState.nextAction.expectedOutput,
  ].filter((s) => s.trim() !== '').length; // out of 4

  const totalPoints =
    checklistCount + scoresCount + contentTestsCount + planCompleted * 2.5 + nextActionsFilled;
  const maxPoints = 20 + 8 + 10 + 10 + 4; // 52
  const completionPercentage = Math.min(100, Math.round((totalPoints / maxPoints) * 100));

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-zinc-100 flex flex-col font-sans">
      {/* Fixed Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onReset={handleResetData}
        completionPercentage={completionPercentage}
      />

      {/* Main Content Sections (Pages 1 to 16) */}
      <main className="flex-1">
        {/* Cover & How to Use (Pages 1 & 2) */}
        <CoverHero onNavigate={handleNavigate} />

        {/* The System: Full Map (Page 3) */}
        <FullMapSection onNavigate={handleNavigate} />

        {/* Where to Start: Decision Tree (Page 4) */}
        <DecisionTreeSection onNavigate={handleNavigate} />

        {/* Diagnostic Checklist & Stage Interpretation (Pages 5, 6, 7) */}
        <ReadinessDiagnosticSection
          answers={blueprintState.checklistAnswers}
          onAnswerChange={handleChecklistAnswer}
          onNavigate={handleNavigate}
        />

        {/* Offer Scorecard & Evidence (Pages 8, 9) */}
        <OfferScorecardSection
          scores={blueprintState.offerScores}
          onScoreChange={handleScoreChange}
          evidence={blueprintState.offerEvidence}
          onEvidenceChange={handleEvidenceChange}
        />

        {/* Funnel Planner & 20-Second Pitch Test (Page 10) */}
        <FunnelPlannerSection
          plan={blueprintState.funnelPlan}
          onPlanChange={handleFunnelPlanChange}
        />

        {/* First 10 Content Tests (Page 11) */}
        <ContentTestsSection
          tests={blueprintState.contentTests}
          onTestsChange={handleContentTestsChange}
        />

        {/* Tracking Map & Leak Diagnostic (Page 12) */}
        <TrackingMapSection
          metrics={blueprintState.trackingMetrics}
          onMetricsChange={handleTrackingMetricsChange}
        />

        {/* 30-Day Plan & Weekly Review (Pages 13, 14) */}
        <ThirtyDayPlanSection
          weeks={blueprintState.planWeeks}
          onWeekStatusChange={handleWeekStatusChange}
          notes={blueprintState.planNotes}
          onNotesChange={handlePlanNotesChange}
          weeklyReview={blueprintState.weeklyReview}
          onReviewChange={handleWeeklyReviewChange}
        />

        {/* Next Action in 48 Hours & 3 Decisions (Page 15) */}
        <NextActionSection
          data={blueprintState.nextAction}
          onChange={handleNextActionChange}
        />

        {/* What Next & Auto Commission Engine (Page 16) */}
        <WhatNextSection onScrollToTop={() => handleNavigate('cover')} />
      </main>
    </div>
  );
}
