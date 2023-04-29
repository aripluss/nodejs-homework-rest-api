const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemas.registerJoiSchema),
  ctrl.register
);

// signin
router.post("/login", validateBody(schemas.loginJoiSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionJoiSchema),
  ctrl.updateSubscription
);

module.exports = router;
