vulpe.ng.app.controller('IndexController', ['$rootScope', '$scope', 'VulpeJS', function($rootScope, $scope, VulpeJS) {

  var vulpejs = new VulpeJS().init($scope);

  vulpejs.timeout.cancel();

  var re_weburl = new RegExp(
    "^" +
    "(?:(?:https?|ftp)://)" +
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
    ")" +
    "(?::\\d{2,5})?" +
    "(?:/\\S*)?" +
    "$", "i"
  );

  vulpejs.item = {
    url: ''
  };

  vulpejs.jobs = function() {
    vulpejs.http.get({
      url: '/jobs',
      callback: function(data) {
        vulpejs.items = data;
        vulpejs.items.forEach(function(item) {
          if (item.job.state !== 'finished') {
            vulpejs.progress(item.job.id);
          }
        });
      }
    });
  };

  var focus = function() {
    vulpejs.timeout.add(function() {
      vulpejs.ui.focus('url');
    }, 100);
  };

  vulpejs.model.create = function() {
    vulpejs.ui.showing = true;
    vulpejs.item.url = '';
    focus();
  };

  vulpejs.cancel = function(id) {
    if (id) {
      vulpejs.http.get({
        url: '/job/cancel/' + id,
        callback: function(data) {
          vulpejs.jobs();
          vulpejs.message.success('Video encoding successfully cancelled!');
        }
      });
    } else {
      vulpejs.ui.showing = false;
      vulpejs.item.url = '';
    }
  };

  vulpejs.progress = function(id) {
    vulpejs.http.get({
      url: '/job/progress/' + id,
      callback: function(data) {
        for (var i = 0, len = vulpejs.items.length; i < len; ++i) {
          var item = vulpejs.items[i];
          if (item.job.id === id) {
            item.job.state = data.state;
            if (data.state !== 'finished') {
              vulpejs.timeout.add(function() {
                vulpejs.progress(id);
              }, 1000);
            }
            break;
          }
        }
      }
    });
  };

  vulpejs.send = function() {
    vulpejs.message.clean();
    if (vulpejs.item.url && vulpejs.item.url.length > 0) {
      if (!re_weburl.test(vulpejs.item.url)) {
        vulpejs.message.error('Please, enter a valid URL.');
        focus();
        return;
      }
      vulpejs.http.post({
        url: '/job',
        data: vulpejs.item,
        callback: {
          success: function(data) {
            vulpejs.item.url = '';
            vulpejs.jobs();
            vulpejs.ui.showing = false;
            vulpejs.message.success('Video successfully sent to encode!');
          },
          error: function(error) {
            vulpejs.message.error('Unable to send the video to encode.');
          }
        }
      });
    } else {
      vulpejs.message.info('Please, enter the video URL to encode!');
      focus();
    }
  };

  vulpejs.on.ready(function() {
    vulpejs.ui.active('index', true);
    vulpejs.jobs();
  });
}]);