var branch_nodes = [];
var tree_list = [];

function Branch(rep, gen, angle){
	this.rep = rep;
	this.gen = gen;
	this.angle = angle;
	var coordinates = rep.getBoundingClientRect();
	angle=parseInt(angle.split("deg")[0]);
	var originalAngle=angle;
	// define susceptibility
	var sus = gen**2/80;
	var difChange = Math.random()*(-0.05 - 0.05) + 0.05;
	var maxDif = (sus+difChange)*100;
	var direction=1;

	// Shake Method
	var shakeDiff = Math.floor(Math.random()*(-5-5)+5);
	var originalInc=false;
	var shakeDir=2;
	
	this.shake = function(increm){
		if(originalInc==false){
			originalInc=increm;
			shaking=true;
		}
		if((increm-originalInc) % 10==0){
			shakeDir=-1;
			if((increm-originalInc) % 20 == 0){
				shakeDir=2;
			}
		}
	}

	// Move Method
	var shaking=false;
	this.move = function(children){
		maxDif = maxDif+wind;
		var inc=0;
		var a=1;

		var moveCount=0;
		var oldWind=wind;
		var moving = setInterval(function(){
			a=1;
			if(inc==0){
				while(inc < children.length){
					children[inc].move([]);
					//children[inc].follow(coordinates);
					inc++;
				}
			}
			if(gen>0){
				// If the branch hasn't reached it's max angle difference
				if(Math.abs(angle-originalAngle) <= maxDif && !shaking){
					angle=angle-wind*sus;
					this.angle=angle;
				}
				else{
					// Start Shaking
					// while(a < children.length){
					// 	children[a].shake(inc);
					// 	a++;
					// }
					// a=1;
					// angle=angle+wind*sus*shakeDir;
					// this.angle=angle;
				}
			}

			// Make children follow parent branch
			coordinates=rep.getBoundingClientRect();
			while(a < children.length){
				children[a].follow(coordinates, angle);
				a++;
			}

			// if wind stops
			if(wind==0){
				clearInterval(moving);
				inc=0;
				a=1;
				difChange=Math.floor(Math.random()*(-12+2)+2);
				originalAngle=originalAngle+difChange;

				// start setback
				this.partTwo = setInterval(function(){
					coordinates=rep.getBoundingClientRect();
					a=1;
					// if(inc==0){
					// 	while(inc < children.length){
					// 		//children[inc].move([]);
					// 		//children[inc].follow(coordinates);
					// 		inc++;
					// 	}
					// }
					angle=angle+(oldWind*sus)/7;
					this.angle=angle;
					while(a < children.length){
						children[a].follow(coordinates, angle);
						a++;
					}
					if(angle>=originalAngle-(gen/2) && angle <=originalAngle+(gen/2) || angle<= originalAngle+(gen/2) && angle>=originalAngle-(gen/2) || inc > 500){
						a = 1;
						while(a < children.length){
							clearInterval(children[a].partTwo);
							a++;
						}
						if(gen==1){
							clearInterval(partTwo);
						}
					}
					else{
						rep.style.transform="rotate(" + angle + "deg)";
					}
					inc++;
				},10);
			}


			inc++;
			rep.style.transform="rotate(" + angle + "deg)";
		},10);
	}
	this.follow = function(coors, a){
		if(a >= 0){
			rep.style.left=coors.right-1;
		}
		else{
			rep.style.left=coors.left+1;
		}
		rep.style.bottom=screenHeight-coors.top-getPX("height",15)-5;
	}

}