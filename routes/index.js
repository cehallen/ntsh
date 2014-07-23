var express = require('express');
var router = express.Router();

var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var validator = require('validator');


/* GET home page */
router.get('/', function(req, res) {
  res.render('index', { index: true });
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

/* GET contact page */
router.get('/contact', function(req, res) {
  res.render('contact', { contact: true });
});

// console.log(validator.isEmail('kjsdf@sdf'));
// console.log(validator.isLength('notso loong string', 0, 100));
function validate(message) {
  errors = [];
  if (!validator.isLength(message.name, 0, 100)) {
    errors.push('Name must be 0 to 100 characters');
  }
  if (!validator.isLength(message.subject, 0, 100)) {
    errors.push('Subject must be 0 to 100 characters');
  }
  if (!validator.isLength(message.message, 0, 1000)) {
    errors.push('Message must be 0 to 1000 characters');
  }
  if (!validator.isEmail(message.email)) {
    errors.push('Invalid email');
  }
}

// ADDED
  /* POST email sending */
  router.post('/contact-send', function(req, res) {
    var message = req.body.message;
    var email = new sendgrid.Email({
      to: process.env.EMAIL_RECIPIENT,
      fromname: message.name,
      from: message.email,
      subject: message.subject,
      text: message.message
    });
    sendgrid.send(email, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
    });
    res.redirect('/');
  });



module.exports = router;
