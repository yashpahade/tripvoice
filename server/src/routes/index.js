const express = require('express');
const router = express.Router();

const modules = [
  'auth', 'users', 'flights', 'hotels', 'buses', 'trains', 
  'packages', 'cabs', 'offers', 'bookings', 'payments', 
  'admin', 'autosuggest', 'blog', 'cms', 'wallet', 'enquiries', 'coupons'
];

modules.forEach(moduleName => {
  const moduleRouter = express.Router();
  moduleRouter.get('/', (req, res) => {
    res.json({ success: true, message: `${moduleName} routes coming soon` });
  });
  router.use(`/${moduleName}`, moduleRouter);
});

module.exports = router;
