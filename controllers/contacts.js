const { Contact } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const contactsList = await Contact.find({}, "-createdAt -updatedAt");
  res.json(contactsList);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId); // .findOne({ _id: contactId });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const addedContact = await Contact.create(req.body);
  res.status(201).json(addedContact);
};

const deleteContact = async (req, res) => {
  const deletedContact = await Contact.findByIdAndRemove(
    // .findByIdAndDelete()
    req.params.contactId
  );
  if (!deletedContact) throw HttpError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!updatedContact) throw HttpError(404, "Not found");
  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
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
  updateFavorite: ctrlWrapper(updateFavorite),
};
