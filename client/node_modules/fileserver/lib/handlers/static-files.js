
module.exports = createHandler;

var fs = require('fs'),
    url = require('url'),
    createPathmap = require('../pathmap').createPathmap;

function createHandler(options) {
  var pathmap = createPathmap();
  
  function handler(req, res, next) {
    var pathname = req.urlParts.pathname;
    
    // Remove any trailing slash
    if(pathname.slice(-1) === '/') {
      pathname = pathname.slice(0, -1);
    }
    
    // Lookup local path
    var localPath = pathmap.getPath(pathname);
    
    if(localPath != null) {
      fs.stat(localPath, function(err, s) {
        var readStream;
        
        if(err) {
          return next(err);
        }
        
        if(s.isDirectory()) {
//          return next(true);
          
          // Redirect folder-paths without a trailing slash
          if(req.urlParts.pathname.slice(-1) !== '/') {
            req.urlParts.pathname += '/';
            res.writeHead(302, {
              'Location': url.format(req.urlParts)
            });
            res.end();
            
            return next(false);
          }
          
          // onError(req, res, new Error('Path is a directory'));
          
          // List files in folder
          fs.readdir(localPath, function(err, files) {
            if(err) return next(err);
            
            res.writeHead(200, {
              'Content-Type': 'text/html'
            });
            res.write('<h1>' + pathname + '/</h1><div>');
            files.forEach(function(file) {
              if(file[0] !== '.') {
                res.write('<div><a href="' + file + '">' + file + '</a></div>');
              }
            });
            res.write('</div>');
            res.end();
            
            next(false);
          });
        } else {
          // Pipe the file to client
          res.statusCode = 200;
          
          if(pathmap.getMimeType(pathname)) {
            res.setHeader('Content-Type', pathmap.getMimeType(pathname));
          }
          
          var readStream = fs.createReadStream(localPath);
          
          readStream.on('error', function(err) {
            readStream.removeAllListeners();
            onError(req, res, err);
          });
          
          readStream.pipe(res);
          
          next(false);
        }
      });
    } else {
      next(true);
    }
  }
  
  handler.pathmap = pathmap;
  
  return handler;
}