const UserController = require("../controllers/UserController");
const { authenticationMiddleware } = require("../middlewares/authentication");
const { authorizationAdminOnly } = require("../middlewares/authorizationAdminOnly");
const router = require(`express`).Router();


router.post(`/login`, UserController.login);

router.use(authenticationMiddleware);

router.post(`/add-user`, authorizationAdminOnly, UserController.addUser);

module.exports = router;
