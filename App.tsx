
import React, { useState, useEffect } from 'react';
import { Pillar, TestSession, Question, Language, MockTestMeta } from './types';
import { PILLARS_CONFIG } from './constants';
import TopicCard from './components/TopicCard';
import TestPortal from './components/TestPortal';
import ResultView from './components/ResultView';
import AdminPanel from './components/AdminPanel';
import { generateQuestions, getBhojpuriShayari } from './services/geminiService';
import { 
  Trophy, 
  Flame, 
  Calendar, 
  Map as MapIcon, 
  Info, 
  Users, 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Settings, 
  LayoutDashboard, 
  Database, 
  Camera 
} from 'lucide-react';

const MOCK_TESTS: MockTestMeta[] = Array.from({ length: 20 }, (_, i) => ({
  id: `mock-${i + 1}`,
  title: `Full Mock Test #${i + 1}`,
  description: "Comprehensive 100-question marathon with 30-40-30 Difficulty Mix.",
  questionCount: 100,
  durationMinutes: 120
}));

const App: React.FC = () => {
  const [view, setView] = useState<'HOME' | 'TEST' | 'RESULT' | 'ADMIN' | 'MOCKS_LIST'>('HOME');
  const [activeSession, setActiveSession] = useState<TestSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startTopicSprint = async (pillar: Pillar) => {
    setLoading(true);
    setError(null);
    try {
      // Sprint updated to 20 questions
      const questions = await generateQuestions(pillar, 20); 
      if (!questions || questions.length === 0) throw new Error("Could not load questions.");
      
      setActiveSession({
        id: Math.random().toString(36).substr(2, 9),
        type: 'SPRINT',
        pillar,
        questions,
        userAnswers: new Array(questions.length).fill(null),
        startTime: Date.now(),
      });
      setView('TEST');
    } catch (err: any) {
      setError(err.message || "Unable to generate test.");
    } finally { setLoading(false); }
  };

  const startMarathon = async (mockId?: string) => {
    setLoading(true);
    setError(null);
    try {
      // Fast opening: requesting 100 questions.
      const questions = await generateQuestions(mockId ? `Full Mock Test ${mockId}` : "Mixed GK Marathon", 100); 
      if (!questions || questions.length === 0) throw new Error("Could not load marathon questions.");

      setActiveSession({
        id: Math.random().toString(36).substr(2, 9),
        type: 'MARATHON',
        questions,
        userAnswers: new Array(questions.length).fill(null),
        startTime: Date.now(),
      });
      setView('TEST');
    } catch (err: any) {
      setError(err.message || "Failed to load test. Please try again.");
    } finally { setLoading(false); }
  };

  const handleTestComplete = async (session: TestSession) => {
    setLoading(true);
    // Instant Bhojpuri Shayari from local/API bridge
    const shayari = await getBhojpuriShayari();
    setActiveSession({ ...session, shayari });
    setView('RESULT');
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">FAST OPENING ACTIVE...</h2>
        <p className="text-slate-500 mt-2 font-medium">Fetching 100 unique questions from the Bridge...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('HOME'); setError(null); }}>
            <div className="w-10 h-10 khaki-gradient rounded-xl flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-all">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">VARDI APP</h1>
              <p className="text-[10px] text-amber-600 font-black tracking-widest uppercase">UP Homeguard Official</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <button onClick={() => setView('HOME')} className={`text-sm font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors ${view === 'HOME' ? 'text-amber-600 bg-amber-50' : 'text-slate-500 hover:text-slate-900'}`}>Dashboard</button>
             <button onClick={() => setView('MOCKS_LIST')} className={`text-sm font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors ${view === 'MOCKS_LIST' ? 'text-amber-600 bg-amber-50' : 'text-slate-500 hover:text-slate-900'}`}>Mock Tests</button>
             <button onClick={() => setView('ADMIN')} className={`text-sm font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors ${view === 'ADMIN' ? 'text-amber-600 bg-amber-50' : 'text-slate-500 hover:text-slate-900'}`}><Settings className="w-4 h-4 inline mr-1" /> Admin</button>
          </div>
          <button className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-100 hover:bg-black transition-all">My Profile</button>
        </div>
      </nav>

      <div className="flex-1">
        {view === 'HOME' && (
          <main className="max-w-7xl mx-auto px-4 py-8 animate-in">
            <div className="relative overflow-hidden rounded-[2.5rem] khaki-gradient p-12 text-white mb-12 shadow-2xl vardi-shadow">
              <div className="relative z-10 max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">The Marathon Series</span>
                  <span className="bg-green-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-green-500/20 text-green-300">Live Sync Active</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">100 Questions.<br/>120 Minutes.</h2>
                <p className="text-lg text-white/90 mb-10 max-w-lg font-medium leading-relaxed">Experience the real exam. Practice all 11 topics in one session with unique questions every time.</p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => startMarathon()} className="px-10 py-5 bg-white text-amber-700 rounded-2xl font-black text-lg shadow-2xl shadow-amber-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"><Trophy className="w-6 h-6" /> Start Full Marathon</button>
                  <button onClick={() => setView('MOCKS_LIST')} className="px-8 py-5 bg-white/10 text-white rounded-2xl font-black text-lg border border-white/20 hover:bg-white/20 transition-all">Browse Mocks</button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-12 p-6 bg-red-50 border-2 border-red-200 rounded-3xl flex items-center justify-between text-red-700">
                <div className="flex items-center gap-4"><AlertTriangle className="w-8 h-8" /><div><p className="font-black uppercase tracking-tight">Error</p><p className="text-sm font-medium">{error}</p></div></div>
                <button onClick={() => setError(null)} className="p-2 hover:bg-red-100 rounded-full transition-colors"><RefreshCw className="w-5 h-5" /></button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 flex flex-col gap-6 group hover:bg-blue-100/50 transition-colors">
                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200"><Database className="w-8 h-8" /></div>
                <div><h4 className="font-black text-blue-900 text-xl uppercase tracking-tight">The Bridge</h4><p className="text-blue-600 font-medium">Auto-synced from Examveda.</p></div>
              </div>
              <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 flex flex-col gap-6 group hover:bg-amber-100/50 transition-colors">
                <div className="w-16 h-16 bg-amber-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-amber-200"><Camera className="w-8 h-8" /></div>
                <div><h4 className="font-black text-amber-900 text-xl uppercase tracking-tight">OCR Scanner</h4><p className="text-amber-600 font-medium">Instant book page conversion.</p></div>
              </div>
              <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 flex flex-col gap-6 group hover:bg-emerald-100/50 transition-colors">
                <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-emerald-200"><Users className="w-8 h-8" /></div>
                <div><h4 className="font-black text-emerald-900 text-xl uppercase tracking-tight">Live Ranking</h4><p className="text-emerald-600 font-medium">Compare with 1,245 aspirants.</p></div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8">Syllabus Basic Quiz <span className="text-amber-600">(20 Questions)</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {PILLARS_CONFIG.map((pillar) => (
                  <TopicCard key={pillar.id} title={pillar.id} icon={pillar.icon} color={pillar.color} description={pillar.desc} onClick={() => startTopicSprint(pillar.id)} />
                ))}
              </div>
            </div>
          </main>
        )}

        {view === 'MOCKS_LIST' && (
          <div className="max-w-7xl mx-auto px-4 py-12 animate-in">
            <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">Full Mock Library</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-10">Select a unique session (100 Qs each)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_TESTS.map((mock) => (
                <div key={mock.id} className="bg-white rounded-3xl border border-slate-200 p-8 vardi-shadow hover:border-amber-400 transition-all group">
                  <div className="w-12 h-12 khaki-gradient rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform"><Trophy className="w-6 h-6" /></div>
                  <h4 className="font-black text-slate-800 text-xl mb-2">{mock.title}</h4>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">{mock.description}</p>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest"><Clock className="w-4 h-4" /> {mock.durationMinutes} Min</div>
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest"><LayoutDashboard className="w-4 h-4" /> 100 Qs</div>
                  </div>
                  <button onClick={() => startMarathon(mock.id)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-amber-600 transition-all shadow-lg">Start Now</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'TEST' && activeSession && <TestPortal session={activeSession} onComplete={handleTestComplete} />}
        {view === 'RESULT' && activeSession && <ResultView session={activeSession} onHome={() => setView('HOME')} onRetry={() => startMarathon()} />}
        {view === 'ADMIN' && <div className="animate-in"><AdminPanel /></div>}
      </div>
    </div>
  );
};

export default App;
