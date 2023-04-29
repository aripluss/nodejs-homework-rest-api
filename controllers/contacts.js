const { Contact } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const contactsList = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  const favoriteContacts = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  );

  if (favorite) {
    res.json(favoriteContacts);
  } else {
    res.json(contactsList);
  }
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId); // .findOne({ _id: contactId });

  if (!contact) throw HttpError(404);

  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const addedContact = await Contact.create({ ...req.body, owner });

  res.status(201).json(addedContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const deletedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner,
  });

  if (!deletedContact) throw HttpError(404);

  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );

  if (!updatedContact) throw HttpError(404);

  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );

  if (!updatedContact) throw HttpError(404);

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
