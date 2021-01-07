import Joi from "joi-browser";
export const description  = {
    description: Joi.string().required()
  };
export const option  = {
    option: Joi.string().required().min(1)
  };  