/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', {
    message: 'Welcome to CalDiagram!'
  });
};