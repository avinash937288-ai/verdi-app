
import React, { useState, useEffect, useCallback } from 'react';
import { Question, Language, TestSession } from '../types';
import LanguageToggle from './LanguageToggle';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Send, Globe, Eye, EyeOff, Info, BookOpenCheck } from 'lucide-react';

interface TestPortalProps {
  session: TestSession;
  onComplete: (session: TestSession) => void;
}

const TestPortal: React.FC<TestPortalProps> = ({ session, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(session.userAnswers);
  const [language, setLanguage] = useState<Language>(Language.HINDI);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Default 120 minutes for Marathon
  const initialTime = session.type === 'MARATHON' ? 120 * 60 : 30 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setShowExplanation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIdx]);

  const handleSubmit = useCallback(() => {
    const finalScore = answers.reduce((acc, curr, idx) => {
      return curr === session.questions[idx].correctOptionIndex ? acc + 1 : acc;
    }, 0);
    onComplete({
      ...session,
      userAnswers: answers,
      endTime: Date.now(),
      score: finalScore
    });
  }, [answers, session, onComplete]);

  const currentQuestion = session.questions[currentIdx];

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
  };

  if (!currentQuestion) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
    </div>
  );

  const isAnswered = answers[currentIdx] !== null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 animate-in">
      {/* Side Controls */}
      <div className="w-full lg:w-72 space-y-6 shrink-0 order-2 lg:order-1">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center vardi-shadow sticky top-24">
          <Clock className="w-10 h-10 text-amber-600 mx-auto mb-2" />
          <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Time Left</p>
          <p className={`text-3xl font-mono font-black mt-1 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
            {formatTime(timeLeft)}
          </p>
          
          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase mb-4 flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" /> Switch Language
            </p>
            <div className="flex flex-col gap-2">
              {Object.values(Language).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-3 px-4 rounded-xl text-sm font-black transition-all border-2 ${
                    language === lang
                      ? 'bg-amber-600 text-white border-amber-600 shadow-lg'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-amber-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-8 py-4 bg-green-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-green-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> Submit Test
          </button>
        </div>
      </div>

      {/* Main Question Content */}
      <div className="flex-1 space-y-6 order-1 lg:order-2">
        <div className="bg-white rounded-3xl border-2 border-slate-100 vardi-shadow overflow-hidden">
          <div className="khaki-gradient p-6 flex justify-between items-center text-white">
            <h2 className="font-black text-xl tracking-tight">Question {currentIdx + 1} <span className="text-white/60 font-medium">/ {session.questions.length}</span></h2>
            <div className="px-4 py-1.5 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
              {session.type} Mode
            </div>
          </div>
          
          <div className="p-8 md:p-12 min-h-[400px]">
            <p className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 leading-snug">
              {currentQuestion.text[language]}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options[language].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4 group relative overflow-hidden ${
                    answers[currentIdx] === idx
                      ? 'border-amber-600 bg-amber-50 ring-4 ring-amber-50'
                      : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black flex-shrink-0 ${
                    answers[currentIdx] === idx ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-lg font-bold ${answers[currentIdx] === idx ? 'text-amber-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                  {answers[currentIdx] === idx && (
                    <div className="absolute top-0 right-0 w-8 h-8 khaki-gradient flex items-center justify-center rounded-bl-xl">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Explanation Toggle Section */}
            {isAnswered && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-sm border ${
                    showExplanation 
                      ? 'bg-amber-600 text-white border-amber-600' 
                      : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  {showExplanation ? <EyeOff className="w-5 h-5" /> : <BookOpenCheck className="w-5 h-5" />}
                  {showExplanation ? 'Hide Solution' : 'View Explanation'}
                </button>

                {showExplanation && (
                  <div className="mt-6 p-1 bg-amber-100/50 rounded-3xl animate-in">
                    <div className="bg-white border-2 border-amber-200 rounded-[1.4rem] p-8 shadow-inner">
                      <div className="flex items-center gap-3 mb-4 text-amber-700">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Info className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1">Expert Guide</p>
                          <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">Detailed Solution</h4>
                        </div>
                      </div>
                      <div className="relative pl-6 border-l-4 border-amber-500 py-2">
                        <p className="text-slate-700 text-lg leading-relaxed font-medium">
                          {currentQuestion.explanation[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between gap-4">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(currentIdx - 1)}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            <div className="flex gap-4">
               {currentIdx < session.questions.length - 1 && (
                 <button
                   onClick={() => setCurrentIdx(currentIdx + 1)}
                   className="flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-white bg-slate-900 hover:bg-black transition-all shadow-lg"
                 >
                   Next Question <ChevronRight className="w-5 h-5" />
                 </button>
               )}
            </div>
          </div>
        </div>

        {/* Question Palette (Bottom) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 vardi-shadow">
          <h3 className="font-black text-slate-800 mb-6 flex items-center gap-3 uppercase tracking-widest text-sm">
            Quick Jump Palette
          </h3>
          <div className="flex flex-wrap gap-2">
            {session.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black transition-all transform active:scale-90 ${
                  currentIdx === idx
                    ? 'ring-4 ring-amber-600 ring-offset-2 z-10 scale-110 shadow-lg'
                    : ''
                } ${
                  answers[idx] !== null
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPortal;
