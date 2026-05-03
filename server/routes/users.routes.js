const router = require('express').Router();
const ctrl = require('../controllers/users.controller');
const { authenticate } = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.get('/', authenticate, roleGuard('admin'), ctrl.list);
router.patch('/:id/status', authenticate, roleGuard('admin'), ctrl.updateStatus);
router.put('/:id/profile', authenticate, ctrl.updateProfile);

module.exports = router;
