#Tite: Ambient Node.JS Lib - Lockit ACL204
#Author: Louis Silverstein
#Date: 2020/7/14
#Language: python 3.x
#Contact: Louis@baraqu.com
#Copyright: Baraqu LLC 2020

import hid

class ACL204:
    def __init__(self):
        vid = 0x10e6
        pid = 0x1033

        with hid.Device(vid, pid) as h:
            print(f'Device manufacturer: {h.manufacturer}')
            print(f'Product: {h.product}')
            print(f'Serial Number: {h.serial}')

        self.unit = hid.Device(vid, pid)

    def setFrameFormat(self, newFrameformat):

        print(newFrameformat)

        frame_index = {
            0: "23.976",
            1: "24",
            2: "25",
            3: "29.97",
            4: "30",
            5: "29.97 drop",
            6: "30 drop",
            7: "47.96",
            8: "48",
            9: "50",
            10: "59.94",
            11: "60"
        }

        try:
            #command = "*A39*I0:" + str(newFrameformat) + "*Z" #Legacy Code
            command = "*A86*I0:" + str(newFrameformat) + "*Z"
            self.unit.write(bytes(command, "ASCII"))
            print("setFrameFormat:", frame_index.get(newFrameformat, "Invalid Selection"))
        except:
            print("Error")

    def resetTime(self):
        try:
            command = b'*A35*I0:00000000*Z'
            self.unit.write(command)
        except:
            print("Error")

    def setTimeCode(self, newTimeCode):
        print(newTimeCode)
        try:
            command = "*A35*I0:"+ str(newTimeCode) +"*Z"
            self.unit.write(bytes(command, "ASCII"))
        except:
            print("Error")

    def setACNChannel(self, newACNChannel):
        print(newACNChannel)
        if (newACNChannel >= 11 and newACNChannel <= 26):
            try:
                command = "*A9*I0:"+ str(newACNChannel) +"*Z"
                self.unit.write(bytes(command, "ASCII"))
            except:
                print("Error")
        else:
            print("Invalid Chennel")

    def reset(self):
        try:
            command = "*A4*Z"
            self.unit.write(bytes(command, "ASCII"))
        except:
            print("Error")

    def setSyncFormat(self, newSyncMode, newSyncFormat, newSyncRate):
        print(newSyncMode, newSyncFormat, newSyncRate)
        if ((newSyncMode == 0 or newSyncMode == 3) and (newSyncFormat == 0 or newSyncFormat == 1) and (newSyncRate == 0 or newSyncRate == 1 or newSyncRate == 2)):
            try:
                command = "*A48*I0:"+ str(newSyncMode) + "*I1:" + str(newSyncFormat) + "*I2:" + str(newSyncRate) + "*Z"
                print(command)
                self.unit.write(bytes(command, "ASCII"))
            except:
                print("Error")
        else:
            print("Invalid Sync Format")

    def LTCCallback(self, newLTCCallbackStatus):
        if (newLTCCallbackStatus == 0):
            print("Disable LTC Callback")
        elif (newLTCCallbackStatus == 1):
            print("Enable LTC Callback")

        if (newLTCCallbackStatus == 0 or newLTCCallbackStatus <= 1):
            try:
                command = "*A6*I0:" + str(newLTCCallbackStatus) + "*Z"
                self.unit.write(bytes(command, "ASCII"))
            except:
                print("Error")
        else:
            print("Invalid LTC Callback")
