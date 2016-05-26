function displayModelName(modelDetails) {
  if (modelDetails.name) {
    console.log(`Model: ${modelDetails.name}`);
  }
}

function displayPins(modelDetails) {
  if (modelDetails.pins && modelDetails.pins.length > 0) {
    var i;
    for (i = 0; i < modelDetails.pins.length; i++) {
      switch (modelDetails.pins[i].type) {
        case 'constantPower':
          console.log(`Physical pin ${modelDetails.pins[i].physicalId}, voltage ${modelDetails.pins[i].voltage}V`);
          break;
          
        case 'ground':
          console.log(`Physical pin ${modelDetails.pins[i].physicalId}, GROUND`);
          break;
          
        case 'gpio':
          console.log(`Physical pin ${modelDetails.pins[i].physicalId}, GPIO ${modelDetails.pins[i].gpioId}`);
          break;
      }
    }
  }
}

module.exports = function (modelDetails) {
  displayModelName(modelDetails);
  displayPins(modelDetails);
};