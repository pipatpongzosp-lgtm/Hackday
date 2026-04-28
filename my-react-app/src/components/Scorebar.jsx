import EmotionBar from "./EmotionBar";

const moodConfig = [
  { name: 'happy', label: "มีความสุข(Happy)", color: "bg-yellow-400", emoji: "😊" },
  { name: 'joy', label: "ตื่นเต้น (Joy)", color: "bg-blue-400", emoji: "😃" },
  { name: 'strong', label: "สตรอง (Strong)", color: "bg-red-400", emoji: "💪" },
  { name: 'love', label: "รัก (Love)", color: "bg-pink-400", emoji: "🥰" },
  { name: 'fear', label: "กังวล(Fear)", color: "bg-green-400", emoji: "😱" },
  { name: 'angry', label: "โกรธ(Angry)", color: "bg-gray-400", emoji: "😡" },
  { name: 'sad', label: "เศร้า(Sad)", color: "bg-orange-400", emoji: "😢" },
];

const CombinedBar = ({ entries }) => {
  const total = entries.length;
  if (total === 0) return null;

  return (
    <div className="w-full h-10 flex rounded-2xl overflow-hidden shadow-inner bg-slate-100 mb-8 border border-slate-200">
      {moodConfig.map((config) => {
        const count = entries.filter(e => e.mood === config.name).length;
        const percent = (count / total) * 100;
        if (percent === 0) return null;
        return (
          <div
            key={config.name}
            className={`${config.color} h-full transition-all duration-500 flex items-center justify-center text-xs font-bold text-white overflow-hidden`}
            style={{ width: `${percent}%` }}
            title={`${config.label}: ${Math.round(percent)}%`}
          >
            {percent > 5 && <span>{config.emoji}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default function Scorebar({ entries = [] }) {
  const today = new Date().toLocaleDateString('th-TH');
  const todayEntries = entries.filter(entry => 
    new Date(entry.timestamp).toLocaleDateString('th-TH') === today
  );

  const displayEntries = todayEntries.length > 0 ? todayEntries : entries;
  const isToday = todayEntries.length > 0;
  
  const totalEntries = displayEntries.length;

  const calculatePercentage = (moodName) => {
    if (totalEntries === 0) return 0;
    const moodCount = displayEntries.filter((entry) => entry.mood === moodName).length;
    return Math.round((moodCount / totalEntries) * 100);
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            {isToday ? "Today's Mood Distribution" : "Overall Emotion stats"}
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            {isToday ? "How you've been feeling today" : "Summary of all your entries"}
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-slate-400 block uppercase tracking-widest">Total</span>
          <span className="text-2xl font-black text-slate-800">{totalEntries}</span>
        </div>
      </div>

      <CombinedBar entries={displayEntries} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {moodConfig.map((config) => (
          <EmotionBar 
            key={config.name} 
            name={config.label} 
            score={calculatePercentage(config.name)} 
            color={config.color} 
          />
        ))}
      </div>

      {entries.length === 0 && (
        <div className="mt-6 text-center text-slate-400 italic bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
          "Every feeling is a step towards understanding yourself."
          <br/>
          <span className="mt-2 block font-bold text-slate-300">— Start writing to see your stats —</span>
        </div>
      )}
    </div>
  );
}
