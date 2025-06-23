import Joi from 'joi';

const joiObject = {
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phone number must be a string',
    'string.empty': 'Phone number cannot be empty',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
  }),
  isFavorite: Joi.boolean().default(false).messages({
    'boolean.base': 'IsFavorite must be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required()
    .messages({
      'string.base': 'ContactType must be a string',
      'any.only': 'ContactType must be one of [work, home, personal]',
    }),
};

const updateJoiObject = {
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
  }),
  phoneNumber: Joi.string().messages({
    'string.base': 'Phone number must be a string',
    'string.empty': 'Phone number cannot be empty',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
  }),
  isFavorite: Joi.boolean().default(false).messages({
    'boolean.base': 'IsFavorite must be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .messages({
      'string.base': 'ContactType must be a string',
      'any.only': 'ContactType must be one of [work, home, personal]',
    }),
};

export const contactSchema = Joi.object(joiObject);

export const updateContactSchema = Joi.object(updateJoiObject);
