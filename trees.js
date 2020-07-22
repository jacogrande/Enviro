var length;
var lastPos;
var lastAngle;
var oddDeg=40;
var branchOdds=[1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3];
var trees=-1;

var currentGen;

function plantTree(x_in){

	turtleSpace = document.getElementById("turtleSpace");
	y=0;
	x=x_in;
	lineWidth=Math.floor(Math.random()*(8-5)+5);
	widthChange=Math.random()*(0.8-0.7)+0.7;
	lineChange=0.9;
	rotation="0deg";
	origin="0% 0%"
	iteration=0;
	branch_nodes=[];

	var scale = Math.random()*(1 - 0.8) + 0.8;
	var trunkHeight = Math.floor(Math.random()*(125 - 75) + 75);

	iteration=0;
	length=trunkHeight * scale;
	lineWidth=lineWidth * scale;
	trees++;

	currentGen=document.createElement("div");
	currentGen.id="gen"+(iteration)+"_"+trees;

	turtleSpace.appendChild(currentGen);

	forward(length, true);
	lastPos=[[x,y+length-10]];
	lastAngle=[rotation];
	oddDeg=40;
	grow();

}

var subset=[];

function grow(){
	widthChange-=0.05
	currentGen=document.createElement("div");
	currentGen.id="gen"+(iteration+1)+"_"+trees;
	turtleSpace.appendChild(currentGen);
	var branches=branchOdds[Math.floor(Math.random()*branchOdds.length)];
	// var branches = 1;
	// if(iteration>2){
	// 	branches=2;
	// }
	var randomDeg;
	var forwardOutput;
	var newPos=[];
	var newAngles=[];

	var genSet=[];
	length=length*lineChange;
	lineWidth=lineWidth*widthChange;
	for(a=0;a<lastPos.length;a++){
		subset=[];
		for(i=0;i<branches;i++){
			coordinates = [];
			x=lastPos[a][0];
			y=lastPos[a][1];
			
			randomDeg=Math.floor(Math.random() * (-oddDeg - oddDeg) + oddDeg);
			
			// rotate(randomDeg+lastAngle[a]);
			// newAngles.push(randomDeg+lastAngle[a]);

			rotate(randomDeg);

			forwardOutput=forward(length);
			subset.push()
			if(randomDeg <=0){
				coordinates.push(forwardOutput.left + 4 * widthChange);
			}
			else{
				coordinates.push(forwardOutput.right - 4 * widthChange);
			}
			coordinates.push(forwardOutput.top + getPX("height",15) - 1);
			
			newPos.push(coordinates);
		}
		genSet.push(subset);
	}

	branch_nodes.push(genSet);
	lastPos=newPos;
	iteration++;

	// lastAngle=newAngles;
	if(iteration<maxIterations){
		oddDeg=oddDeg*0.85;
		grow();
	}
	else{
		tree_list.push(branch_nodes);
	}
}