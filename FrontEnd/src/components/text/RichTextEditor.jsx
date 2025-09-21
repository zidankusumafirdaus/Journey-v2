import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // simpan isi dalam bentuk HTML
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-900/70 text-gray-100">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-700 text-xs sm:text-sm md:text-base">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded transition ${
            editor.isActive("bold") ? "bg-gray-600 text-white" : "bg-gray-800 hover:bg-gray-700"
          }`}
          type="button"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded transition ${
            editor.isActive("italic") ? "bg-gray-600 text-white" : "bg-gray-800 hover:bg-gray-700"
          }`}
          type="button"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded transition ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-600 text-white" : "bg-gray-800 hover:bg-gray-700"
          }`}
          type="button"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded transition ${
            editor.isActive("bulletList") ? "bg-gray-600 text-white" : "bg-gray-800 hover:bg-gray-700"
          }`}
          type="button"
        >
          • List
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[150px] text-sm sm:text-base md:text-lg leading-relaxed"
      />
    </div>
  );
};

export default RichTextEditor;