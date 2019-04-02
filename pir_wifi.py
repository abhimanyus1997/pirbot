def connect(ssid=None,ssid_password=None):
    import network
    if ssid is None:
        ssid = "whotspot"
        print('Error!!: Invalid Credentials Provided')
        print('Using Default SSID')
    if ssid_password is None:
        ssid_password = "manumanu"
        print('Using Default WIFI Authentication Password...') 
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('Connecting to network...')
        wlan.connect(ssid,ssid_password)
        while not wlan.isconnected():
            pass
    print("\n****Connection Successful****")
    print('Network config:', wlan.ifconfig())
    
def disconnect():
        import network
        print('Disconnecting...')
        wlan = network.WLAN(network.STA_IF)
        if not wlan.isconnected():
            print('Warning: Already Disconnected!')
        else:
            wlan.disconnect()
            print('\n****Disconnected Successfully****')
            
#def update(pkg=None):
#        import network, upip
#        if not network.WLAN(network.STA_IF).isconnected():
#            print('Error!!: Connect to Internet')
#        else:
#            if pkg is None:
#                pkg=["micropython-uasyncio","micropython-pkg_resources","picoweb","utemplate","micropython-ulogging"]
#                print("Warning!:No Library name provided.")
#                i=0
#                while i<len(pkg):
#                    print("\n"+"Updating Default Library: "+pkg[i])
#                    upip.install(pkg[i])
#                    i+=1
#                print("\n****Library update successful****")   
#            else:
#                print("Updating Library: "+pkg)
#                upip.install(pkg)
                
                    
                
                    
