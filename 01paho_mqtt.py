import paho.mqtt.client as mqtt #import the client1
import os
import time

rpi_cpu_temp = rpi_voltage = None	#Initializing Variables

#return(temp.replace("temp=",""))

broker_address="enchantress" 
#broker_address="iot.eclipse.org" #use external broker
client = mqtt.Client("P1") #create new instance
client.connect(broker_address) #connect to broker
while 1:
	rpi_cpu_temp = os.popen("vcgencmd measure_temp").readline()
	cpu_temp = rpi_cpu_temp[5:9]
	rpi_voltage = os.popen("vcgencmd measure_volts").readline()
	rpi_json = '{"temp":'+str(rpi_cpu_temp)+', "volt":'+str(rpi_voltage)+'}'
	client.publish("rpi/data",cpu_temp) #publish
	time.sleep(0.5)
	pass


