const EmotionBar = ({ name, score, color }) => {
  return (
    <div className="flex flex-col mb-4 w-full">
      <div className="flex justify-between items-center mb-1.5 px-1">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{name}</span>
        <span className="text-xs font-black text-slate-400">{score}%</span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
        <div 
          className={`${color} h-full transition-all duration-700 ease-out rounded-full`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EmotionBar;

