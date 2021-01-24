const fs = require("fs");
const path = require("path");

const projectsFileLocation = path.join(__dirname, "projects.json");

const loadProjects = () => {
  const projectsAsString = fs.readFileSync(projectsFileLocation).toString();
  const { projects } = JSON.parse(projectsAsString);

  return projects;
};

const addProject = (project) => {
  const projects = loadProjects();

  const newProjects = [project, ...projects];
  const newProjectsAsString = JSON.stringify({
    projects: newProjects,
  });

  fs.writeFileSync(projectsFileLocation, newProjectsAsString);
};

module.exports = { loadProjects, addProject };
