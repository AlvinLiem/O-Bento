const router = require(`express`).Router();

router.use(`/pub`, require(`./pubRoutes`));
router.use(`/`, require(`./userRoutes`));
router.use(`/cuisines`, require(`./cuisineRoutes`));
router.use(`/categories`, require(`./categoryRoutes`));

module.exports = router;
