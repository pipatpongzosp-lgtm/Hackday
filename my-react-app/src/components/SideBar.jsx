import { useState } from "react";

export default function SideBar({ entries, onSelectEntry, onNewEntry, onGoHome }) {
  const [filterMood, setFilterMood] = useState("all");

  const moodEmojiMap = {
    happy: "😊",
    sad: "😢",
    fear: "😱",
    strong: "💪",
    angry: "😡",
    love: "🥰",
    joy: "😃",
  };

  const getEmoji = (mood) => moodEmojiMap[mood] || " ";

  const filteredEntries = filterMood === "all" 
    ? entries 
    : entries.filter((entry) => entry.mood === filterMood);

  return (
    <div className="flex flex-col h-screen w-80 bg-[#E3DBCC] shadow-lg">
      <div className="p-4 flex flex-col gap-4">
        <button 
          onClick={onGoHome}
          className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition shadow-md"
        >
          HOME
        </button>

        <div className="flex flex-wrap gap-2 justify-center bg-white/50 p-2 rounded-xl">
          {Object.keys(moodEmojiMap).map((mood) => (
            <button
              key={mood}
              onClick={() => setFilterMood(mood)}
              className={`text-2xl p-2 rounded-lg transition ${
                filterMood === mood ? "bg-amber-400 scale-110" : "hover:bg-amber-200"
              }`}
            >
              {moodEmojiMap[mood]}
            </button>
          ))}
          <button
            onClick={() => setFilterMood("all")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterMood === "all" ? "bg-amber-400 scale-110" : "hover:bg-amber-200"
            }`}
          >
            all
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-2">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => onSelectEntry(entry)}
              className="bg-white p-4 rounded-xl shadow-sm cursor-pointer hover:bg-amber-50 hover:shadow-md transition border-l-4 border-amber-500"
            >
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {new Date(entry.timestamp).toLocaleDateString('th-TH')}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl">{getEmoji(entry.mood)}</span>
                <span className="font-semibold text-slate-700 truncate">
                  {entry.text.substring(0, 20)}...
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-500 mt-10 italic">
            No entries found
          </div>
        )}
      </div>

      <div className="p-4">
        <button 
          onClick={onNewEntry}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"
        >
          <span className="text-2xl">+</span> NEW ENTRY
        </button>
      </div>
    </div>
  );
}
