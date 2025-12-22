
import React from 'react';

interface TopicCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, icon, color, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl border border-slate-200 p-5 vardi-shadow hover:border-amber-400 transition-all active:scale-95"
    >
      <div className={`w-12 h-12 ${color} text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
};

export default TopicCard;
