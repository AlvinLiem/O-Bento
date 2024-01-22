const CuisineController = require("../controllers/CuisineController");
const router = require(`express`).Router();

router.get(`/cuisines`, CuisineController.listPublic);
router.get(`/cuisines/:id`, CuisineController.detailPublic);

module.exports = router;
