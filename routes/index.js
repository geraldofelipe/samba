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

router.post('/job', function(req, res) {
  client.Job.create({
    input: req.body.url
  }, function(err, data) {
    if (err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    res.json(data);
  });
});

router.get('/job/create/:url', function(req, res) {
  client.Job.create({
    input: req.params.url
  }, function(err, data) {
    if (err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    res.json(data);
  });
});

router.get('/jobs', function(req, res) {
  client.Job.list(function(err, data) {
    if (err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    res.json(data);
  });
});

router.get('/jobs/page/:page', function(req, res) {
  client.Job.list({
    per_page: 5,
    page: req.params.page || 1
  }, function(err, data) {
    if (err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    res.json(data);
  });
});


router.get('/job/cancel/:id', function(req, res) {
  client.Job.cancel(req.params.id, function(err, data) {
    if (err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    res.json(data);
  });
});

router.get('/job/progress/:id', function(req, res) {
  client.Job.progress(req.params.id, function(err, data) {
    if (err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    res.json(data);
  });
});

module.exports = router;