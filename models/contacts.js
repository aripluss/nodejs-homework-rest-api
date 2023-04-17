const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsData = await fs.readFile(contactsPath);
  return JSON.parse(contactsData);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const foundContact = allContacts.find((contact) => contact.id === contactId);
  return foundContact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const idxOfContactToRemove = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (idxOfContactToRemove === -1) return null;
  const [contactToRemove] = allContacts.splice(idxOfContactToRemove, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return contactToRemove;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { ...body, id: nanoid() };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const idxOfContactToUpdate = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (idxOfContactToUpdate === -1) return null;
  allContacts[idxOfContactToUpdate] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[idxOfContactToUpdate];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
