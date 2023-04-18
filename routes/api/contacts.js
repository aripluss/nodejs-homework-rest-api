const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { newContactSchema, updateContactSchema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  validateBody(newContactSchema, "missing required name field"),
  ctrl.addContact
);

router.delete("/:contactId", ctrl.deleteContact);

router.put(
  "/:contactId",
  validateBody(updateContactSchema, "missing fields"),
  ctrl.updateContact
);

module.exports = router;
