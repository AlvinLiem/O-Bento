const { Cuisine, User } = require(`../models/index`);
const { Op } = require(`sequelize`);
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class CuisineController {
  static async add(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
      const data = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId: req.user.id,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const data = await Cuisine.findAll({
        include: {
          model: User,
          attributes: { exclude: ["password"] },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: `Error Not Found` };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, categoryId } = req.body;
      const data = await Cuisine.findByPk(id);

      if (!data) {
        throw { name: "Error Not Found" };
      }

      await Cuisine.update(
        { name, description, price, imgUrl, categoryId, authorId: req.user.id },
        {
          where: { id },
        }
      );
      const newData = await Cuisine.findByPk(id);
      res.status(200).json(newData);
    } catch (error) {
      next(error);
    }
  }

  static async del(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: `Error Not Found` };
      }
      await Cuisine.destroy({
        where: { id },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async listPublic(req, res, next) {
    try {
      const { search, filter, sort, pageNumber } = req.query;

      const paramQuerySQL = { where: [] };

      if (search !== "" && typeof search !== "undefined") {
        paramQuerySQL.where.push({ name: { [Op.iLike]: `%${search}%` } });
      }

      if (filter !== "" && typeof filter !== "undefined") {
        paramQuerySQL.where.push({ categoryId: { [Op.eq]: filter } });
      }

      if (sort !== "" && typeof sort !== "undefined") {
        if (sort.toLowerCase() === "asc" || sort.toLowerCase() === "desc") {
          let query = [["createdAt", sort]];

          paramQuerySQL.order = query;
        }
      }

      let limit = 10;
      let offset = 0;
      paramQuerySQL.limit = limit;
      paramQuerySQL.offset = offset;

      if (pageNumber !== "" && typeof pageNumber !== "undefined") {
        offset = pageNumber * limit - limit;
        paramQuerySQL.offset = offset;
      }

      const { count, rows } = await Cuisine.findAndCountAll(paramQuerySQL);

      console.log(count);
      res.status(200).json({ count, rows });
    } catch (error) {
      next(error);
    }
  }

  static async detailPublic(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: `Error Not Found` };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async patchImage(req, res, next) {
    try {
      console.log(req.file);
      const { id } = req.params;
      const data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: `Error Not Found` };
      }

      if (!req.file) {
        throw { name: "Image is required" };
      }

      const dataToUpload = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      const uploadFile = await cloudinary.uploader.upload(dataToUpload, {
        public_id: req.file.originalname,
        folder: "P2-C1",
        resource_type: "auto",
      });

      await data.update({ imgUrl: uploadFile.secure_url });

      res.status(200).json({ message: `Image ${data.name} success to update` });
    } catch (error) {
      next(error);
    }
  }

  static async template(req, res, next) {
    try {
      res.status(200).json({ message: `masuk` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CuisineController;
