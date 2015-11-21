
var fs = require('fs');
var path = require('path');
var mime = require('mime');

function createPathmap() {
  var paths = {},
      mimeTypes = {},
      skipDoted = true;
  
  function scanFolders(folders, prefix, cb) {
    var pending = 0,
        roots = [];
    
    if(typeof prefix === 'function') {
      cb = prefix;
      prefix = '';
    }
    
    if(folders.length === 0) return cb(null, roots);
    
    folders.forEach(function(folder) {
      var _prefix = prefix,
          _folder = folder;
      
      ++pending;
      
      if(typeof _folder === 'object') {
        if(_folder.prefix != null) _prefix += _folder.prefix;
        _folder = _folder.folder;
      }
      
      scanFolder(_folder, null, _prefix, function(err, root) {
        if(err) return cb(err);
        
        roots.push(root);
        if(!--pending) return cb(null, roots);
      });
    });
  }
  
  function scanFolder(root, file, prefix, cb) {
    var self = this,
        folder;
    
    if(typeof prefix === 'function') {
      cb = prefix;
      prefix = '';
    }
    
    if(typeof file === 'function') {
      cb = file;
      file = null;
    }
    
    root = path.resolve(root);
    if(file == null) {
      folder = path.resolve(root);
    } else {
      folder = path.resolve(path.join(root, file));
    }
    
    if(file == null) {
      addPath(folder, null, root, prefix);
    }
    
    fs.readdir(folder, function(err, files) {
      if(err) return cb(err);
      
      if(files.length === 0) return cb(null, root);
      
      var pending = 0;
      files.forEach(function(file) {
        if(skipDoted === true && file[0] === '.') return;
        
        ++pending;
        
        var fullpath = path.join(folder, file);
        
        fs.stat(fullpath, function(err, s) {
          if(err) return cb(err);
          
          // 
          var p = addPath(fullpath, null, root, prefix);
          
          if(prefix) {
            p = p.slice(prefix.length);
          }
          
          if(s.isDirectory()) {
            scanFolder(root, p, prefix, function(err) {
              if(err) return cb(err);
              
              if(!--pending) return cb(null, root);
            });
          } else {
            if(!--pending) return cb(null, root);
          }
        });
      });
    });
  }
  
  function addPath(fullpath, p, root, prefix) {
    if(p == null) {
      p = fullpath.slice(root.length);
    }
    
    if(prefix != null) {
      p = prefix + p;
    }
    
    if(path.sep !== '/') {
      p = p.split(path.sep).join('/');
    }
    
    if(paths[p] != null) {
      console.warn('COLLISION DETECTED');
      console.warn(p);
      console.warn(paths[p]);
      console.warn(fullpath);
      console.warn('');
    }
    
    paths[p] = fullpath;
    mimeTypes[p] = mime.lookup(fullpath);
    // console.log('addPath', p, '>>', fullpath);
    
    return p;
  }
  
  function getPath(p) {
    return paths[p];
  }
  
  function getMimeType(p) {
    return mimeTypes[p];
  }
  
  function addFiles(files, prefix) {
    if(prefix == null) {
      prefix = '';
    }
    
    files.forEach(function(file) {
      var _prefix = prefix,
          _file = file;
      
      if(typeof _file === 'object') {
        if(_file.prefix != null) _prefix += _file.prefix;
        _file = _file.file;
      }
      
      addFile(_file, _prefix);
    });
  }
  
  function addFile(fullpath, prefix) {
    fullpath = path.resolve(fullpath);
    
    var p = path.basename(fullpath);
    
    if(prefix != null) {
      p = prefix + p;
    }
    
    if(paths[p] != null) {
      console.warn('COLLISION DETECTED');
      console.warn(p);
      console.warn(paths[p]);
      console.warn(fullpath);
      console.warn('');
    }
    
    paths[p] = fullpath;
    mimeTypes[p] = mime.lookup(fullpath);
    
    return p;
  }
  
  return {
    paths: paths,
    createPathmap: createPathmap,
    scanFolder: scanFolder,
    scanFolders: scanFolders,
    getPath: getPath,
    getMimeType: getMimeType,
    addFile: addFile,
    addFiles: addFiles
  };
};

module.exports = {
  createPathmap: createPathmap
};