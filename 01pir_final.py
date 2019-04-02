import network
import ure
import time
from machine import Pin, PWM
import ubinascii
import machine
import micropython
import umqtt_simple
from umqtt.simple import MQTTClient

#connecting to hotspot
ssid = "whotspot"
ssid_password = "manumanu"
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid,ssid_password)

# Direction Pin of Motor1 assuming value=1 as forward
m1_dir = Pin(2, Pin.OUT, value=1)

# MQTT Broker IP
server="192.168.137.160"

# Received messages from subscriptions will be delivered to this callback
def sub_cb(topic, msg):
    #print((topic, msg))
    msgDecoded=msg.decode("utf-8")  #Converts Byte Data into UTF-8 Strings
    #Using Micropython RegEXP lib to seperate data
    #where data[0] denotes Direction and data[1] denotes Speed
    sep = ure.compile("-")  # Delimiter is "-"
    data = sep.split(msgDecoded)
    print("Direction:",data[0],"\t Speed:",data[1],"\t State:",data[2])
    if data[0] == "w":
        #m1_dir.value(1)
        motor(1,int(data[1]),int(data[2]))
    elif data[0] == "s":
        #m1_dir.value(0)
        motor(0,int(data[1]),int(data[2]))
    else:
        #m1_dir.value(0)
        motor(0,0)  #Frequency Becomes zero so motor stops


def pircontrol(server="192.168.137.160"):
    c = MQTTClient("esp32_pir_mqttClient", server)
    c.set_callback(sub_cb)
    c.connect()
    c.subscribe(b"esp32/control")
    while True:
        if True:
            # Blocking wait for message
            c.wait_msg()
        else:
            # Non-blocking wait for message
            x=c.check_msg()
            
            # Then need to sleep to avoid 100% CPU usage (in a real
            # app other useful actions would be performed instead)
            time.sleep(1)
    c.disconnect()

def motor(dir,speed,state,duty_cycle=750):
    stepper1 = PWM(Pin(2), freq=speed, duty=duty_cycle)
    if state==0:
        stepper1.deinit()
    else:
        stepper1 = PWM(Pin(2), freq=speed, duty=duty_cycle)
        direction1 = Pin(4, Pin.OUT, value=dir)
#    if speed==0:
#        stepper1.deinit() 
#    direction2 = Pin(4, Pin.OUT, value=dir)
#    direction3 = Pin(4, Pin.OUT, value=dir)


if __name__ == "__main__":
    pircontrol()
