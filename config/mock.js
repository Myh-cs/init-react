const paths = require('./paths');
const mockServer = require('./middleware');

module.exports = function(app){
    mockServer(app, paths.appDirectory + '/mock'); 
}