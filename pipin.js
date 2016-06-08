var program = require('commander');
var fs = require('fs');
var displaySchematic = require('./model-output.js');
var utility = require('./utility.js');
var packageConfig = require('./package.json');
var connector = require('./pi-connector.js');
var resDisplay = require('./res-display.js');

program
  .version(packageConfig.version)
  .option('-l, --list', 'list all models for pin schematics')
  .option('-m, --model [model]', 'show pins for model')
  .option('-r, --res', 'display resistor band chart')
  .option('-t, --target [target]', 'raspberry Pi to connect for pin operations')
  .option('-u, --username [username]', 'username for SSH connection')
  .option('-g, --gpio [gpio]', 'GPIO pin to read or toggle')
  .option('-s, --state [state]', 'state (1 or 0) to set GPIO pin (1 = HIGH, 0 = LOW)')
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
else if (program.res) {
  resDisplay.showResistorBandChart();
}
else if (program.target) {
  if (!program.username || !program.gpio) {
    console.log('You must specify a username and gpio pin to target');
  }
  else {
    if (program.state) {
      // the user wants to set the state of the GPIO pin
      connector.setPin(program.target, program.username, program.gpio, program.state);
    }
    else {
      // the user wants to read the state
      connector.readPin(program.target, program.username, program.gpio, (err, isHigh) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(`GPIO(${program.gpio}) :: ${isHigh ? 'HIGH' : 'LOW'}`);
        }
      });
    }
  }
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