var express = require('express');
var router = express.Router();
var controlDashboards = require('../controllers/dashboards');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GETS or POSTS on Dashboard pages */
router.get('/dashboard/user', controlDashboards.displayUserDashboard);
router.get('/dashboard/admin', controlDashboards.displayAdminDashboard);
router.post('/dashboard/user', controlDashboards.newOrder);
router.post('/dashboard/admin/update_order/:order_id', controlDashboards.updateOrder);
module.exports = router;
