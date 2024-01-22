const { Category } = require(`../models/index`);

class CategoryController {
  static async add(req, res, next) {
    try {
      const { name } = req.body;
      const data = await Category.create({ name });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const data = await Category.findByPk(id);
      if (!data) {
        throw { name: `Error Not Found` };
      }

      await Category.update(
        { name },
        {
          where: { id },
        }
      );
      const newData = await Category.findByPk(id);
      res.status(200).json(newData);
    } catch (error) {
      next(error);
    }
  }

  static async del(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Category.findByPk(id);

      if (!data) {
        throw { name: `Error Not Found` };
      }

      await Category.destroy({
        where: { id },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async template(req, res, next) {
    try {
      res.status(200).json({ message: `Masuk` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
