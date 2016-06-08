module.exports.showResistorBandChart = () => {
  const chart = `Resistor Band Chart
Color  Digit  Multiplier  Tolerance
-----  -----  ----------  ---------
Black  0      1           
Brown  1      10          1%
Red    2      100         2%
Orange 3      1K            
Yellow 4      10K          
Green  5      100K        0.5%
Blue   6      1M          0.25%
Violet 7      10M         0.1%
Grey   8                  0.05%
White  9                 
Gold          0.1         5%
Silver        0.01        10%

Guide:
 - last band is the tolerance (+- %)
 - 2nd to last band is the multipler
 - all other proceeding bands are the decimal
   number to be multiplied by the multiplier
   
Examples:
 [orange][violet][blue][gold][silver] 
    3       7       6    0.1   10%
 translates to a 37.6 Ohm +-10% resistor
 
 [brown][green][yellow][gold]
    1      5      10K    5%
 translates to a 150K Ohm +- 5% resistor`;

  console.log(chart); 
};