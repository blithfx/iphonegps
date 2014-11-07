var win = Ti.UI.createWindow({backgroundColor:'#ccc'});
var isRunning = false;
var btn = Ti.UI.createButton({
	title:'start',
	bottom:10,
	height:50,
	left:10,
	right:10
});
var sliderx = Ti.UI.createSlider({
	width:240,
	max:1.0,
	min:-1.0,
	value:0
});
var t = Titanium.UI.create2DMatrix();
    t = t.rotate(-90);var slidery = Ti.UI.createSlider({
	height:240,
	transform:t,
	max:1.0,
	min:-1.0,
	value:0
});

win.add(sliderx);
win.add(slidery);
win.add(btn);
win.open({modal:true});
 
function accel(e){
	sliderx.value = e.x;
	slidery.value = e.y;
}
 
var stopPedometer = function(){
	Titanium.Accelerometer.removeEventListener('update', accel);
};
var startPedometer = function(){
	Titanium.Accelerometer.addEventListener('update', accel);
};
 
btn.addEventListener('click', function(){
	if( isRunning ) {
		btn.title = 'start';
		stopPedometer();
	} else {
		btn.title = 'stop';
		startPedometer();
	}
	switch(isRunning){
		case true: isRunning = false; break;
		case false: isRunning = true; break;
	}
});
