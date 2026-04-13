import { createContext, useContext, useState, useCallback } from "react";
import { projectAPI } from "../services/api";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await projectAPI.getAll();
      setProjects(data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (body) => {
    const data = await projectAPI.create(body);
    setProjects((prev) => [data.data, ...prev]);
    return data.data;
  };

  const updateProject = async (id, body) => {
    const data = await projectAPI.update(id, body);
    setProjects((prev) => prev.map((p) => (p._id === id ? data.data : p)));
    return data.data;
  };

  const deleteProject = async (id) => {
    await projectAPI.delete(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
