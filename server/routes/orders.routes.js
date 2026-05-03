const router = require('express').Router();
const ctrl = require('../controllers/orders.controller');
const { authenticate } = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.get('/', authenticate, roleGuard('admin'), ctrl.list);
router.get('/mine', authenticate, roleGuard('artist'), ctrl.listMine);
router.post('/', authenticate, ctrl.create);
router.patch('/:id/status', authenticate, roleGuard('admin', 'artist'), ctrl.updateStatus);

module.exports = router;
