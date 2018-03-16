'use strict';
module.exports = function(app) {
  var storeController = require('../controllers/storeController');

  // todoList Routes
  app.route('/api/stores')
    .get(storeController.list_all)
    .post(storeController.createArt);
  app.route('/api/owner')
    .get(storeController.owner);

  app.route('/api/stores/purchase/:productId')
    .put(storeController.purchase_a_product);

  app.route('/api/stores/:productId')
    .get(storeController.read_a_product)
    .put(storeController.update_a_product)
    .delete(storeController.delete_a_product);
};
