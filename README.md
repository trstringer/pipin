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
    -l, --list                 list all models for pin schematics
    -m, --model [model]        show pins for model
    -r, --res                  display resistor band chart
    -t, --target [target]      raspberry Pi to connect for pin operations
    -u, --username [username]  username for SSH connection
    -g, --gpio [gpio]          GPIO pin to read or toggle
    -s, --state [state]        state (1 or 0) to set GPIO pin (1 = HIGH, 0 = LOW)
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

![sample output](/images/pipin-schematic-screenshot-01.png)

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

### Show the resistor conversion chart

```
pipin -r
```