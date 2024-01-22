const CategoryController = require("../controllers/CategoryController");
const { authenticationMiddleware } = require("../middlewares/authentication");
const { authorizationAdminOnly } = require("../middlewares/authorizationAdminOnly");

const router = require(`express`).Router();

router.use(authenticationMiddleware);

router.get(`/`, CategoryController.list);

router.post(`/`,authorizationAdminOnly, CategoryController.add);
router.put(`/:id`,authorizationAdminOnly, CategoryController.edit);
router.delete(`/:id`,authorizationAdminOnly, CategoryController.del);

module.exports = router;
