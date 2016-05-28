# Raspberry Pi Pin Schematic CLI

*Why?  Because it is impossible to remember them, and a pain to find the docs*

## Installation

```
npm install -g pipin
```

## Usage

### List available models

```
$ pipin --list
```

### Show specific model

```
$ pipin --model rpi2
```

#### Sample output

```
Model: Raspberry Pi A+/B+ and Raspberry Pi 2

              +-------+
 [1]     3.3V | o | o | 5V       [2]
 [3]  GPIO(2) | o | o | 5V       [4]
 [5]  GPIO(3) | o | o | GND      [6]
 [7]  GPIO(4) | o | o | GPIO(14) [8]
 [9]      GND | o | o | GPIO(15) [10]
[11] GPIO(17) | o | o | GPIO(18) [12]
[13] GPIO(27) | o | o | GND      [14]
[15] GPIO(22) | o | o | GPIO(23) [16]
[17]     3.3V | o | o | GPIO(24) [18]
[19] GPIO(10) | o | o | GND      [20]
[21]  GPIO(9) | o | o | GPIO(25) [22]
[23] GPIO(11) | o | o | GPIO(8)  [24]
[25]      GND | o | o | GPIO(7)  [26]
[27]   EEPROM | o | o | EEPROM   [28]
[29]  GPIO(5) | o | o | GND      [30]
[31]  GPIO(6) | o | o | GPIO(12) [32]
[33] GPIO(13) | o | o | GND      [34]
[35] GPIO(19) | o | o | GPIO(16) [36]
[37] GPIO(26) | o | o | GPIO(20) [38]
[39]      GND | o | o | GPIO(21) [40]
              +-------+
```

