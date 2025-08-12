const Joi = require("joi");

const productSchema = Joi.object({
  productName: Joi.string().required().trim().min(1).messages({
    "string.base": "productName must be a string",
    "any.required": "productName is required",
    "string.empty": "productName is not allowed to be empty",
    "string.min": "productName must not be blank or just spaces"
  }),

  category: Joi.string().required().trim().min(1).messages({
    "string.base": "category must be a string",
    "any.required": "category is required",
    "string.empty": "category is not allowed to be empty",
    "string.min": "category must not be blank or just spaces"
  }),

  type: Joi.string().valid("weight", "quantity").required().messages({
    "any.only": "type must be either 'weight' or 'quantity'",
    "any.required": "type is required"
  }),

  benefits: Joi.array().items(
    Joi.string().required().trim().min(1).messages({
      "string.base": "Each benefit must be a string",
      "string.empty": "benefit must not be empty",
      "string.min": "benefit must not be blank or just spaces"
    })
  ).messages({
    "array.base": "benefits must be an array"
  }),

  productVideo: Joi.array().items(
    Joi.string().uri().required().messages({
      "string.uri": "Each productVideo must be a valid URI",
      "any.required": "productVideo URL is required"
    })
  ).messages({
    "array.base": "productVideo must be an array"
  }),

 variant: Joi.array().min(1).items(
  Joi.object({
    price: Joi.number().required().messages({
      "number.base": "price must be a number",
      "any.required": "price is required"
    }),

    discountPrice: Joi.number().optional().messages({
      "number.base": "discountPrice must be a number"
    }),

    label: Joi.array().items(
      Joi.string().trim().min(1).messages({
        "string.base": "Each label must be a string",
        "string.empty": "Each label must not be empty",
        "string.min": "Each label must not be just spaces"
      })
    ).min(1).required().messages({
      "array.base": "label must be an array",
      "array.min": "label must contain at least one item",
      "any.required": "label field is required"
    }),

    image: Joi.array().items(
      Joi.string().uri().required().messages({
        "string.uri": "Each image must be a valid URI",
        "any.required": "image URL is required"
      })
    ).min(1).required().messages({ // <-- ✅ ADD required here
      "array.base": "image must be an array",
      "array.min": "image must contain at least one item",
      "any.required": "image field is required"
    }),

    stock: Joi.number().required().messages({
      "number.base": "stock must be a number",
      "any.required": "stock is required"
    }),

    atribut: Joi.object({
      weight: Joi.string().trim().min(1).optional().messages({
        "string.base": "weight must be a string",
        "string.min": "weight must not be blank or just spaces"
      }),
      quantity: Joi.number().optional().messages({
        "number.base": "quantity must be a number"
      })
    }).required().messages({ // <-- ✅ ADD required here
      "object.base": "atribut must be an object",
      "any.required": "atribut is required"
    }),

    isActive: Joi.boolean().optional()
  })
).required().messages({
  "array.base": "variant must be an array",
  "array.min": "variant must contain at least one variant",
  "any.required": "variant is required"
}),

  instock: Joi.string().valid("in stock", "out of stock").required().messages({
    "any.only": "instock must be either 'in stock' or 'out of stock'",
    "any.required": "instock is required"
  }),

  isActive: Joi.boolean().optional(),

  certificate: Joi.object({
    fssai: Joi.boolean().optional(),
    iso: Joi.boolean().optional(),
    gmp: Joi.boolean().optional()
  }).messages({
    "object.base": "certificate must be an object"
  }),

  slug: Joi.string().optional().trim().min(1).messages({
    "string.base": "slug must be a string",
    "string.min": "slug must not be blank or just spaces"
  }),

  totalSell: Joi.number().optional().messages({
    "number.base": "totalSell must be a number"
  })
});

module.exports = productSchema;
