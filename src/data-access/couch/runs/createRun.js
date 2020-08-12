const createRun = async () => {
  const cloudantClient = require('../CloudantClientManager');
  const result = await cloudantClient.getCloudantDatabase().list({ include_docs: true });
  console.log(result);
};

module.exports = {
  createRun
};
