const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


function getTotalLikes(request){
  const { id } = request.params;

  const { likes } = repositories.find(project => project.id === id);

  return likes;
}

app.get("/repositories", (request, response) => {
  // TODO -> OK
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  // TODO - OK
  const { title, url, techs } = request.body;

  const project = { id: uuid(), title, url, techs, likes:0 };

  repositories.push(project);

  return response.json(project);

});

app.put("/repositories/:id", (request, response) => {
  // TODO -> OK

  const { id } = request.params;
  const { title, url, techs } = request.body;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found this repositorie'});
  }

  const likes = getTotalLikes(request);

  const project = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[projectIndex] = project;

  return response.json(project);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO -> ok

  const { id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found this repositorie'});
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO -> OK

  const { id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found this repositorie'});
  }

  const {title, url, techs} = repositories.find(project => project.id === id);

  const likes = getTotalLikes(request) + 1;

  const updated_project = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[projectIndex] = updated_project;

  return response.json(updated_project);

});

module.exports = app;
