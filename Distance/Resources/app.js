//app.js - Main program
Ti.include("visualobjs.js");
Ti.include("functions.js");

// create new database if it doesn't already exist
var db = Ti.Database.open('testdb');
db.execute('DROP TABLE gpsdata;');
db.execute('CREATE TABLE IF NOT EXISTS gpsdata(ID INTEGER PRIMARY KEY AUTOINCREMENT, \
	Lat REAL,Lon REAL,DistAcc REAL,Alt REAL,ChgAlt REAL,AltAcc REAL,Time Real,Date Real,Dist REAL,Speed REAL,Head REAL);');
db.close();

// add tabs
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.open();

// add window buttons
//win1.add(currentActivityInfo);
win1.add(distance);
win1.add(currentPace);
win1.add(startBtn);
win1.add(stoptBtn);
win1.add(pauseBtn);
win1.add(resumeBtn);
win1.add(resetBtn);
win1.add(timerLabel);
win1.add(altitude);
win1.add(steps);


win2.add(currentActivityInfo);
win2.add(prevBtn);
win2.add(nextBtn);

// win1 button events

// initial values for displays
currentPace.value='AVERAGE PACE\n'+'0.00\n'+'km/hr';
distance.value='DISTANCE\n'+'0.00\n'+'Kilometers';
timerLabel.value='TIME\n'+'00:00:00\n';
altitude.value='ALTITUDE\n'+'0.00\n'+'Meters';
steps.value='STEPS\n'+'????\n';
    
startBtn.addEventListener('click', function(e) {
	
    Clock.start();
    
	if (Ti.Geolocation.locationServicesEnabled) {
	} else {
	    alert('Please enable location services');
	}
		

	Titanium.Geolocation.setAccuracy = Titanium.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.setActivityType(Ti.Geolocation.ACTIVITYTYPE_FITNESS);
	//Titanium.Geolocation.distanceFilter = 10;
	
	//var service = Ti.App.iOS.registerBackgroundService({
        //url:"bgService.js"});
	
	getInitialLocation();
	Titanium.Geolocation.addEventListener('location',getLocation);
});


stoptBtn.addEventListener('click', function(e) {
    Clock.stop();
    Titanium.Geolocation.removeEventListener('location',getLocation);
    //If stopped then need to upload location info from sqllite database to cloud
});
pauseBtn.addEventListener('click', function(e) {
    Clock.pause();   
});
 
resumeBtn.addEventListener('click', function(e) {
    Clock.resume();
});
 
resetBtn.addEventListener('click', function(e) {
    Clock.reset();
    Titanium.Geolocation.removeEventListener('location',getLocation);
    // reset labels
    currentPace.value='CURRENT PACE\n'+'0.00\n'+'km/hr';
	distance.value='DISTANCE\n'+'0.00\n'+'Kilometers';
	timerLabel.value='TIME\n'+'00:00:00\n';
	altitude.value='ALTITUDE\n'+'0.00\n'+'Meters';
	steps.value='STEPS\n'+'????\n';
	
	// delete all gps info from db
	var db = Ti.Database.open('testdb');
	db.execute('DELETE FROM gpsdata;');
	db.close();
	
	
	// reset click counter for next and previous buttons
	var db = Ti.Database.open('testdb');
	var result=db.execute('SELECT MAX(ID) AS maxid FROM gpsdata;');
	var maxid=result.fieldByName('maxid');
	db.close();
	clicks=maxid;
});

// win2 button events
var clicks=1;

nextBtn.addEventListener('click', function(e) {
printStoredInfo(clicks);
clicks=clicks+1;
var db = Ti.Database.open('testdb');
var result=db.execute('SELECT MAX(ID) AS maxid FROM gpsdata;');
var maxid=result.fieldByName('maxid');
db.close();
if(clicks>maxid)
{clicks=maxid;};

});

prevBtn.addEventListener('click', function(e) {	
clicks=clicks-1;
if(clicks<1)
{clicks=1;};
printStoredInfo(clicks);
});

// test for iOS 4+
function isiOS4Plus(){
	if (Titanium.Platform.name == 'iPhone OS'){
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0]);
		// can only test this support on a 3.2+ device
		if (major >= 4){
			return true;
		}
	}
	return false;
}
 
if (isiOS4Plus()){
 
	var service;
	
	// Ti.App.iOS.addEventListener('notification',function(e){
	// You can use this event to pick up the info of the noticiation. 
	// Also to collect the 'userInfo' property data if any was set
	//		Ti.API.info("local notification received: "+JSON.stringify(e));
	//	});
	// fired when an app resumes from suspension
	Ti.App.addEventListener('resume',function(e){
		Ti.API.info("app is resuming from the background");
	});
	Ti.App.addEventListener('resumed',function(e){
		Ti.API.info("app has resumed from the background");
		// this will unregister the service if the user just opened the app
		// is: not via the notification 'OK' button..
		if(service!=null){
			service.stop();
			service.unregister();
		}
                Titanium.UI.iPhone.appBadge = null;
	});
	Ti.App.addEventListener('pause',function(e){
		Ti.API.info("app was paused from the foreground");
		
		service = Ti.App.iOS.registerBackgroundService({url:'bgService.js'});
		Ti.API.info("registered background service = "+service);
		
	});
}


