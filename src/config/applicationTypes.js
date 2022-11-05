const allApplicationTypes = {
  mobile: ['mobile'],
  service: ['service'],
};

const applications = Object.keys(allApplicationTypes);
const applicationTypes = new Map(Object.entries(allApplicationTypes));

module.exports = {
  applicationTypes,
  applications,
};
