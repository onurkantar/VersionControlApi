const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const addVersion = {
  body: Joi.object().keys({
    versionNumber: Joi.string().required(),
    applicationType: Joi.string().required(),
    fileUrl: Joi.string().required(),
  }),
};

const getVersions = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getVersion = {
  params: Joi.object().keys({
    versionId: Joi.string().custom(objectId),
  }),
};

const updateVersion = {
  params: Joi.object().keys({
    versionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      versionNumber: Joi.string().email(),
      fileUrl: Joi.string().custom(password),
    })
    .min(1),
};

const deleteVersion = {
  params: Joi.object().keys({
    versionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addVersion,
  getVersions,
  getVersion,
  updateVersion,
  deleteVersion,
};
