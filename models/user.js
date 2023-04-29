const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: [6, "Must be at least 6 characters long, got {VALUE}"],
      maxlength: [30, "Must no more than 30 characters, got {VALUE}"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerJoiSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(30)
    .email({ minDomainSegments: 2 })
    .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(8).max(30).required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(30)
    .email({ minDomainSegments: 2 })
    .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(8).max(30).required(),
});

const updateSubscriptionJoiSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const schemas = {
  registerJoiSchema,
  loginJoiSchema,
  updateSubscriptionJoiSchema,
};

module.exports = { User, schemas };