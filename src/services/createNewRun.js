module.exports.createNewRun = () => {
    console.log('new run!');
    const createRunDataAccess = require('../data-access/couch/runs/createRun');
    createRunDataAccess.createRun();
}
