# Raspberry Pi GPIO Pin Controller and Schematic CLI

**Set GPIO pins high or low, read them, and show pin schematics**

*Why?  Because there should be an easy way to toggle GPIO pins, and read them... and show pin schematics, because they're impossible to remember*

## Installation

```
npm install -g pipin
```

## Usage

```
  Usage: pipin [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -l, --list                 List all models for pin schematics
    -m, --model [model]        Show pins for model
    -t, --target [target]      Raspberry Pi to connect for pin operations
    -u, --username [username]  Username for SSH connection
    -g, --gpio [gpio]          GPIO pin to read or toggle
    -s, --state [state]        State (1 or 0) to set GPIO pin (1 = HIGH, 0 = LOW)
```

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

### Set a GPIO pin high/low

```
pipin -t <hostname-or-ip> -u <username> -g <gpio-pin-num> -s <1-or-0>
```

#### Example

*Set the GPIO 2 pin to high on a host named `raspberrypi` using user `pi`*

```
pipin -t raspberrypi -u pi -g 2 -s 1
```

### Read the state of a GPIO pin

```
pipin -t <hostname-or-ip> -u <username> -g <gpio-pin-num> -s <1-or-0>
```

#### Example

*Get the value/state of GPIO 2 pin on host `raspberrypi` using user `pi`*

```
pipin -t raspberrypi -u pi -g 2
```