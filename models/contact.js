const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const phoneRegexp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: [3, "Must be at least 3, got {VALUE}"],
      maxlength: [30, "Must no more than 30, got {VALUE}"],
    },
    email: {
      type: String,
      required: [true, "Set a contact email address"],
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, "Set a contact phone number"],
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const newContactJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(emailRegexp)
    .required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const updateContactJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }).pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean(),
}).or("name", "email", "phone"); // .min(1)

const Contact = model("contact", contactSchema);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  newContactJoiSchema,
  updateContactJoiSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
