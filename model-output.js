const config = {
  leftMarginSpacing: 8
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
  for (i = 0; i < config.leftMarginSpacing + 1; i++) {
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
  // the format is:
  //  - 6 char for <pin-spec>
  //  - left pad left pins <pin-spec> with spaces
  var pinSpecDisplay;
  switch (pin.type) {
    case 'constantPower':
      pinSpecDisplay = isLeft ? leftPad(`${pin.voltage}V`, ' ', config.leftMarginSpacing) : `${pin.voltage}V`;
      break;
      
    case 'ground':
      pinSpecDisplay = isLeft ? leftPad('GND', ' ', config.leftMarginSpacing) : 'GND';
      break;
      
    case 'gpio':
      pinSpecDisplay = isLeft ? leftPad(`GPIO(${pin.gpioId})`, ' ', config.leftMarginSpacing) : `GPIO(${pin.gpioId})`;
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