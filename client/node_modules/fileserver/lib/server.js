
var http = require('http');
var url = require('url');

var staticFiles = require('./handlers/static-files');
var reverseProxy = require('./handlers/reverse-proxy');

function createServer(options, onRequest, onError) {
  var server,
      plugins = [];
      requestHandlers = [];
  
  if(typeof options === 'function') {
    onError = onRequest;
    onRequest = options;
    options = {};
  }
  
  if(!options) options = {};
  
  if(!onError) {
    onError = function(req, res, err) {
      res.statusCode = 404;
      res.end(err.toString());
    };
  }
  
  plugins.push(function(req, res) {
    req.urlParts = url.parse(req.url);
  });
  
  var staticFilesHandler = staticFiles(options);
  requestHandlers.push(staticFilesHandler);
  
  var reverseProxyHandler = reverseProxy(options);
  requestHandlers.push(reverseProxyHandler);
  
  if(onRequest) {
    requestHandlers.push(onRequest);
    onRequest = null;
  }
  
  function defaultOnRequest(req, res) {
    // console.log(req.method, req.url);
    
    req.pause();
    
    executePlugins(req, res, plugins);
    
    if(requestHandlers.length) {
      executeRequestHandlers(req, res, requestHandlers, 0, function(err) {
        if(err) {
          return onError(req, res, err);
        }
        
//        console.log('END', req.method, req.url);
      });
    } else {
      onError(req, res, new Error('No request-handlers.'));
    }
  }
  
  server = http.createServer(defaultOnRequest);
  
  function listen(port, host) {
    if(port && host) {
      server.listen(port, host);
    } else {
      server.listen(port);
    }
  }
  
  return {
    server: server,
    listen: listen,
    pathmap: staticFilesHandler.pathmap
  };
}

function executePlugins(req, res, plugins) {
  plugins.forEach(function(plugin) {
    plugin(req, res);
  });
}

function executeRequestHandlers(req, res, handlers, index, cb) {
  if(!index) index = 0;
  
  if(res.finished || index === handlers.length) return cb();
  
  var handler = handlers[index++];
//  console.log('executeRequestHandler %s/%s', index, handlers.length);
  
  if(handler.length > 2) {
    handler(req, res, function(err) {
      if(err === false) {
        return cb();
      }
      
      if(err && err !== true) {
        return cb(err);
      }
      
      executeRequestHandlers(req, res, handlers, index, cb);
    });
  } else {
    handler(req, res);
    executeRequestHandlers(req, res, handlers, index, cb);
  }
}

module.exports = {
  createServer: createServer
};
