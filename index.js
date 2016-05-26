var program = require('commander');
var fs = require('fs');
var displaySchematic = require('./model-output.js');

program
  .version('1.0.0')
  .option('-m, --model [model]', 'Show pins for model')
  .option('-l, --list', 'List all models')
  .parse(process.argv);
  
function showPinSchematic(model, cb) {
  const fileName = `./models/${model}.json`;
  fs.readFile(fileName, (err, data) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, JSON.parse(data));
    }
  });
}
  
if (program.model) {
  switch (program.model) {
    case 'rpiab':
      showPinSchematic('rpiab', (err, modelDetails) => {
        if (err) {
          console.error('error reading rpiab');
        }
        else if (modelDetails) {
          displaySchematic(modelDetails);
        }
      });
      break;

    default:
      console.warn('unknown model');
  }
}