 //functions.js - Function Definitions
 
// getInitialLocation - Stores initial location in database
function getInitialLocation(){
Titanium.Geolocation.getCurrentPosition(function(e){
		
	    var inilat=e.coords.latitude;
        var inilon=e.coords.longitude;
    	var inidistacc = e.coords.accuracy;
        var inialt=e.coords.altitude;
        var inichgalt=0;
    	var inialtacc = e.coords.altitudeAccuracy;
        var initime=Clock.currentSeconds();
        var inidateobj=e.coords.time; 
    	var inidistchange=0;
    	var inispeed=0;
    	var inihead = e.coords.heading;
    	
   
    	var db = Ti.Database.open('testdb');
		db.execute('INSERT INTO gpsdata(Lat,Lon,DistAcc,Alt,ChgAlt,AltAcc,Time,Date,Dist,Speed,Head) VALUES (?,?,?,?,?,?,?,?,?,?,?);', 
		inilat,inilon,inidistacc,inialt,inichgalt,inialtacc,initime,inidateobj,inidistchange,inispeed,inihead);
    	db.close();
    
});
};
 
// getLocation - Continously gets location info and stores in database
function getLocation(){
Titanium.Geolocation.getCurrentPosition(function(e){
		
		//Store previous location info in variables
    	var db = Ti.Database.open('testdb');
		var result = db.execute('SELECT * FROM gpsdata WHERE ID=(SELECT MAX(ID) FROM gpsdata);');
		var prevlat=result.fieldByName('Lat');
		var prevlon=result.fieldByName('Lon');
		var prevalt=result.fieldByName('Alt');
		var prevtime=result.fieldByName('Time');
    	db.close();
    	
		//Store current location info in variables
       	var curdistacc=e.coords.accuracy;
    	var curlat=e.coords.latitude;
        var curlon=e.coords.longitude;
        var curalt=e.coords.altitude;
        var curaltacc=e.coords.altitudeAccuracy;
        var curtime=Clock.currentSeconds();
        var curdateobj=e.coords.time;
        
        var curhead=e.coords.heading;
    	var distchange=getDistance(prevlat,prevlon,curlat,curlon);
    	var altchange=Math.abs(curalt-prevalt);
		
    	// Calculate Speed
    	timediff=curtime-prevtime;
    	meterspersec=distchange/timediff;
    	kmperhour=meterspersec*3.6;
    	var speed=kmperhour; 
    	
    	//Insert current location information into database
    	
    	var db = Ti.Database.open('testdb');
		db.execute('INSERT INTO gpsdata(Lat,Lon,DistAcc,Alt,ChgAlt,AltAcc,Time,Date,Dist,Speed,Head) VALUES (?,?,?,?,?,?,?,?,?,?,?);', 
		curlat,curlon,curdistacc,curalt,altchange,curaltacc,curtime,curdateobj,distchange,speed,curhead);
    	db.close();
    	   	
    	printTotalDistance();
    	printTotalAltitude();
    	printAvgPace();
    	//currentPace.value='CURRENT PACE\n'+kmperhour.toFixed(2)+'\n'+'km/hr';
    	 	      
});
} 
 
 
// getDistance - Uses Haversine formula for calculating distance between two lat lon coords
 function getDistance(lat1,lon1,lat2,lon2){
    var R = 6371000; // in Meters
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);    
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
 
    return d;
}

// toRad - Returns radians from degrees
function toRad(degrees) {
    return degrees * Math.PI / 180;
};


function printStoredInfo(id){
	
var db = Ti.Database.open('testdb');
var result=db.execute('SELECT * FROM gpsdata WHERE ID=?;',id);
var id=result.fieldByName('ID');
var lat=result.fieldByName('Lat');
var lon=result.fieldByName('Lon');	
var dist=result.fieldByName('Dist');
var distacc=result.fieldByName('DistAcc');
var speed=result.fieldByName('Speed');
var alt=result.fieldByName('Alt');
var altacc=result.fieldByName('AltAcc');
var time=result.fieldByName('Time');
db.close();	
if(id==null)
{
id=0;
lat=0;
lon=0;
alt=0;
altacc=0;
distacc=0;
head=0;
speed=0;
dist=0;
time=0;	
}
if(speed==null)
{speed=0;};
dist=dist/1000;
currentActivityInfo.value=(
		'ID: '+id+'\n\n'+
		'Time: '+time+' secs\n\n'+
		'Distance: '+dist.toFixed(2)+' km\n'+
		'Dist Acc: '+distacc.toFixed(4)+' m\n\n'+
		'Speed: '+speed.toFixed(2)+' km/h\n\n'+
		'Alt: '+alt.toFixed(2)+' m\n'+
		'Alt Acc: '+altacc.toFixed(4)+' m\n\n'+
		'Latitude: '+lat.toFixed(5)+'\n'+
		'Longitude: '+lon.toFixed(5)+'\n'
		);

};

//printTotalDistance - Prints total distance from database
function printTotalDistance(){
var db = Ti.Database.open('testdb');
//Ignore the first 5 seconds of data and anything faster than usain bolt
var result=db.execute('SELECT sum(Dist) AS TotDist FROM gpsdata WHERE Time>5 AND DistAcc<=30;');
var totdist=result.fieldByName('TotDist');
db.close();
//convert to kilometers
totdist=totdist/1000;
distance.value='DISTANCE\n'+totdist.toFixed(2)+'\n'+'Kilometers';
};

//printTotalAltitude - Prints total altitude from database
function printTotalAltitude(){
var db = Ti.Database.open('testdb');
var result=db.execute('SELECT sum(ChgAlt) AS TotAlt FROM gpsdata WHERE Time>5 AND AltAcc<=10;');
var totalt=result.fieldByName('TotAlt');
db.close();
if(totalt==null)
{totalt=0;};
altitude.value='ALTITUDE\n'+totalt.toFixed(2)+'\n'+'Meters';
};

function printAvgPace(){
var db = Ti.Database.open('testdb');
//Ignore the first 5 seconds of data and anything faster than usain bolt
var result=db.execute('SELECT sum(Dist) AS TotDist FROM gpsdata WHERE Time>5 AND DistAcc<=30;');
var totdist=result.fieldByName('TotDist');
db.close();
//convert to kilometers
tottime=Clock.currentSeconds();
avgspeed=totdist/tottime;
avgspeedkmphr=avgspeed*3.6;
if(avgspeed==null || isNaN(avgspeed) || !isFinite(avgspeed))
{avgspeed=0;};
currentPace.value='AVERAGE PACE\n'+avgspeed.toFixed(2)+'\n'+'km/hr';
};


//updateMap - Update location on map and place marker
function updateMap(){
var db = Ti.Database.open('testdb');
var result=db.execute('SELECT * FROM gpsdata WHERE ID=(SELECT MAX(ID) FROM gpsdata);');
var lat=result.fieldByName('Lat');
var lon=result.fieldByName('Lon');
db.close();

  	var region={
    latitude: lat,
    longitude: lon,
    animate:true,
    latitudeDelta:0.001,
    longitudeDelta:0.001
	};
	mapview.setLocation(region);
};

//niceTimeFromMilliseconds - Returns time in proper format
function niceTimeFromMilliseconds(ms)
{
    var total_seconds = ms / 1000;
    var minutes = Math.floor(total_seconds / 60);
    var seconds = total_seconds - (minutes * 60) - 0.499;
    //499miliseconds subtracted before rounding up in the interest of accuracy
 
    if (minutes < 9 && seconds < 9) {
        return "0" + minutes + ":" + "0" + Math.round(seconds);
    }
    if (minutes < 9 && seconds > 9) {
        return "0" + minutes + ":" + Math.round(seconds);
    }if (minutes > 9 && seconds < 9) {
        return minutes + ":" + "0" + Math.round(seconds);
    }  
    return  minutes + ":" + Math.round(seconds);
}

// Stopwatch Class
var Clock = {
    totalSeconds : 0,
    currentSeconds : function(){
    	return this.totalSeconds;
    },
    start : function() {
 
        var self = this;
 
        this.interval = setInterval(function() {
            self.totalSeconds += 1;
 
            var hours = Math.floor(self.totalSeconds / 3600);
            if(hours<10)
            {hours='0'+hours;}
            var min = Math.floor(self.totalSeconds / 60 % 60);
            if(min<10)
            {min='0'+min;}
            var sec = parseInt(self.totalSeconds % 60);
            if(sec<10)
            {sec='0'+sec;}
            timerLabel.value = 'TIME \n'+'' + hours + ':' + min + ':' + sec;
        }, 1000);
    },
 
    pause : function() {
 
        clearInterval(this.interval);
        delete this.interval;
 
    },
 
    resume : function() {
        if (!this.interval)
            this.start();
    },
    stop : function() {
        clearInterval(this.interval);
    },
    reset : function() {
        clearInterval(this.interval);
        this.totalSeconds = 0;
        timerLabel.text = '0:0:0';
 
    }
};

