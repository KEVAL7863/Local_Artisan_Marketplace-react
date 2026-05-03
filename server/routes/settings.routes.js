const router = require('express').Router();
const ctrl = require('../controllers/settings.controller');
const { authenticate } = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.get('/', authenticate, roleGuard('admin'), ctrl.get);
router.put('/', authenticate, roleGuard('admin'), ctrl.update);

module.exports = router;
