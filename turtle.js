function forward(distance, first){
	first = first || false;
	var line=document.createElement("div");
	if(lineWidth < 1){
		lineWidth=1;
		color="#333333";
	}
	line.style.background=color;
	line.style.width=lineWidth;
	line.style.height=distance;
	line.style.position="absolute";
	if(iteration>0){
		line.style.bottom=screenHeight-y-10;
	}
	else{
		line.style.bottom=y;
	}
	line.style.left=x;
	line.style.transform="rotate(" + rotation + ")";
	line.style.transformOrigin="bottom center";
	line.addEventListener("mouseover",function(){clickHandler()}, false);
	line.onclick=function(){
		console.log("no way");
	}
	currentGen.appendChild(line);
	if(first){
		branch_nodes.push([new Branch(line, iteration, rotation)]);	
	}
	else{
		subset.push(new Branch(line, iteration+1, rotation));
	}
	return line.getBoundingClientRect();
}

function rotate(degree){
	rotation=degree+"deg";
}
