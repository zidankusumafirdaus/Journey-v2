import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject, updateProject, deleteProject } from "../../utils/api";
import { useState } from "react";

const ProjectAdmin = () => {
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const emptyForm = {
    judul: "",
    deskripsi: "",
    foto: "",
    teknologi: "",
    tahun: "",
    bulan: "",
    tanggal: "",
    link: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const mutationCreate = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      setForm(emptyForm);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      setEditId(null);
      setForm(emptyForm);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries(["projects"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      teknologi: form.teknologi
        ? form.teknologi.split(",").map((t) => t.trim())
        : [],
    };

    if (editId) {
      mutationUpdate.mutate({ id: editId, data: payload });
    } else {
      mutationCreate.mutate(payload);
    }
  };

  if (isLoading) return <p className="text-gray-400">Loading projects...</p>;

  return (
    <div className="p-4 sm:p-6 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="text"
          placeholder="Foto URL"
          value={form.foto}
          onChange={(e) => setForm({ ...form, foto: e.target.value })}
          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="text"
          placeholder="Teknologi"
          value={form.teknologi}
          onChange={(e) => setForm({ ...form, teknologi: e.target.value })}
          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="url"
          placeholder="Link Project"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="number"
          placeholder="Tahun"
          value={form.tahun}
          onChange={(e) => setForm({ ...form, tahun: e.target.value })}
          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="number"
          placeholder="Bulan"
          value={form.bulan}
          onChange={(e) => setForm({ ...form, bulan: e.target.value })}
          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="number"
          placeholder="Tanggal"
          value={form.tanggal}
          onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          className="col-span-1 sm:col-span-2 w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/60 text-gray-100 
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 w-full py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-gray-600 to-gray-500 
          text-white font-medium tracking-wide shadow-md hover:opacity-90 transition"
        >
          {editId ? "Update Project" : "Create Project"}
        </button>
      </form>

      {/* List */}
      <ul className="space-y-3">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center 
            bg-gray-900/60 p-3 sm:p-4 rounded-xl border border-gray-700"
          >
            <span className="text-gray-200 mb-2 sm:mb-0">{project.judul}</span>
            <div className="flex flex-wrap gap-2 sm:space-x-2">
              <button
                onClick={() => {
                  setEditId(project.id);
                  setForm({
                    judul: project.judul,
                    deskripsi: project.deskripsi,
                    foto: project.foto,
                    teknologi: Array.isArray(project.teknologi)
                      ? project.teknologi.join(", ")
                      : project.teknologi || "",
                    tahun: project.tahun,
                    bulan: project.bulan,
                    tanggal: project.tanggal,
                    link: project.link || "",
                  });
                }}
                className="px-3 py-1.5 rounded-lg bg-yellow-500/90 hover:bg-yellow-500 text-white text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => mutationDelete.mutate(project.id)}
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

export default ProjectAdmin;