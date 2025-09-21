import { useState } from "react";
import NoteAdmin from "../../components/admin/NoteAdmin";
import ProjectAdmin from "../../components/admin/ProjectAdmin";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("note");

  return (
    <section
      className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
    >
      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab("note")}
          className={`px-5 py-2 rounded-xl transition 
            ${activeTab === "note" 
              ? "bg-gray-600 text-white shadow" 
              : "bg-gray-700/40 hover:bg-gray-600/40 text-gray-300"}`}
        >
          Notes
        </button>
        <button
          onClick={() => setActiveTab("project")}
          className={`px-5 py-2 rounded-xl transition 
            ${activeTab === "project" 
              ? "bg-gray-600 text-white shadow" 
              : "bg-gray-700/40 hover:bg-gray-600/40 text-gray-300"}`}
        >
          Projects
        </button>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        {activeTab === "note" && <NoteAdmin />}
        {activeTab === "project" && <ProjectAdmin />}
      </div>
    </section>
  );
};

export default AdminPage;