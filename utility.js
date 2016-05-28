module.exports.leftPad = function (input, padChar, padLength) {
  var i;
  var tempOutput = '';
  for (i = 0; i < padLength; i++) {
    tempOutput += padChar;
  }
  
  tempOutput += input;
  return tempOutput.substring(tempOutput.length - padLength);
};

module.exports.rightPad = function (input, padChar, padLength) {
  var i;
  var tempOutput = input;
  for (i = 0; i < padLength; i++) {
    tempOutput += padChar;
  }
  
  return tempOutput.substring(0, padLength);
};