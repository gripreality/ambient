from ambient import ACL204

ACL204 = ACL204()					#Create new ACL204 Object

ACL204.setFrameFormat(10)			#Set Frame Rate to 59.94

'''
Frame Formats:
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
'''

ACL204.resetTime()					#Reset TC
ACL204.setTimeCode(01020300) 		#HHMMSSFF (H = Hour, M = Min, S = Second, F = Frame)
#ACL204.setACNChannel(12)			#Set ACN Channel to 12

'''
ACN,	 ,	ARRI EMIP WRS
Channel, 	Center Frequency [MHz], 	Channel
11, 	2405
12, 	2410, 	0
13, 	2415, 	1
14, 	2420
15, 	2425
16, 	2430, 	2
17, 	2435, 	3
18, 	2440
19, 	2445
20, 	2450, 	4
21, 	2455, 	5
22, 	2460
23, 	2465
24, 	2470, 	6
25, 	2475, 	7
26, 	2480
'''

#ACL204.reset()						#Reset Unit
#ACL204.setSyncFormat(3, 0, 2)		#Set PPF on, Rising Edge at Frame Begin, 4x

'''
Formats:
Mode:
	0: Off
	3: PPF

Format:
	0: High (Rising Edge)
	1: LOW (Falling Edge)

Rate:
	0: 1x
	1: 2x
	2: 4x
'''

#ACL204.LTCCallback(1)				#Enable LTCCallback

'''
0: Disable LTC Callback
1: Enable LTC Callback
'''