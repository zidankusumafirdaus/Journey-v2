import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, createNote, updateNote, deleteNote } from "../../utils/api";
import { useState } from "react";

// Tiptap imports
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const NoteAdmin = () => {
  const queryClient = useQueryClient();
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const [form, setForm] = useState({ judul: "", foto: "", text: "" });
  const [editId, setEditId] = useState(null);

  // Editor setup
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: form.text,
    onUpdate: ({ editor }) => {
      setForm((prev) => ({ ...prev, text: editor.getHTML() }));
    },
  });

  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      setForm({ judul: "", foto: "", text: "" });
      editor?.commands.clearContent();
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }) => updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      setEditId(null);
      setForm({ judul: "", foto: "", text: "" });
      editor?.commands.clearContent();
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      mutationUpdate.mutate({ id: editId, data: form });
    } else {
      mutationCreate.mutate(form);
    }
  };

  if (isLoading) return <p className="text-gray-400">Loading notes...</p>;

  return (
    <div className="p-6 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="text"
          placeholder="Foto URL"
          value={form.foto}
          onChange={(e) => setForm({ ...form, foto: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Editor */}
        <div className="rounded-xl bg-gray-900/60 text-gray-100 p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { cmd: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold"), label: "B" },
              { cmd: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic"), label: "I", italic: true },
              { cmd: () => editor?.chain().focus().toggleUnderline().run(), active: editor?.isActive("underline"), label: "U", underline: true },
              { cmd: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }), label: "H2" },
              { cmd: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList"), label: "• List" },
            ].map((btn, i) => (
              <button
                key={i}
                type="button"
                onClick={btn.cmd}
                className={`px-3 py-1 rounded-lg text-sm transition 
                  ${btn.active ? "bg-gray-600 text-white" : "bg-gray-700 hover:bg-gray-600"} 
                  ${btn.italic ? "italic" : ""} ${btn.underline ? "underline" : ""}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <EditorContent editor={editor} className="prose prose-invert max-w-none min-h-[150px]" />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gray-600 to-gray-500 
          text-white font-medium tracking-wide shadow-md hover:opacity-90 transition"
        >
          {editId ? "Update Note" : "Create Note"}
        </button>
      </form>

      {/* List */}
      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center 
                      bg-gray-900/60 p-4 rounded-xl border border-gray-700"
          >
            {/* Judul */}
            <span className="text-gray-200 font-medium mb-3 sm:mb-0">
              {note.judul}
            </span>

            {/* Tombol */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditId(note.id);
                  setForm({ judul: note.judul, foto: note.foto, text: note.text });
                  editor?.commands.setContent(note.text);
                }}
                className="px-3 py-1.5 rounded-lg bg-yellow-500/90 hover:bg-yellow-500 text-white text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => mutationDelete.mutate(note.id)}
                className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteAdmin;