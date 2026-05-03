const router = require('express').Router();
const ctrl = require('../controllers/approvals.controller');
const { authenticate } = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.get('/', authenticate, roleGuard('admin'), ctrl.list);
router.patch('/:id', authenticate, roleGuard('admin'), ctrl.updateStatus);

module.exports = router;
