const CuisineController = require("../controllers/CuisineController");
const { authenticationMiddleware } = require("../middlewares/authentication");
const { authorizationCuisine } = require("../middlewares/authorizationCuisine");
const router = require(`express`).Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authenticationMiddleware);

router.post(`/`, CuisineController.add);
router.get(`/`, CuisineController.list);
router.get(`/:id`, CuisineController.detail);

router.put(`/:id`, authorizationCuisine, CuisineController.edit);
router.delete(`/:id`, authorizationCuisine, CuisineController.del);
router.patch(
  `/:id/image`,
  authorizationCuisine,
  upload.single(`imgUrl`),
  CuisineController.patchImage
);

module.exports = router;
