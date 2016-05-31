import RPi.GPIO as GPIO
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(int(sys.argv[1]), GPIO.IN)

if (GPIO.input(int(sys.argv[1])) == True):
  print('HIGH')
else:
  print('LOW')