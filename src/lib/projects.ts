// Basit dosya tabanlı (JSON) proje kaydı (ileride DB'ye taşınabilir)
import fs from 'fs';
import path from 'path';

export type ProjectProduct = {
  productId: number;
  quantity: number;
  discount: number;
  margin: number;
};

export type Project = {
  id: number;
  name: string;
  products: ProjectProduct[];
};

const projectsFile = path.join(process.cwd(), 'data', 'projects.json');

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsFile)) return [];
  const raw = fs.readFileSync(projectsFile, 'utf-8');
  return JSON.parse(raw);
}

export function saveAllProjects(projects: Project[]) {
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), 'utf-8');
}

export function addProject(name: string, products: ProjectProduct[]): Project {
  const projects = getAllProjects();
  const newProject: Project = {
    id: Date.now(),
    name,
    products,
  };
  projects.push(newProject);
  saveAllProjects(projects);
  return newProject;
}

export function getProjectById(id: number): Project | undefined {
  return getAllProjects().find((p) => p.id === id);
}
