/*******************************************************
 * USE STRICT
 *******************************************************/
'use strict';

/*******************************************************
 * HTML OBJECTS
 *******************************************************/
const sldNumSides = document.getElementById('sldNumSides');
const sldRadius   = document.getElementById('sldRadius');
const sldSpeed    = document.getElementById('sldSpeed');
const lblNumSides = document.getElementById('lblNumSides');
const lblRadius   = document.getElementById('lblRadius');
const lblSpeed    = document.getElementById('lblSpeed');
const chkPolygram = document.getElementById('chkPolygram');
const chkCircle   = document.getElementById('chkCircle');
const gc          = document.getElementById('canvas');
const ctx         = gc.getContext('2d');

/*******************************************************
 * GLOBAL CONSTANTS
 *******************************************************/
const GCW        = gc.width;
const GCH        = gc.height;
const FPS        = 50;
const COLOR_BG   = '#000000';
const MIN_SIDES  = 3;
const MAX_SIDES  = 50;
const DEF_SIDES  = 10;
const MIN_RADIUS = 25;
const MAX_RADIUS = Math.min(GCW, GCH) / 2 - 5;
const DEF_RADIUS = 100;
const MIN_VEL    = -300;
const MAX_VEL    = 300;
const DEF_VEL    = 0;

/*******************************************************
 * OBJECT 1
 *******************************************************/
var obj1 =
{
	/****************************************************
	 * OBJECT 1 : MEMBERS
	 ****************************************************/
	pos:      [GCW / 2, GCH / 2],
	a:        0.0,
	da:       DEF_VEL * 0.01,
	color1:   '#ff7f00',
	color2:   '#007fff',
	color3:   '#007fff',
	numSides: DEF_SIDES,
	radius:   DEF_RADIUS,
	points:   [],
	polygram: false,
	circle:   false,
	
	/****************************************************
	 * OBJECT 1 : INITIALIZE
	 ****************************************************/
	init: function(numSides, radius)
	{
		if (numSides >= MIN_SIDES)
			this.numSides = numSides;
		else
			this.numSides = MIN_SIDES;
		
		if (radius >= MIN_RADIUS)
		    this.radius = radius;
		else
		    this.radius = MIN_RADIUS;
		
		while (this.points.length > 0)
			this.points.pop();
			
		this.points = genRegPolyPoints(this.numSides, this.radius);
	},
	
	/****************************************************
	 * OBJECT 1 : DRAW
	 ****************************************************/
	draw: function()
	{
		ctx.lineWidth = 2;
		
		// draw the center
		ctx.fillStyle = this.color1;
		var cx = this.pos[0];
		var cy = this.pos[1];
		ctx.fillRect(cx - 1, cy - 6,  2, 12);
		ctx.fillRect(cx - 6, cy - 1, 12,  2);
		
		if (this.circle)
		{
		   // draw the circumscribing circle
		   ctx.strokeStyle = this.color2;
		   ctx.beginPath();
		   ctx.arc(cx, cy, this.radius, 0, 2 * Math.PI);
		   ctx.stroke();
		}
		
		// generate new points
		let points = [];
		for (let i = 0; i < this.points.length; i++)
		{
			points.push(rotate(this.points[i], this.pos, this.a));
		}
		let start = points[0];
		
		// draw outside polygon
		ctx.strokeStyle = this.color1;
		ctx.beginPath();
		ctx.moveTo(start[0], start[1]);
		for (let i = 1; i < this.numSides; i++)
		{
			ctx.lineTo(points[i][0], points[i][1]);
		}
		ctx.lineTo(start[0], start[1]);
		ctx.stroke();
		
		if (this.polygram)
		{
		   // specify number of polygrams
		   var numPolygrams;
		   if (this.numSides % 2 === 0)
		      numPolygrams = 2;
		   else
		      numPolygrams = 1;
		
		   // draw inside polygram
		   ctx.strokeStyle = this.color3;
		   ctx.beginPath();
		   ctx.moveTo(start[0], start[1]);
		   for (let i = 0; i < this.numSides / numPolygrams; i++)
		   {
		      let j = (i * 2) % this.numSides;
		      ctx.lineTo(points[j][0], points[j][1]);
		   }
		   ctx.lineTo(start[0], start[1]);
		
		   // if even number of sides, we need to draw another polygram
		   if (numPolygrams === 2)
		   {
		      ctx.moveTo(points[1][0], points[1][1]);
		      for (let i = 1; i < this.numSides / numPolygrams; i++)
		      {
		         let j = (i * 2 + 1) % this.numSides;
		         ctx.lineTo(points[j][0], points[j][1]);
				
		         console.log('i:', i, 'j:', j);
			   }
			   ctx.lineTo(points[1][0], points[1][1]);
           }
		
		   // finish
		   ctx.stroke();
		}
	},
	
	/****************************************************
	 * OBJECT 1 : UPDATE
	 ****************************************************/
	update: function()
	{
		// rotate
		this.a += this.da;
		if (this.a > 360)
			this.a = a - 360;
	    else if (this.a < 0)
	        this.a = 360 - a;
	}
};

/*******************************************************
 * CONVERT DEGREES TO RADIANS
 *******************************************************/
function degToRad(deg)
{
	return (deg * Math.PI) / 180;
}

/*******************************************************
 * CONVERT RADIANS TO DEGREES
 *******************************************************/
function radToDeg(rad)
{
	return (rad * 180) / Math.PI;
}

/*******************************************************
 * CONVERT DEGREES TO RADIANS
 *******************************************************/
function genRegPolyPoints(num, radius)
{
	var points = [];
	var dtheta = (2 * Math.PI) / num;
	
	for (var i = 0; i < num; i++)
	{
		var x = radius * Math.cos(i * dtheta);
		var y = radius * Math.sin(i * dtheta);
		
		points.push([x, y]);
	}
	
	return points;
}

/*******************************************************
 * ROTATE POINT AROUND CENTER
 *******************************************************/
function rotate(point, center, angle)
{
	if (angle)
		angle = degToRad(angle);
	else
		angle = 0;
	
	var x = point[0] * Math.cos(angle) - point[1] * Math.sin(angle);
	var y = point[0] * Math.sin(angle) + point[1] * Math.cos(angle);
	
	return [x + center[0], y + center[1]];
}

/*******************************************************
 * DRAW BACKGROUND
 *******************************************************/
function drawBG()
{
   ctx.fillStyle = COLOR_BG;
   ctx.fillRect(0, 0, GCW, GCH);
}

/*******************************************************
 * DRAW ALL
 *******************************************************/
function drawAll()
{
	drawBG();
	obj1.draw();
}

/*******************************************************
 * UPDATE ALL
 *******************************************************/
function updateAll()
{
	obj1.update();
}

/*******************************************************
 * RUN
 *******************************************************/
function run()
{
   drawAll();
   updateAll();
}

/*******************************************************
 * WINDOW : ON LOAD
 *******************************************************/
window.onload = function()
{
   sldNumSides.min   = MIN_SIDES;
   sldNumSides.max   = MAX_SIDES;
   sldNumSides.tick  = 1;
   sldNumSides.value = DEF_SIDES;
   
   sldRadius.min     = MIN_RADIUS;
   sldRadius.max     = MAX_RADIUS;
   sldRadius.value   = DEF_RADIUS;
   
   sldSpeed.min      = MIN_VEL;
   sldSpeed.max      = MAX_VEL;
   sldSpeed.tick     = 1;
   sldSpeed.value    = DEF_VEL * 0.01;
   
   lblNumSides.innerHTML = DEF_SIDES;
   lblRadius.innerHTML   = DEF_RADIUS;
   lblSpeed.innerHTML    = DEF_VEL;
   
   chkPolygram.checked = false;
   chkCircle.checked   = false;
   
   obj1.init(DEF_SIDES, DEF_RADIUS);
   obj1.da = DEF_VEL;
   setInterval(run, 1000/FPS);
};

/*******************************************************
 * NUMBER-OF-SIDES SLIDER : ON INPUT
 *******************************************************/
sldNumSides.oninput = function()
{
	var radius = obj1.radius;
	obj1.init(this.value, radius);
	
	lblNumSides.innerHTML = this.value;
};

/*******************************************************
 * RADIUS SLIDER : ON INPUT
 *******************************************************/
sldRadius.oninput = function()
{
	var sides = obj1.numSides;
	obj1.init(sides, this.value);
	
	lblRadius.innerHTML = this.value;
};

/*******************************************************
 * SPEED SLIDER : ON INPUT
 *******************************************************/
sldSpeed.oninput = function()
{
	obj1.da = this.value * 0.01;
	
	lblSpeed.innerHTML = this.value;
};

/*******************************************************
 * POLYGRAM CHECK BOX : ON CHANGE
 *******************************************************/
chkPolygram.onclick = function()
{
	obj1.polygram = this.checked;
};

/*******************************************************
 * CIRCLE CHECK BOX : ON CHANGE
 *******************************************************/
chkCircle.onclick = function()
{
	obj1.circle = this.checked;
};