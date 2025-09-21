import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../utils/api";
import QuestCard from "./QuestCard";

const QuestList = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <p className="text-center text-gray-400 py-12">
        Belum ada project.
      </p>
    );
  }

  // 🔽 Urutkan berdasarkan tanggal (terbaru ke terlama)
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.tahun, a.bulan - 1, a.tanggal);
    const dateB = new Date(b.tahun, b.bulan - 1, b.tanggal);
    return dateB - dateA; // descending (terbaru dulu)
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {sortedProjects.map((project, index) => (
        <QuestCard key={index} project={project} />
      ))}
    </div>
  );
};

export default QuestList;