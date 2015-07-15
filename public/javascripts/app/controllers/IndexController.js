vulpe.ng.app.controller('IndexController', ['$rootScope', '$scope', 'VulpeJS', function($rootScope, $scope, VulpeJS) {

  var vulpejs = new VulpeJS().init($scope);

  var encode = {
    formats: "(dv|webm|mkv|flv|vob|ogv|ogg|drc|mng|avi|mov|qt|wmv|yuv|rm|rmvb|asf|mp4|m4p|m4v|mpg|mp2|mpeg|mpe|mpv|mpg|mpeg|m2v|m4v|svi|3gp|3g2|mxf|roq|nsv)",
    status: {
      all: ['waiting', 'pending', 'processing', 'finished', 'failed', 'cancelled'],
      end: ['finished', 'failed', 'cancelled']
    }
  }
  var regex = {
    allowedExtensions: /\.(dv|webm|mkv|flv|vob|ogv|ogg|drc|mng|avi|mov|qt|wmv|yuv|rm|rmvb|asf|mp4|m4p|m4v|mpg|mp2|mpeg|mpe|mpv|mpg|mpeg|m2v|m4v|svi|3gp|3g2|mxf|roq|nsv)/i
  };
  vulpejs.timeout.cancel();

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

  vulpejs.cancel = function(id) {
    vulpejs.http.get({
      url: '/job/cancel/' + id,
      callback: function(data) {
        vulpejs.jobs();
        vulpejs.message.success('Video encoding successfully cancelled!');
      }
    });
  };

  vulpejs.progress = function(id) {
    vulpejs.http.get({
      url: '/job/progress/' + id,
      callback: function(data) {
        for (var i = 0, len = vulpejs.items.length; i < len; ++i) {
          var item = vulpejs.items[i];
          if (item.job.id === id) {
            item.job.state = data.state;
            if (encode.status.end.indexOf(data.state) === -1) {
              vulpejs.timeout.add(function() {
                vulpejs.progress(id);
              }, 3000);
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
      if (!vulpe.utils.regex.weburl.test(vulpejs.item.url)) {
        vulpejs.message.error('Please, enter a valid URL.');
        focus();
        return;
      }
      var file = vulpejs.item.url.split('/').pop().toLowerCase();
      if (!regex.allowedExtensions.test(file)) {
        vulpejs.message.error('Please, enter a video with one of the following formats: ' + encode.formats);
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
    focus();
  });
}]);