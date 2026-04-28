import { useState } from "react";

export default function SideBar({ entries, onSelectEntry, onNewEntry, onGoHome, onDelete }) {
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
              className="group relative bg-white p-4 rounded-xl shadow-sm cursor-pointer hover:bg-amber-50 hover:shadow-md transition border-l-4 border-amber-500 flex justify-between items-center"
              onClick={() => onSelectEntry(entry)}
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  {new Date(entry.timestamp).toLocaleDateString('th-TH')}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl">{getEmoji(entry.mood)}</span>
                  <span className="font-semibold text-slate-700 truncate block">
                    {entry.text.substring(0, 15)}...
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation(); // ป้องกันไม่ให้ไป trigger onSelectEntry
                  onDelete(entry.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-opacity duration-200"
                title="ลบบันทึก"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
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
