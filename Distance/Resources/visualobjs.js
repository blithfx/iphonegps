//visualobj.js - Contains button and window graphical object definitions

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


var tabGroup = Titanium.UI.createTabGroup();
var Map = require('ti.map');
//var mapview = Map.createView({mapType:Map.NORMAL_TYPE});


// Button and window or tab definitions
var win1 = Titanium.UI.createWindow({  
    title:'Cumulative Activity Info',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});
var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});
var win2 = Titanium.UI.createWindow({  
    title:'Current Activity Info',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 2',
    window:win2
});
var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

// ************************************* win1 buttons
var timerLabel = Ti.UI.createTextArea({
    text: "00:00",
    top: 10,
    width: 100,
    borderRadius:2,
	borderColor:'#cccccc',
	backgroundColor:'#eeeeee',
    height: 80,
    left: 110,
    font:{fontSize:20,fontFamily:'Helvetica Neue-Bold'}
});

var distance = Titanium.UI.createTextArea({
	borderRadius:2,
	borderColor:'#cccccc',
	backgroundColor:'#eeeeee',
	top:90,
	width:150,
	height:100,
	font:{fontSize:18,fontFamily:'Helvetica Neue-Bold'},
	editable:false,
	left:10
});

var currentPace = Titanium.UI.createTextArea({
	borderRadius:2,
	borderColor:'#cccccc',
	backgroundColor:'#eeeeee',
	top:90,
	width:150,
	height:100,
	font:{fontSize:18,fontFamily:'Helvetica Neue-Bold'},
	editable:false,
	left:160
});

var altitude = Titanium.UI.createTextArea({
	borderRadius:2,
	borderColor:'#cccccc',
	backgroundColor:'#eeeeee',
	top:190,
	width:150,
	height:100,
	font:{fontSize:18,fontFamily:'Helvetica Neue-Bold'},
	editable:false,
	left:10
});

var steps = Titanium.UI.createTextArea({
	borderRadius:2,
	borderColor:'#cccccc',
	backgroundColor:'#eeeeee',
	top:190,
	width:150,
	height:100,
	font:{fontSize:18,fontFamily:'Helvetica Neue-Bold'},
	editable:false,
	left:160
});


//Stopwatch buttons
var startBtn = Ti.UI.createButton({
    title:'Start',
	width:100,
	borderRadius:2,
	borderColor:'#cccccc',
	top:290,
	height:30,
	left:20,
	backgroundColor:'green',
	color:'white'
});
var stoptBtn = Ti.UI.createButton({
    title:'Stop',
	width:100,
	borderRadius:2,
	borderColor:'#cccccc',
	top:290,
	height:30,
	left:200,
	backgroundColor:'red',
	color:'white'
});
var pauseBtn = Ti.UI.createButton({
    title:'Pause',
	width:100,
	borderRadius:2,
	borderColor:'#cccccc',
	top:330,
	height:30,
	left:20,
	backgroundColor:'blue',
	color:'white'
});
var resumeBtn = Ti.UI.createButton({
    title:'Resume',
	width:100,
	borderRadius:2,
	borderColor:'#cccccc',
	backgroundColor:'#eeeeee',
	top:330,
	height:30,
	left:200,
	backgroundColor:'orange',
	color:'white'
});
var resetBtn = Ti.UI.createButton({
    title:'Reset',
	width:60,
	borderRadius:2,
	top:330,
	height:30,
	backgroundColor:'black',
	color:'white'
});

// *********************************** win2 buttons
var currentActivityInfo = Titanium.UI.createTextArea({
	borderRadius:2,
	borderColor:'#cccccc',
	backgroundColor:'#eeeeee',
	top:10,
	width:240,
	height:270,
	editable:false,
	font:{fontSize:16,fontFamily:'Helvetica Neue-Bold'}
});
//create map
//var Map = require('ti.map'); 
var nextBtn = Ti.UI.createButton({
    title:'Next',
	width:100,
	borderRadius:2,
	borderColor:'#cccccc',
	top:300,
	height:30,
	left:210,
	backgroundColor:'green',
	color:'white'
});
var prevBtn = Ti.UI.createButton({
    title:'Prev',
	width:100,
	borderRadius:2,
	borderColor:'#cccccc',
	top:300,
	height:30,
	left:10,
	backgroundColor:'green',
	color:'white'
});





