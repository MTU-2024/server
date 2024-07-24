const { Project } = require("../models");

class ProjectController {
  static async getProject(req, res, next) {
    try {
      const allProject = await Project.findAll();
      res.status(200).json(allProject);
    } catch (err) {
      next(err);
    }
  }

  static async addProject(req, res, next) {
    try {
      const { name, budget, status, start, progress } = req.body;
      const userId = req.userFind.id;
      const project = await Project.create({
        name,
        budget,
        status,
        start,
        progress,
        UserId: userId,
      });
      res.status(201).json({ message: `${project.name} has been created` });
    } catch (err) {
      next(err);
    }
  }

  static async editProject(req, res, next) {
    try {
      const { id } = req.params;
      let project = await Project.findByPk(id);
      if (!project) {
        throw {
          code: 400,
          name: "Bad Request",
          message: `project id ${req.params.id} not found`,
        };
      } else {
        let { name, budget, status, start, progress } = req.body;
        let update = await Project.update(
          {
            name,
            budget,
            status,
            start,
            progress,
          },
          {
            where: {
              id,
            },
          }
        );
        res.status(200).json(update);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteProject(req, res, next) {
    try {
      const { id } = req.params;
      Project.destroy({ where: { id } });
      res.status(200).json({ message: "Project delete success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProjectController;
