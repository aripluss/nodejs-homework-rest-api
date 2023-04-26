const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const {
  schemas: {
    newContactJoiSchema,
    updateContactJoiSchema,
    updateFavoriteSchema,
  },
} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(newContactJoiSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(updateContactJoiSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
