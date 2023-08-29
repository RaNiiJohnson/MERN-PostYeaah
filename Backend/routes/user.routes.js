const router = require("express").Router();
const userRoutes = require("../controllers/user.controller");
const requireAuth = require("../middleware/auth.middleware");

router.get("/", userRoutes.getUser);
router.post("/signup", userRoutes.signup);
router.post("/login", userRoutes.login);
// router.post("/logout", userRoutes.logout);
router.get("/currentUser", requireAuth, userRoutes.getCurrentUser);
module.exports = router;
