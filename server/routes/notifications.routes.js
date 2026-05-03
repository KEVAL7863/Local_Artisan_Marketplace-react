const router = require('express').Router();
const ctrl = require('../controllers/notifications.controller');
const { authenticate } = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.get('/', authenticate, roleGuard('admin'), ctrl.list);
router.patch('/:id/read', authenticate, roleGuard('admin'), ctrl.markRead);
router.patch('/read-all', authenticate, roleGuard('admin'), ctrl.markAllRead);
router.delete('/', authenticate, roleGuard('admin'), ctrl.clearAll);

module.exports = router;
