// Define Branch Class
// rep = Visual Representation ( HTML element )
// gen = Generation ( Integer )

var branch_nodes = [];
var tree_list = [];

var wind=0;
var wind_duration=0;

function Branch(rep, gen, angle){
	this.rep = rep;
	this.gen = gen;
	this.angle = angle;

	this.stillFollowing = false;

	var younglings = ["yo"];
	var coordinates = rep.getBoundingClientRect();
	this.coordinates=coordinates;
	angle=parseInt(angle.split("deg")[0]);
	var originalAngle=angle;
	// define susceptibility
	var sus = gen**2/60;
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
		if(children.length > 0){
			younglings=children;
		}
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
			this.coordinates=coordinates;
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

				this.stillFollowing=true;
				var subFollowing;

				// start setback
				var partTwo = setInterval(function(){
					coordinates=rep.getBoundingClientRect();
					a=1;

					// Angle change
					angle=angle+(oldWind*sus)/7;

					// have children follow
					// - recursive through generations if grandchildren aren't following
					while(a < children.length){
						children[a].follow(coordinates, angle);
						for(i=1;i<children[a].getChildren().length;i++){
							subFollowing=children[a].getChildren()[i];
							if(subFollowing.stillFollowing==false){
								subFollowing.follow(children[a].getCoordinates(), children[a].getAngle());
								// for(b = 0; b < maxIterations - (gen+1); b++){
								// 	if(subFollowing.getChildren().length > 1){

								// 	}
								// }
							}
						}
						a++;
					}


					if(angle>=originalAngle+5 && angle <= originalAngle+5 || angle<= originalAngle+5 && angle>=originalAngle-5 || inc > 200){
						clearInterval(partTwo);
						this.stillFollowing=false;
						// if(children.length>0){
						// 	var whileInc = 1;
						// 	while(whileInc < children.length){
						// 		//children[0].getChildren()[whileInc].follow(coordinates,angle);
						// 		whileInc++;
						// 	}
						// }
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

	this.getChildren = function(){
		return younglings;
	}

	this.getAngle = function(){
		return angle;
	}

	this.getCoordinates = function(){
		return coordinates;
	}

}

function moveChildren(gen, tree, node, bran, increment){
	var finished=false;
	var i=0;
	var genInc=0;

	//var coordinates = tree_list[tree][gen][0][node].rep.getBoundingClientRect();
	var children=[tree_list[tree][gen][bran][node]];
	// console.log(tree_list[tree][gen][bran][node].rep);

	for(i=0;i<tree_list[tree][gen+1][node].length;i++){
		// console.log(tree_list[tree][gen+1][increment][i].rep);
		children.push(tree_list[tree][gen+1][increment][i]);	}
	tree_list[tree][gen][bran][node].move(children);

}

function startMoving(gen){
	var children_inc=0;
	for(z=0; z < tree_list.length;z++){
		children_inc=0;
		for(x = 0; x < tree_list[z][gen].length;x++){
			for(y=0;y < tree_list[z][gen][x].length;y++){
				//console.log(tree_list[z][gen][y][x].rep)
				moveChildren(gen,z, y, x, children_inc);
				children_inc++;
			}
		}
	}
	if(gen+1 != maxIterations){
		startMoving(gen+1);
	}
}

function startWind(magnitude,duration){
	wind=(magnitude / 50) * (maxIterations);
	wind_duration=duration;
	startMoving(1);
	setTimeout(function(){
		wind=0;
		wind_duration=0;
	},duration-10);
}
