const getCloudantServer = () => {
  const Cloudant = require('@cloudant/cloudant');
  const dbUser = process.env.CLOUDANT_USER;
  const dbPass = process.env.CLOUDANT_PASSWORD;
  console.log(dbPass);
  return Cloudant({ account: dbUser, password: dbPass });
};

const getCloudantDatabase = () => {
  const cloudant = getCloudantServer();
  const db = process.env.CLOUDANT_DB;
  return cloudant.use(db);
};

module.exports = {
  getCloudantServer,
  getCloudantDatabase
};
