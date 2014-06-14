
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'AN/PNC-212 SMGR' })
};