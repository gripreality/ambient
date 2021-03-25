//Tite: Ambient Node.JS Lib - Lockit ACL204
//Author: Louis Silverstein
//Date: 2020/7/14
//Language: javascript / Node.js
//Contact: Louis@baraqu.com
//Copyright: Baraqu LLC 2020


var HID = require('node-hid');

module.exports = class ACL204{
    constructor(){

        //Enumerate the HID Devices
        var devices = HID.devices();
        var product = "Lockit ACL204";



        this.errorCode = {
            "400" : "Generic Error",
            "402" : "Argument Missing",
            "601" : "Argument invalid"
        }

        //Find the ACL204 Unit
        if (devices.length > 0) {           //Check for USB Devices
            for (let obj in devices) {
                try {
                    if (devices[obj]["product"] === product) {
                        var vid = devices[obj]["vendorId"];
                        var pid = devices[obj]["productId"];
                        this.unit = new HID.HID(vid, pid);
                        this.deviceInfo = devices[obj];
                    }
                } catch {

                    console.log("Error: AMB_000002 - \'Issue with Ambient lib Line #16-24\'");
                }
            }
        } else {

            console.log("Error: AMB_00000 - \'No USB Devices Found\'");
        }
    }
    setFrameFormat(newFrameformat) {

        var frame_index = {
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

        try {
            //var command = "*A39*I0:" + String(newFrameformat) + "*Z"; //Legacy Code
            var command = "*A86*I0:" + String(newFrameformat) + "*Z";
            console.log(command);
            let utfEcoder = new TextEncoder();
            this.unit.write(utfEcoder.encode(command));
            console.log("setFrameFormat:", frame_index[newFrameformat]);
        }
        catch {
            console.log("Error")
        }
    }
    getFrameFormat(){
        var frame_index = {
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

        try {
            var command = "*Q2*Z:";
            let utfEcoder = new TextEncoder();
            this.unit.write(utfEcoder.encode(command));
            this.unit.read(function(err, data){
                if (err){
                    consoel.log(err);
                }
                else {
                    var response = new TextDecoder().decode(data);
                    if (response.indexOf("*Q2:") > -1){
                        var message = "Status: Frame Format Set To " + frame_index[String(data).split(":")[1].split("*")[0]]
                        console.log(message);
                    }
                    else{
                        console.log("Error: AMB_00010 - " + String(response));
                    }
                }
            });

        }
        catch {
            console.log("Error")
        }
    }

    getSync(){


        try {
            var command = "*A49*Z:";
            let utfEcoder = new TextEncoder();
            this.unit.write(utfEcoder.encode(command));
            this.unit.read(function(err, data){
                if (err){
                    consoel.log(err);
                }
                else {
                    var response = new TextDecoder().decode(data);
                        var message = "Status: Sync Format Set To " + response
                        console.log(message);
                }
            });

        }
        catch {
            console.log("Error")
        }
    }

    resetTime(){
        try{
            var command = '*A35*I0:00000000*Z';
            let utfEcoder = new TextEncoder();
            this.unit.write(utfEcoder.encode(command));
            console.log("Status: Timecode Reset");
        }
        catch{
            console.log("Error: AMB_00004 - \'Unable to Reset Timecode\'")
        }
    }
    setTimeCode(newTimeCode){
        try{
            var command = "*A35*I0:" + String(newTimeCode) + "*Z"
            let utfEcoder = new TextEncoder();
            this.unit.write(utfEcoder.encode(command));
            this.unit.read(function(err, data){
                if (err){
                   consoel.log(err);
                }
                else {
                    var response = new TextDecoder().decode(data);
                    if (response.indexOf("*A35*Z") > -1){
                        console.log("Status: Timecode Set To " + String(newTimeCode));
                    }
                    else{
                        console.log("Error: AMB_00005 - " + String(response));
                    }
                }
            });
        }
        catch{
            console.log("Error: AMB_00005 - \'Unable to set new Timecode\'")
        }
    }
    setACNChannel(newACNChannel){
        if(newACNChannel >= 11 && newACNChannel <= 26){
            try{
                var command = "*A9*I0:" + String(newACNChannel) + "*Z"
                let utfEcoder = new TextEncoder();
                this.unit.write(utfEcoder.encode(command));
                this.unit.read(function(err, data){
                    if (err){
                        consoel.log(err);
                    }
                    else {
                        var response = new TextDecoder().decode(data);
                        if (response.indexOf("*A9*Z") > -1){
                            console.log("Status: ACN Channel Set To " + String(newACNChannel));
                        }
                        else{
                            console.log("Error: AMB_00006 - " + String(response));
                        }
                    }
                });
            }
            catch{
                console.log("Error: AMB_00006 - \'Unable to set new ACN Channel\'")
            }
        }
    }
    getACNChannel(){

        try {
            var command = "*Q1*Z:";
            let utfEcoder = new TextEncoder();
            this.unit.write(utfEcoder.encode(command));
            this.unit.read(function(err, data){
                if (err){
                    consoel.log(err);
                }
                else {
                    var response = new TextDecoder().decode(data);
                    if (response.indexOf("*Q1:") > -1){
                        var message = "Status: Frame Format Set To " + String(data).split(":")[1].split("*")[0];
                        console.log(message);
                    }
                    else{
                        console.log("Error: AMB_00011 - " + String(response));
                    }
                }
            });

        }
        catch {
            console.log("Error")
        }
    }

    getMisc(){

        try {
            var command = "*Q35*Z:";
            let utfEcoder = new TextEncoder();
            this.unit.write(utfEcoder.encode(command));
            this.unit.read(function(err, data){
                if (err){
                    consoel.log(err);
                }
                else {
                    var response = new TextDecoder().decode(data);
                    console.log(response);
                }
            });

        }
        catch {
            console.log("Error")
        }
    }

    reset(){
        try{
            var command = "*A4*Z:";
            let utfEcoder = new TextEncoder();
            this.unit.write(utfEcoder.encode(command));
            this.unit.read(function(err, data){
                if (err){
                    consoel.log(err);
                }
                else {
                    var response = new TextDecoder().decode(data);
                    if (response.indexOf("*A4*Z") > -1){
                        console.log("Status: Reset");
                    }
                    else{
                        console.log("Error: AMB_00007 - " + String(response));
                    }
                }
            });
        }
        catch{
            console.log("Error: AMB_00007 - \'Unable to Reset\'")
        }
    }
    setSyncFormat(newSyncMode, newSyncFormat, newSyncRate){

            try{
                var command = "*A48*I0:" + String(newSyncMode) + "*I1:" + String(newSyncFormat) + "*I2:" + String(newSyncRate) + "*Z";
                let utfEcoder = new TextEncoder();
                this.unit.write(utfEcoder.encode(command));
                this.unit.read(function(err, data){
                    if (err){
                        consoel.log(err);
                    }
                    else {
                        var response = new TextDecoder().decode(data);
                        if (response.indexOf("*A48*Z") > -1){
                            console.log("Status: Format Set");
                        }
                        else{
                            console.log("Error: AMB_00008 - " + String(response));
                        }
                    }
                });
            }
            catch{
                console.log("Error: AMB_00008 - \'Unable to set new Sync Format\'")
            }

    }
    LTCCallback(newLTCCallbackStatus){
        if(newLTCCallbackStatus == 0 || newLTCCallbackStatus == 1){
            try{
                var command = "*A6*I0:" + String(newLTCCallbackStatus) + "*Z"
                let utfEcoder = new TextEncoder();
                this.unit.write(utfEcoder.encode(command));
                this.unit.read(function(err, data){
                    if (err){
                        consoel.log(err);
                    }
                    else {
                        var response = new TextDecoder().decode(data);
                        if (response.indexOf("*A6*Z") > -1){
                            if (newLTCCallbackStatus == 0){
                            console.log("Status: Disable LTC Callback");
                            }
                            else{
                                console.log("Status: Enable LTC Callback");
                            }
                        }
                        else{
                            console.log("Error: AMB_00009 - " + String(response));
                        }
                    }
                });
            }
            catch{
                console.log("Error: AMB_00009 - \'Unable to set new Callback Status\'")
            }
        }
    }
}

//const ACL = new ACL204()

//ACL.setFrameFormat(1);
//ACL.resetTime()
//ACL.setTimeCode(12233320)
//ACL.setACNChannel(15)
//ACL.getACNChannel()

/*
implemented in the legacy platform by *A86* and supersedes the “Set Frame Format” *A39*
The frame rates count up from 0:

0 23.976
1 24
2 25
3 29.97
4 30
5 29.97 drop
6 30 drop
7 47.96
8 48
9 50
10 59.94
11 60

So in your case *A86*I0:10*Z would result in 59.94 straight.
 */