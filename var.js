var turtleSpace = document.getElementById("turtleSpace");
var x = 250;
var y = 0;
var lineWidth=Math.floor(Math.random()*(9-5)+5);
var widthChange=Math.random()*(0.8-0.7)+0.7;
var lineChange=0.9;
var rotation="0deg";
var origin="0% 0%"
var maxIterations=5;
var iteration=0;
var screenHeight=document.getElementsByTagName("body")[0].clientHeight;
var color="#000";


function display(message, id){
	document.getElementById(id).innerHTML=message;
}

function getPX(attribute, percentage){
	if(attribute=="height"){
		var res = screenHeight;
	}
	return res * (percentage/100);1
}


