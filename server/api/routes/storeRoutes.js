'use strict';
var VerifyToken = require('../controllers/auth/VerifyToken');

module.exports = function(app) {
  var storeController = require('../controllers/storeController');
  var authController = require('../controllers/auth/AuthController');

  app.route('/api/login')
    .post(authController.login);


  app.route('/api/admin/stores')
    .post(VerifyToken,storeController.createStore);

  // todoList Routes
  app.route('/api/stores',VerifyToken)
    .get(VerifyToken,storeController.list_all)
    .post(VerifyToken,storeController.createArt);
  app.route('/api/owner')
    .get(VerifyToken,storeController.owner);

  app.route('/api/stores/purchase/:productId')
    .put(VerifyToken,storeController.purchase_a_product);

  app.route('/api/stores/:productId')
    .get(VerifyToken,storeController.read_a_product)
    .put(VerifyToken,storeController.update_a_product)
    .delete(VerifyToken,storeController.delete_a_product);
};
