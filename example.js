var ACL204Lib = require('./ambient');

var ACL204 = new ACL204Lib();		//Create new ACL204 Object

//ACL204.setFrameFormat(10);		//Set Frame Rate to 59.94

/*
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
*/

//ACL204.getFrameFormat();		//Get Frame Rate and Return in Console.log
//ACL204.getSync();				//Get Sync and Return in Console.log
								
//ACL204.getMisc();				

//ACL204.setSyncFormat(1,4,6);
//ACL204.reset();
//ACL204.getACNChannel();
//ACL204.setACNChannel(12);
//ACL204.LTCCallback(1);

ACL204.resetTime();				//Reset TC