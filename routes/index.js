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

//added
// console.log(validator.isEmail('kjsdf@sdf'));
// console.log(validator.isLength('notso loong string', 0, 100));
function validate(message) {
  errors = [];
  if (!validator.isLength(message.name, 1, 100)) {
    errors.push(" name must be 1 to 100 characters");
  }
  if (!validator.isLength(message.subject, 1, 100)) {
    errors.push(" subject must be 1 to 100 characters");
  }
  if (!validator.isLength(message.message, 1, 1000)) {
    errors.push(" message must be 1 to 1000 characters");
  }
  if (!validator.isEmail(message.email)) {
    errors.push(" invalid email");
  }
  return errors;
}

//



/* POST email sending */
router.post('/contact', function(req, res) {
  var message = req.body.message;
  var errors = validate(message);
  var locals = {};

  // console.log(errors);

  if (errors.length === 0) {
    var email = new sendgrid.Email({
      to: process.env.EMAIL_RECIPIENT,
      fromname: message.name,
      from: message.email,
      subject: message.subject,
      text: message.message,
    });
    sendgrid.send(email, function(err, json) {
      if (err) {
        // return console.error(err);
        locals.error = 'Error sending message';
        // locals.message = message;
      }
      locals.notice = 'Your message has been sent';
      // console.log(json);
    });
    console.log(locals);
    console.log("The email was sent");
    res.render('contact', { contact: true, result: locals, message: message } );

  } else {
    // console.log(errors);
    locals.notice = 'Your message has errors:';
    locals.errors = errors;
    // locals.message = message;
    console.log("Your message has errors");
    console.log(locals);
    console.log(message);
    res.render('contact', { contact: true, result: locals, message: message } );
    // { contact: true, result: locals, message: message }
  }

});



module.exports = router;
