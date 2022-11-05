const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { versionService } = require('../services');

const addVersion = catchAsync(async (req, res) => {
  const version = await versionService.addVersion(req.body);
  res.status(httpStatus.CREATED).send(version);
});

const getVersions = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await versionService.queryVersions({}, options);
  res.send(result);
});

const getVersion = catchAsync(async (req, res) => {
  const version = await versionService.getVersionById(req.params.versionId);
  if (!version) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Version not found');
  }
  res.send(version);
});

const updateVersion = catchAsync(async (req, res) => {
  const version = await versionService.updateVersionById(req.params.versionId, req.body);
  res.send(version);
});

const deleteVersion = catchAsync(async (req, res) => {
  await versionService.deleteVersionById(req.params.versionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  addVersion,
  getVersions,
  getVersion,
  updateVersion,
  deleteVersion,
};
