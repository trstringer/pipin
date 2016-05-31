import RPi.GPIO as GPIO
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

if int(sys.argv[2]) == 1:
  pinval = GPIO.HIGH
elif int(sys.argv[2]) == 0:
  pinval = GPIO.LOW
else:
  raise ValueError('argument out of bounds')
  
GPIO.setup(int(sys.argv[1]), GPIO.OUT)
GPIO.output(int(sys.argv[1]), pinval)