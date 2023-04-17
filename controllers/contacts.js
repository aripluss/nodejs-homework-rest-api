const contactsOperations = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const contactsList = await contactsOperations.listContacts();
  res.json(contactsList);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const addedContact = await contactsOperations.addContact(req.body);
  res.status(201).json(addedContact);
};

const deleteContact = async (req, res) => {
  const deletedContact = await contactsOperations.removeContact(
    req.params.contactId
  );
  if (!deletedContact) throw HttpError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const updatedContact = await contactsOperations.updateContact(
    req.params.contactId,
    req.body
  );
  if (!updatedContact) throw HttpError(404, "Not found");
  res.json(updatedContact);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
