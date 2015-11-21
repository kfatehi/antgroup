
/**
 * options.reverseProxy = [{
 *   proxy: 'http://localhost:3000/foo/bar',
 *   host: 'foo.example.com',
 *   pathname: '/foo'
 * }]
 */

module.exports = createHandler;

var request = require('request').defaults({jar: false});

function createHandler(options) {
//  console.log('Creating reverseProxy', options);
  var reverseProxy = options.reverseProxy || [];
  
  function onRequest(req, res, next) {
    execute(0, reverseProxy.length, req, res, next);
  }
  
  function execute(index, pending, req, res, next) {
    if(index === pending) return next(true);
    
    var proxiedServer = reverseProxy[index++];
    
    if(proxiedServer.proxy == null) {
      return execute(index, pending, req, res, next);
    }
    
    if(proxiedServer.host != null && proxiedServer.host !== req.headers.host) {
      return execute(index, pending, req, res, next);
    }
    
    if(proxiedServer.pathname != null && req.urlParts.pathname.slice(0, proxiedServer.pathname.length) !== proxiedServer.pathname) {
      return execute(index, pending, req, res, next);
    }
    
//    console.log(req.url, '->', proxiedServer.proxy + req.url);
//    console.log('proxiedServer', proxiedServer, proxiedServer.proxy + req.url);
    
    var proxyUrl = proxiedServer.proxy + req.url, subreq = request(proxyUrl);
//    
//    subreq.on('request', function() {
//      console.log('request');
//    });
//    subreq.on('response', function() {
//      console.log('response');
//      next(false);
//    });
//    subreq.on('complete', function() {
//      console.log('complete');
//    });
//    subreq.on('abort', function() {
//      console.log('abort');
//    });
    subreq.on('error', function(err) {
      console.error('[PROXY] ' + err.message + ' (' + proxiedServer.proxy + ' ' + req.method + ' ' + req.url + ')');
      res.writeHead(502, {});
      res.end();
    });
    
    req.pipe(subreq).pipe(res);
    req.resume();
  }
  
  return onRequest;
}