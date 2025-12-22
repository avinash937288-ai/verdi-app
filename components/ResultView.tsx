
import React, { useState, useMemo } from 'react';
import { TestSession, Language, Pillar } from '../types';
import { CheckCircle2, XCircle, Home, RotateCcw, ChevronDown, ChevronUp, Brain, Target, Quote, AlertCircle } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

interface ResultViewProps {
  session: TestSession;
  onHome: () => void;
  onRetry: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ session, onHome, onRetry }) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>(Language.HINDI);
  
  const totalQuestions = session.questions.length;
  const score = session.score || 0;
  const percentage = (score / totalQuestions) * 100;

  const analysis = useMemo(() => {
    const pillarStats: Record<string, { total: number; correct: number }> = {};
    
    session.questions.forEach((q, idx) => {
      const p = q.pillar || 'General Knowledge';
      if (!pillarStats[p]) pillarStats[p] = { total: 0, correct: 0 };
      pillarStats[p].total++;
      if (session.userAnswers[idx] === q.correctOptionIndex) {
        pillarStats[p].correct++;
      }
    });

    // Mark areas needing focus (Accuracy < 60%)
    const focusAreas = Object.entries(pillarStats)
      .filter(([_, stats]) => (stats.correct / stats.total) < 0.6)
      .map(([name]) => name);

    let summary = "Your performance shows good potential.";
    if (percentage >= 90) summary = "Excellent work! You are clearly prepared for the role.";
    else if (percentage >= 75) summary = "Solid performance. A few more practice sessions will make you a top contender.";
    else if (percentage >= 50) summary = "Fair effort. Consistency in weak topics will significantly boost your score.";
    else summary = "Keep practicing. Focus on understanding core concepts to improve accuracy.";

    return { focusAreas, summary };
  }, [session]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in">
      {/* Shayari Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-1 bg-amber-100 rounded-full mb-6">
           <div className="bg-amber-600 p-3 rounded-full text-white">
             <Quote className="w-6 h-6" />
           </div>
        </div>
        <h2 className="text-3xl font-serif italic text-slate-800 leading-relaxed max-w-2xl mx-auto mb-4">
          "{session.shayari}"
        </h2>
        <p className="text-amber-600 font-black uppercase tracking-widest text-xs">Motivational Bhojpuri Shayari</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Summary & Focus (English) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden vardi-shadow">
            <div className="khaki-gradient p-10 text-center text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">Performance Summary</p>
              <p className="text-6xl font-black mb-1">{Math.round(percentage)}%</p>
              <p className="font-bold text-white/80">Total Score: {score} / {totalQuestions}</p>
            </div>
            <div className="p-8 space-y-8">
              <div>
                <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm mb-2">Analysis</h4>
                <p className="text-slate-600 font-medium leading-relaxed">{analysis.summary}</p>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <Target className="w-5 h-5 text-red-600" />
                   <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Needs More Focus</h4>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {analysis.focusAreas.length > 0 ? analysis.focusAreas.map(area => (
                      <span key={area} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-[10px] font-black border border-red-100 uppercase tracking-wider">
                        {area}
                      </span>
                    )) : (
                      <span className="text-xs text-green-600 font-bold italic">No specific weak areas detected. Outstanding!</span>
                    )}
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-3">
                 <div className="flex items-center gap-3 text-blue-600">
                   <Brain className="w-5 h-5" />
                   <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Smart Suggestion</h4>
                 </div>
                 <p className="text-sm text-slate-500 font-medium italic">
                    Focus more on weak topics and attempt sectional tests regularly to build speed and accuracy.
                 </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={onHome} className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-slate-200"><Home className="w-4 h-4" /> Home</button>
            <button onClick={onRetry} className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-700 transition-all shadow-xl shadow-amber-100"><RotateCcw className="w-4 h-4" /> Retake</button>
          </div>
        </div>

        {/* Right: Detailed Review */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 vardi-shadow overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Question Review</h3>
              <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
            </div>
            <div className="divide-y divide-slate-100 max-h-[800px] overflow-y-auto">
              {session.questions.map((q, idx) => {
                const userAnswer = session.userAnswers[idx];
                const isCorrect = userAnswer === q.correctOptionIndex;
                const isExpanded = expandedIdx === idx;

                return (
                  <div key={q.id || idx} className={`p-8 transition-colors ${isExpanded ? 'bg-amber-50/30' : 'hover:bg-slate-50'}`}>
                    <div className="flex items-start gap-4 cursor-pointer" onClick={() => setExpandedIdx(isExpanded ? null : idx)}>
                      <div className={`mt-1.5 flex-shrink-0 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                        {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Question {idx + 1}</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 opacity-60">{q.pillar}</span>
                        </div>
                        <p className="font-bold text-slate-800 leading-snug">{q.text[language]}</p>
                        
                        {isExpanded && (
                          <div className="mt-8 space-y-6 animate-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {q.options[language].map((opt, optIdx) => (
                                <div key={optIdx} className={`p-4 rounded-xl text-sm border-2 flex items-center gap-3 ${optIdx === q.correctOptionIndex ? 'bg-green-50 border-green-200 text-green-700 font-black' : optIdx === userAnswer ? 'bg-red-50 border-red-200 text-red-700 font-bold' : 'bg-white border-slate-100 text-slate-500'}`}>
                                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black shrink-0 ${optIdx === q.correctOptionIndex ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{String.fromCharCode(65 + optIdx)}</div>
                                  {opt}
                                </div>
                              ))}
                            </div>
                            <div className="p-6 bg-white border-2 border-amber-200 rounded-2xl">
                               <p className="text-sm text-slate-700 leading-relaxed font-medium"><b>Solution:</b> {q.explanation[language]}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-slate-300 mt-1">{isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
