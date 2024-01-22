const { Cuisine } = require(`../models/index`);

async function authorizationCuisine(req, res, next) {
  try {
    const { id } = req.params;

    const dataCuisine = await Cuisine.findByPk(id);

    if (req.user.role === `Staff`) {
      if (req.user.id !== dataCuisine.authorId) {
        throw { name: `Forbidden Access` };
      }
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authorizationCuisine,
};
