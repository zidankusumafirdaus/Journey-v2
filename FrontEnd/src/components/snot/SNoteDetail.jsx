import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../utils/api";

const SNoteDetail = () => {
  const { id } = useParams();

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!note) return <p className="text-gray-200 p-6">Note tidak ditemukan.</p>;

  return (
    <article className="rounded-2xl bg-gray-900/60 border border-gray-700 shadow-lg p-4 sm:p-6 md:p-8">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-100">
        {note.judul}
      </h1>

      {/* Photo */}
      {note.foto && (
        <div className="relative rounded-xl overflow-hidden border border-gray-700 mb-6">
          <img
            src={note.foto}
            alt={note.judul}
            className="w-full max-h-80 sm:max-h-96 object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-xl
                        bg-gradient-to-b from-black/30 via-transparent to-black/30"
          />
        </div>
      )}

      {/* Typography Text */}
      <div className="prose prose-invert max-w-none text-sm sm:text-base md:text-lg leading-relaxed break-words whitespace-pre-wrap">
        <div dangerouslySetInnerHTML={{ __html: note.text }} />
      </div>
    </article>
  );
};

export default SNoteDetail;