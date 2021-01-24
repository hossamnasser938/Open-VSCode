const program = require("commander");
const { prompt } = require("inquirer");
const { exec } = require("child_process");
const { loadProjects, addProject } = require("./utils");

program.version("0.0.0").description("opens projects through vscode");

program
  .command("list")
  .alias("l")
  .description("lists all current projects to open")
  .action(() => {
    const projects = loadProjects();
    const projectsNames = projects.map((project) => project.name);

    prompt([
      {
        type: "list",
        message: "Choose a project to open",
        name: "selectedProjectName",
        choices: projectsNames,
      },
    ]).then(({ selectedProjectName }) => {
      console.log("opening project ...");
      const selectedProject = projects.find(
        (project) => project.name === selectedProjectName
      );
      exec(`code ${selectedProject.location}`);
    });
  });

program
  .command("add")
  .alias("a")
  .description("adds a current project")
  .action(() => {
    prompt([
      {
        name: "name",
        message: "Project name:",
      },
      {
        name: "location",
        message: "Project location:",
      },
    ]).then(({ name, location }) => {
      addProject({ name, location });
      console.log("Project added successfully");
    });
  });

program.parse(process.argv);
