const Joi = require("joi");

// Field schemas
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net"] },
});

const pin = Joi.number().min(10000).max(999999).required();
const phone = Joi.number().min(400000001).max(500000001).required();

const newPassword = Joi.string().min(3).max(30).required();

const shortStr = Joi.string().min(2).max(50);
const longStr = Joi.string().min(2).max(1000);
const dt = Joi.date();

// Middleware functions
const resetPassReqValidation = (req, res, next) => {
  const schema = Joi.object({ email });

  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const updatePassValidation = (req, res, next) => {
  const schema = Joi.object({ email, pin, newPassword });

  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const createNewTicketValidation = (req, res, next) => {
  const schema = Joi.object({
    subject: shortStr.required(),
    sender: shortStr.required(),
    message: longStr.required(),
    issueDate: dt.optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.json({ status: "error", message: error.message });
  }

  next();
};

const replyTicketMessageValidation = (req, res, next) => {
  const schema = Joi.object({
    sender: shortStr.required(),
    message: longStr.required(),
  });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }

  next();
};

const newUserValidation = (req, res, next) => {
  const schema = Joi.object({
    name: shortStr.required(),
    company: shortStr.required(),
    address: shortStr.required(),
    phone: phone,
    email: shortStr.required(),
    password: shortStr.required(),
  });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }

  next();
};

// Export all functions
module.exports = {
  resetPassReqValidation,
  updatePassValidation,
  createNewTicketValidation,
  replyTicketMessageValidation,
  newUserValidation,
};
