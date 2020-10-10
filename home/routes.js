const { Router } = require('express');
const router = Router();
const homeRoutes = require('./services');

router.get('/', homeRoutes.home);
router.post('/calcular', homeRoutes.calcularValor);


module.exports = router;
