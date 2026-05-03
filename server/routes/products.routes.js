const router = require('express').Router();
const ctrl = require('../controllers/products.controller');
const { authenticate } = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');

router.get('/', ctrl.list);
router.get('/mine', authenticate, roleGuard('artist'), ctrl.listMine);
router.post('/', authenticate, roleGuard('artist'), ctrl.create);
router.put('/:id', authenticate, roleGuard('artist', 'admin'), ctrl.update);
router.delete('/:id', authenticate, roleGuard('artist', 'admin'), ctrl.remove);

module.exports = router;
