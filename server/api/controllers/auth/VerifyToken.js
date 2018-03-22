var jwt = require('jsonwebtoken');
var config = require('../../../env.json')[process.env.NODE_ENV || 'development'];

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.SECRET, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything good, save to request for use in other routes
    req.client_address = decoded.client_address;
    req.contract_address = decoded.contract_address;
    req.is_admin = decoded.is_admin;
    next();
  });
}

module.exports = verifyToken;