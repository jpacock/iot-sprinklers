const handleHealthCheck = (req, res) => {
  res.send('OK');
};

module.exports = {
  handleHealthCheck
};
