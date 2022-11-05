const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { applications } = require('../config/applicationTypes');

const versionSchema = mongoose.Schema(
  {
    applicationType: {
      type: String,
      enum: applications,
      default: 'mobile',
    },
    versionNumber: {
      type: String,
      required: true,
      unique: true,
    },
    fileUrl: {
      type: String,
      required: true,
      validate(value) {
        if (!value.match(/\d/)) {
          throw new Error('invalid file url');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
versionSchema.plugin(toJSON);
versionSchema.plugin(paginate);

/**
 * Check if version number is taken
 * @param {string} versionNumber - The version's number
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
versionSchema.statics.isVersionNumberTaken = async function (versionNumber, excludeUserId) {
  const version = await this.findOne({ versionNumber, _id: { $ne: excludeUserId } });
  return !!version;
};

/**
 * Check if password matches the user's password
 * @param {string} versionNumber
 * @returns {Promise<boolean>}
 */
versionSchema.methods.isVersionNumberMatch = async function (versionNumber) {
  const version = this;
  return bcrypt.compare(versionNumber, version.number);
};

versionSchema.pre('save', async function (next) {
  const version = this;
  if (version.isModified('number')) {
    version.number = await bcrypt.hash(version.number, 8);
  }
  next();
});

/**
 * @typedef Version
 */
const Version = mongoose.model('Version', versionSchema);

module.exports = Version;
