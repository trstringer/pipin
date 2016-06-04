var utility = require('./utility.js');
var chalk = require('chalk');

const config = {
  leftMarginSpacing: 8,
  physicalIdMargin: 5
};

function displayModelName(modelDetails) {
  if (modelDetails.name) {
    console.log(`Model: ${modelDetails.name}`);
    console.log(' ');
  }
}

function displaySchematicHeaderFooter() {
  var output = '';
  var i;
  for (i = 0; i < config.leftMarginSpacing + config.physicalIdMargin + 1; i++) {
    output += ' ';
  }
  
  console.log(`${output}+-------+`);
}

function displayPinRow(pinLeft, pinRight) {
  var displayRow;
  
  displayRow = formatPinForOutput(pinLeft, true);
  displayRow += ' | o | o | ';
  displayRow += formatPinForOutput(pinRight, false);
  
  console.log(displayRow);
}

function formatPinForOutput(pin, isLeft) {
  var pinSpecDisplay;
  switch (pin.type) {
    case 'constantPower':
      pinSpecDisplay = isLeft ? 
        utility.leftPad(`[${pin.physicalId}] `, ' ', config.physicalIdMargin) + utility.leftPad(`${pin.voltage}V`, ' ', config.leftMarginSpacing) : 
        utility.rightPad(`${pin.voltage}V`, ' ', config.leftMarginSpacing) + ` [${pin.physicalId}]`;
      break;
      
    case 'ground':
      pinSpecDisplay = isLeft ? 
        utility.leftPad(`[${pin.physicalId}] `, ' ', config.physicalIdMargin) + utility.leftPad(`GND`, ' ', config.leftMarginSpacing) : 
        utility.rightPad(`GND`, ' ', config.leftMarginSpacing) + ` [${pin.physicalId}]`;
      break;
      
    case 'gpio':
      pinSpecDisplay = isLeft ? 
        utility.leftPad(`[${pin.physicalId}] `, ' ', config.physicalIdMargin) + utility.leftPad(`GPIO(${pin.gpioId})`, ' ', config.leftMarginSpacing) : 
        utility.rightPad(`GPIO(${pin.gpioId})`, ' ', config.leftMarginSpacing) + ` [${pin.physicalId}]`;
      break;
      
    case 'eeprom':
      pinSpecDisplay = isLeft ?
        utility.leftPad(`[${pin.physicalId}] `, ' ', config.physicalIdMargin) + utility.leftPad(`EEPROM`, ' ', config.leftMarginSpacing) :
        utility.rightPad(`EEPROM`, ' ', config.leftMarginSpacing) + ` [${pin.physicalId}]`;
      break;
  }
  return pinSpecDisplay;
}

function displayPins(modelDetails) {
  if (modelDetails.pins && modelDetails.pins.length > 0) {
    displaySchematicHeaderFooter();
    
    var i;
    for (i = 0; i < modelDetails.pins.length; i += 2) {
      displayPinRow(modelDetails.pins[i], modelDetails.pins[i + 1]);
    }
    
    displaySchematicHeaderFooter();
  }
}

module.exports = function (modelDetails) {
  displayModelName(modelDetails);
  displayPins(modelDetails);
};