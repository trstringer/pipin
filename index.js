var program = require('commander');
var fs = require('fs');
var displaySchematic = require('./model-output.js');
var utility = require('./utility.js');
var packageConfig = require('./package.json');

program
  .version(packageConfig.version)
  .option('-m, --model [model]', 'Show pins for model')
  .option('-l, --list', 'List all models')
  .parse(process.argv);
  
function showPinSchematic(model, cb) {
  const fileName = `${__dirname}/models/${model}.json`;
  fs.readFile(fileName, (err, data) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, JSON.parse(data));
    }
  });
}

function getModelNameFromFile(fileName, cb) {
  const modelAbbr = fileName.split('/').pop().replace('.json', '');
  fs.readFile(fileName, (err, data) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, modelAbbr, JSON.parse(data).name);
    }
  });
}

function getModelFiles(cb) {
  const modelPath = `${__dirname}/models`;
  fs.readdir(modelPath, (err, files) => {
    var i;
    for (i = 0; i < files.length; i++) {
      getModelNameFromFile(`${modelPath}/${files[i]}`, (err, modelAbbr, modelName) => {
        if (err) {
          console.log(`Error retrieving model name for ${files[i]}`);
        }
        else {
          console.log(`${utility.rightPad(modelAbbr, ' ', 8)} ${modelName}`);
        }
      });
    }
  });
}

function getAllModels(cb) {
  getModelFiles();
}
  
if (program.list) {
  getAllModels();
}
else if (program.model) {
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

    case 'rpi2':
      showPinSchematic('rpi2', (err, modelDetails) => {
        if (err) {
          console.error('error reading rpi2');
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