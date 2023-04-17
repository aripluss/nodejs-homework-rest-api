const express = require("express");
const Joi = require("joi");

const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contactsOperations.listContacts();
    res.json(contactsList);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, "missing required name field");
    const addedContact = await contactsOperations.addContact(req.body);
    res.status(201).json(addedContact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deletedContact = await contactsOperations.removeContact(
      req.params.contactId
    );
    if (!deletedContact) throw HttpError(404, "Not found");
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, "missing fields");
    const updatedContact = await contactsOperations.updateContact(
      req.params.contactId,
      req.body
    );
    if (!updatedContact) throw HttpError(404, "Not found");
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
