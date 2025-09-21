import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const SNoteItem = () => {
  const navigate = useNavigate();

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-4 h-4 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {notes.map((note) => (
        <button
          key={note.id}
          onClick={() => navigate(`/snot/${note.id}`)}
          className="w-full text-left p-3 sm:p-4 rounded-xl bg-gray-900/60 
                     hover:bg-gray-800 transition-colors duration-200 text-gray-100"
        >
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            {note.judul}
          </h2>
        </button>
      ))}
    </>
  );
};

export default SNoteItem;