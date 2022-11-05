const httpStatus = require('http-status');
const { Version } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Add a version
 * @param {Object} versionBody
 * @returns {Promise<Version>}
 */
const addVersion = async (versionBody) => {
  if (await Version.isVersionNumberTaken(versionBody.versionNumber)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Version number already taken');
  }
  return Version.create(versionBody);
};

/**
 * Query for versions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryVersions = async (filter, options) => {
  const versions = await Version.paginate(filter, options);
  return versions;
};

/**
 * Get version by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getVersionById = async (id) => {
  return Version.findById(id);
};

/**
 * Update version by id
 * @param {ObjectId} versionId
 * @param {Object} updateBody
 * @returns {Promise<import('../models/version.model').Version>}
 */
const updateVersionById = async (versionId, updateBody) => {
  const version = await getVersionById(versionId);
  if (!version) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Version not found');
  }
  Object.assign(version, updateBody);
  await version.save();
  return version;
};

/**
 * Delete version by id
 * @param {ObjectId} versionId
 * @returns {Promise<Version>}
 */
const deleteVersionById = async (versionId) => {
  const version = await getVersionById(versionId);
  if (!version) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Version not found');
  }
  await version.remove();
  return version;
};

module.exports = {
  addVersion,
  queryVersions,
  getVersionById,
  updateVersionById,
  deleteVersionById,
};
