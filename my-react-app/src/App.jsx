import { useState } from "react";
import SideBar from "./components/SideBar";
import DiaryEditor from "./components/DiaryEditor";
import Motto from "./components/Motto";
import Scorebar from "./components/Scorebar";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleCreate = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    setShowEditor(false);
  };

  const handleUpdate = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
    setEditingEntry(null);
    setShowEditor(false);
  };

  const handleSelectEntry = (entry) => {
    setEditingEntry(entry);
    setShowEditor(true);
  };

  const handleNewEntry = () => {
    setEditingEntry(null);
    setShowEditor(true);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    setShowEditor(false);
  };

  const handleGoHome = () => {
    setShowEditor(false);
    setEditingEntry(null);
  };

  return (
    <div className="flex flex-row w-full min-h-screen bg-[#F0EEE6]">
      <SideBar 
        entries={entries} 
        onSelectEntry={handleSelectEntry} 
        onNewEntry={handleNewEntry}
        onGoHome={handleGoHome}
      />
      
      <main className="flex-1 p-10 flex flex-col items-center">
        {!showEditor ? (
          <div className="w-full max-w-4xl flex flex-col items-center gap-10">
            <Motto />
            <Scorebar entries={entries} />
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            <DiaryEditor 
              onCreate={handleCreate} 
              onUpdate={handleUpdate} 
              onCancelEdit={handleCancelEdit}
              editingEntry={editingEntry} 
            />
          </div>
        )}
      </main>
    </div>
  );
}
