var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res) {
  res.render('index', { index: true });
});

/* GET contact page */
router.get('/contact', function(req, res) {
  res.render('contact', { contact: true });
});

/* GET gallery page */
router.get('/gallery', function(req, res) {
  res.render('gallery', { gallery: true });
});

/* GET services page */
router.get('/services', function(req, res) {
  res.render('services', { services: true });
});

/* GET faq page */
router.get('/faq', function(req, res) {
  res.render('faq', { faq: true });
});

/* POST email sending */
// router.post('/send-inquiry', function(req, res) {
//   res.send('')
// });

module.exports = router;
