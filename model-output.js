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
        leftPad(`[${pin.physicalId}] `, ' ', config.physicalIdMargin) + leftPad(`${pin.voltage}V`, ' ', config.leftMarginSpacing) : 
        rightPad(`${pin.voltage}V`, ' ', config.leftMarginSpacing) + ` [${pin.physicalId}]`;
      break;
      
    case 'ground':
      pinSpecDisplay = isLeft ? 
        leftPad(`[${pin.physicalId}] `, ' ', config.physicalIdMargin) + leftPad(`GND`, ' ', config.leftMarginSpacing) : 
        rightPad(`GND`, ' ', config.leftMarginSpacing) + ` [${pin.physicalId}]`;
      break;
      
    case 'gpio':
      pinSpecDisplay = isLeft ? 
        leftPad(`[${pin.physicalId}] `, ' ', config.physicalIdMargin) + leftPad(`GPIO(${pin.gpioId})`, ' ', config.leftMarginSpacing) : 
        rightPad(`GPIO(${pin.gpioId})`, ' ', config.leftMarginSpacing) + ` [${pin.physicalId}]`;
      break;
  }
  return pinSpecDisplay;
}

function leftPad(input, padChar, padLength) {
  var i;
  var tempOutput = '';
  for (i = 0; i < padLength; i++) {
    tempOutput += padChar;
  }
  
  tempOutput += input;
  return tempOutput.substring(tempOutput.length - padLength);
}

function rightPad(input, padChar, padLength) {
  var i;
  var tempOutput = input;
  for (i = 0; i < padLength; i++) {
    tempOutput += padChar;
  }
  
  return tempOutput.substring(0, padLength);
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