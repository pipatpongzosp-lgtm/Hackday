import EmotionBar from "./EmotionBar";

const moodConfig = [
  { name: 'happy', label: "มีความสุข(Happy)", color: "bg-yellow-500" },
  { name: 'joy', label: "ตื่นเต้น (Joy)", color: "bg-blue-500" },
  { name: 'strong', label: "สตรอง (Strong)", color: "bg-red-500" },
  { name: 'love', label: "รัก (Love)", color: "bg-pink-500" },
  { name: 'fear', label: "กังวล(Fear)", color: "bg-green-500" },
  { name: 'angry', label: "โกรธ(Angry)", color: "bg-gray-500" },
  { name: 'sad', label: "เศร้า(Sad)", color: "bg-orange-500" },
];

export default function Scorebar({ entries = [] }) {
  const totalEntries = entries.length;

  const calculatePercentage = (moodName) => {
    if (totalEntries === 0) return 0;
    const moodCount = entries.filter((entry) => entry.mood === moodName).length;
    return Math.round((moodCount / totalEntries) * 100);
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Emotion distribution</h2>
        <span className="text-sm font-semibold text-slate-500">Total: {totalEntries} entries</span>
      </div>
      
      <div className="flex flex-col gap-4">
        {moodConfig.map((config) => (
          <EmotionBar 
            key={config.name} 
            name={config.label} 
            score={calculatePercentage(config.name)} 
            color={config.color} 
          />
        ))}
      </div>

      {totalEntries === 0 && (
        <div className="mt-6 text-center text-slate-400 italic">
          Start writing your first diary to see your emotion stats!
        </div>
      )}
    </div>
  );
}
