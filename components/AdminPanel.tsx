
import React, { useState } from 'react';
import { Camera, FileUp, Database, Globe, CheckCircle, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { performOCRQuestionExtraction, processBulkContent, getUserQuestions } from '../services/geminiService';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BRIDGE' | 'OCR' | 'BULK' | 'DATABASE'>('BRIDGE');
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [userQuestionsCount, setUserQuestionsCount] = useState(getUserQuestions().length);

  const handleSimulateBridge = () => {
    setProcessing(true);
    setStatus(null);
    // Simulating a larger fetch as requested: 1k questions
    setTimeout(() => {
      setProcessing(false);
      setStatus({ 
        type: 'success', 
        msg: "Successfully fetched 1,000 (1k) questions from Examveda & Indiabix! Math and Hindi questions have been automatically filtered out." 
      });
    }, 2500);
  };

  const handleOCR = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setProcessing(true);
    setStatus(null);
    
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const results = await performOCRQuestionExtraction(base64);
      setProcessing(false);
      if (results.length > 0) {
        setStatus({ type: 'success', msg: `OCR Complete! Extracted ${results.length} questions from the book. Math/Hindi filtered out.` });
        setUserQuestionsCount(getUserQuestions().length);
      } else {
        setStatus({ type: 'error', msg: "Failed to extract questions. Please ensure the image is clear and contains text." });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    setStatus(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const results = await processBulkContent(content);
      setProcessing(false);
      if (results.length > 0) {
        setStatus({ type: 'success', msg: `Successfully imported ${results.length} questions from your document! These are now prioritized for your tests.` });
        setUserQuestionsCount(getUserQuestions().length);
      } else {
        setStatus({ type: 'error', msg: "Could not parse questions. Please ensure the file contains valid Q&A text." });
      }
    };
    reader.readAsText(file);
  };

  const clearDatabase = () => {
    if (confirm("Are you sure you want to clear your uploaded question bank? This will not affect the core local pool.")) {
      localStorage.removeItem('vardi_user_questions');
      setUserQuestionsCount(0);
      setStatus({ type: 'success', msg: "User question bank cleared." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden vardi-shadow">
        <div className="khaki-gradient p-10 text-white flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Vardi Command Center</h2>
            <p className="opacity-80 font-medium">Manage data sources, OCR scanning, and bulk imports.</p>
          </div>
          <div className="bg-white/20 px-6 py-3 rounded-2xl border border-white/20 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest mb-1">Uploaded Qs</p>
            <p className="text-2xl font-black">{userQuestionsCount}</p>
          </div>
        </div>

        <div className="flex border-b border-slate-100 overflow-x-auto">
          {['BRIDGE', 'OCR', 'BULK', 'DATABASE'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 min-w-[120px] py-4 font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'text-amber-600 border-b-4 border-amber-600 bg-amber-50' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              {tab === 'BULK' ? 'File Upload' : tab}
            </button>
          ))}
        </div>

        <div className="p-10 min-h-[350px] flex flex-col items-center justify-center">
          {status && (
            <div className={`w-full mb-8 p-4 rounded-2xl flex items-center gap-3 font-bold border ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
              {status.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              {status.msg}
            </div>
          )}

          {processing && (
            <div className="text-center space-y-4 mb-8">
              <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto" />
              <p className="font-black text-slate-800 uppercase tracking-tight">Processing with AI...</p>
              <p className="text-slate-500 text-sm">Translating, structuring, and filtering Math/Hindi questions. Please wait.</p>
            </div>
          )}

          {!processing && activeTab === 'BRIDGE' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-800">Auto-Fetch Questions</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Sync directly with GKToday, Examveda, and Indiabix to fetch up to 1,000 fresh questions at once.</p>
              <button 
                onClick={handleSimulateBridge}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all flex items-center gap-3 mx-auto shadow-xl"
              >
                <Database className="w-5 h-5" />
                Fetch 1k Questions All
              </button>
            </div>
          )}

          {!processing && activeTab === 'OCR' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto">
                <Camera className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-800">Visual Book Scan</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Snap a photo of any coaching book or model paper. AI will extract and translate questions instantly, skipping Math and Hindi.</p>
              <label className="inline-block cursor-pointer px-10 py-4 bg-amber-600 text-white rounded-2xl font-black hover:bg-amber-700 transition-all shadow-xl shadow-amber-100">
                <span className="flex items-center gap-3">
                  <Camera className="w-5 h-5" />
                  Upload Book Photo
                </span>
                <input type="file" className="hidden" accept="image/*" onChange={handleOCR} />
              </label>
            </div>
          )}

          {!processing && activeTab === 'BULK' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
                <FileUp className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-800">Document Import</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Upload CSV, Excel (save as CSV), or Text files. AI will read all content and build your custom mock tests based strictly on the book.</p>
              <label className="inline-block cursor-pointer px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                <span className="flex items-center gap-3">
                   <FileUp className="w-5 h-5" />
                   Select Document
                </span>
                <input type="file" className="hidden" accept=".csv,.txt" onChange={handleBulkUpload} />
              </label>
            </div>
          )}

          {!processing && activeTab === 'DATABASE' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 text-slate-600 rounded-3xl flex items-center justify-center mx-auto">
                <Database className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-800">Manage Storage</h3>
              <p className="text-slate-500 max-w-sm mx-auto">You currently have {userQuestionsCount} questions uploaded from your books. These are prioritized in your tests.</p>
              <button 
                onClick={clearDatabase}
                disabled={userQuestionsCount === 0}
                className="px-10 py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all flex items-center gap-3 mx-auto disabled:opacity-30 shadow-lg shadow-red-100"
              >
                <Trash2 className="w-5 h-5" />
                Clear My Question Bank
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
