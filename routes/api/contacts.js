const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  validateBody(contactSchema, "missing required name field"),
  ctrl.addContact
);

router.delete("/:contactId", ctrl.deleteContact);

router.put(
  "/:contactId",
  validateBody(contactSchema, "missing fields"),
  ctrl.updateContact
);

module.exports = router;
