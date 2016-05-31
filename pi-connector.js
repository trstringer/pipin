var Client = require('ssh2').Client;
var fs = require('fs');
var prompt = require('prompt');

var config = {
  promptSchema: {
    properties: {
      password: {
        hidden: true
      }
    }
  }
};

function convertBufferToString(buffer) {
  var i;
  var tempString = '';
  for (i = 0; i < buffer.length; i++) {
    if (buffer[i] >= 32 && buffer[i] <= 126) {
      tempString += String.fromCharCode(buffer[i]);
    }
  }
  
  return tempString;
}

module.exports.setPin = function (target, username, gpio, pinVal) {
  var scriptFileName = 'pi-set-pin.py';
  prompt.get(config.promptSchema, (err, result) => {
    var conn = new Client();
    
    conn.on('ready', () => {
      conn.sftp((err, sftp) => {
        if (err) {
          throw err;
        }
        
        var reader = fs.createReadStream(`${__dirname}/${scriptFileName}`);
        var writer = sftp.createWriteStream(`./${scriptFileName}`);
        
        writer.on('close', () => {
          sftp.end();
          conn.exec(`python ~/${scriptFileName} ${gpio} ${pinVal}`, (err, stream) => {
            if (err) {
              throw err;
            }
            stream.on('close', (code, signal) => {
              conn.end();
            }).on('data', data => {
              console.log(data);
            }).stderr.on('data', data => {
              console.log(data);
            });
          });
        });
        
        reader.pipe(writer);
      });
    }).connect({
      host: target,
      port: 22,
      username: username,
      password: result.password
    });
  });
};

module.exports.readPin = function (target, username, gpio, cb) {
  var scriptFileName = 'pi-read-pin.py';
  prompt.get(config.promptSchema, (err, result) => {
    var conn = new Client();
    
    conn.on('ready', () => {
      conn.sftp((err, sftp) => {
        if (err) {
          cb(err);
        }
        
        var reader = fs.createReadStream(`${__dirname}/${scriptFileName}`);
        var writer = sftp.createWriteStream(`./${scriptFileName}`);
        
        writer.on('close', () => {
          sftp.end();
          conn.exec(`python ~/${scriptFileName} ${gpio}`, (err, stream) => {
            if (err) {
              cb(err);
            }
            stream.on('close', (code, signal) => {
              conn.end();
            }).on('data', data => {
              var dataMod = convertBufferToString(data);
              if (dataMod === 'HIGH') {
                cb(null, true);
              }
              else {
                cb(null, false);
              }
            }).stderr.on('data', data => {
              cb(data);
            });
          });
        });
        
        reader.pipe(writer);
      });
    }).connect({
      host: target,
      port: 22,
      username: username,
      password: result.password
    });
  });
};