"use strict";

var Zencoder = require('zencoder');
var client = Zencoder('10b0f8afd69c10af47c29542329a4c19');
var router = vulpejs.express.router;

router.all('*', vulpejs.routes.auth.check);

router.get('/', function(req, res) {
  vulpejs.routes.render(res, 'index', {
    ui: {
      controller: 'Index'
    }
  });
});

router.get('/job/create/:url', function(req, res) {
  client.Job.create({
    // input: 'http://s3.amazonaws.com/zencodertesting/test.mov'
    input: req.params.url
  }, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
});

router.get('/jobs', function(req, res) {
  client.Job.list(function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
});

router.get('/job/cancel/:id', function(req, res) {
  client.Job.cancel(req.params.id, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
});


module.exports = router;