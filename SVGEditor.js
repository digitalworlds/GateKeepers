preload("SVG.js");


//This is an auxiliary function to make SVG elements
var newShape=function(shapeType,options){
	
	var element=document.createElementNS("http://www.w3.org/2000/svg",shapeType);
	
	for(var name in options){
		
		element.setAttribute(name,options[name]);
		
	}
	
	return element;
}


var EllipseEditor=function(options,options2){
	
	
	this.cx=options.cx;
	this.cy=options.cy;
	this.rx=options.rx;
	this.ry=options.ry;
	
	this.style=options;
	delete this.style.cx;
	delete this.style.cy;
	delete this.style.rx;
	delete this.style.ry;
	
	ShapeGroupEditor.call(this,{},options2);
	
	this.shape=newShape("ellipse",this.style);
	this.g.appendChild(this.shape);
	
	this.createAnchors({x:this.cx-this.rx,y:this.cy-this.ry,width:this.rx*2,height:this.ry*2});
	
}


//This method exports the static version of this shape into a static parent
EllipseEditor.prototype.exportSVGElement=function(parent){
	var properties={cx:this.cx,cy:this.cy,rx:this.rx,ry:this.ry};
	for(var p in this.style)properties[p]=this.style[p];
	parent.ellipse(properties);
};

EllipseEditor.prototype.renderShape=function(){
	
	this.shape.setAttribute("cx",0);
	this.shape.setAttribute("cy",0);
	this.shape.setAttribute("rx",Math.max(0,this.width/2));
	this.shape.setAttribute("ry",Math.max(0,this.height/2));
}


var RectEditor=function(options,options2){
	
	this.x=options.x;
	this.y=options.y;
	this.width=options.width;
	this.height=options.height;
	
	this.style=options;
	delete this.style.x;
	delete this.style.y;
	delete this.style.width;
	delete this.style.height;
	
	ShapeGroupEditor.call(this,{},options2);
	
	this.shape=newShape("rect",this.style);
	this.g.appendChild(this.shape);
	
	this.createAnchors({x:this.x,y:this.y,width:this.width,height:this.height});
	
}


RectEditor.prototype.exportSVGElement=function(parent){
	var properties={x:this.x,y:this.y,width:this.width,height:this.height};
	for(var p in this.style)properties[p]=this.style[p];
	parent.rect(properties);
};

RectEditor.prototype.renderShape=function(){
	this.shape.setAttribute("x",-this.width/2);
	this.shape.setAttribute("y",-this.height/2);
	this.shape.setAttribute("width",Math.max(0,this.width));
	this.shape.setAttribute("height",Math.max(0,this.height));
}


var ImageEditor=function(options,options2){
	
	
	this.x=options.x;
	this.y=options.y;
	this.width=options.width;
	this.height=options.height;
	if(options.angle)this.angle=options.angle;
	else this.angle=0;
	
	this.style=options;
	delete this.style.x;
	delete this.style.y;
	delete this.style.width;
	delete this.style.height;
	delete this.style.angle;
	
	ShapeGroupEditor.call(this,{},options2);
	this.shape=newShape("image",this.style);
	this.g.appendChild(this.shape);
	
	this.createAnchors({x:this.x,y:this.y,width:this.width,height:this.height,angle:this.angle});
	
}



ImageEditor.prototype.exportSVGElement=function(parent){
	var properties={x:this.x,y:this.y,width:this.width,height:this.height};
	for(var p in this.style)properties[p]=this.style[p];
	parent.image(properties);
};

ImageEditor.prototype.renderShape=function(){
	this.shape.setAttribute("x",-this.width/2);
	this.shape.setAttribute("y",-this.height/2);
	this.shape.setAttribute("width",Math.max(0,this.width));
	this.shape.setAttribute("height",Math.max(0,this.height));
}



var TextEditor=function(options,options2){
	
	
	this.x=options.x;
	this.y=options.y;
	this.text=options.text;
	
	this.style=options;
	delete this.style.x;
	delete this.style.y;
	delete this.style.text;
	
	ShapeGroupEditor.call(this,{},options2);
	
	this.canResize=false;
	
	this.shape=newShape("text",this.style);
	this.g.appendChild(this.shape);
	
	this.shape.innerHTML=this.text;
	
	this.createAnchors({x:this.x,y:this.y,width:0,height:0});
}


TextEditor.prototype.exportSVGElement=function(parent){
	var properties={x:this.x,y:this.y,width:this.width,height:this.height};
	for(var p in this.style)properties[p]=this.style[p];
	parent.text(properties,this.text);
};

TextEditor.prototype.renderShape=function(){
	this.shape.setAttribute("x",0);
	this.shape.setAttribute("y",0);
}



var SVGEditor=function(options){
	
	
	this.svgns="http://www.w3.org/2000/svg";
	this.svg=document.createElementNS(this.svgns,"svg");
	
	for(var arg in options){
		
		this.svg.setAttribute(arg,options[arg]);
	}
	
	ShapeGroupEditor.call(this,{});
	this.initRoot();
	this.svg.appendChild(this.g);
	
	this.padding=0;
	this.setExternalScale(1);
	this.setSize(1000,1000);
}

SVGEditor.prototype.stopEditing=function(){
	if(this.editingShape)this.editingShape.stopEditing();
}

SVGEditor.prototype.pickPoint=function(){
	if(this.pick_p){
		this.pick_p.abort();
	}
	
	this.stopEditing();
	this.pick_p=new opn.Promise(this);
	
	this.pick_p.keydown=(e)=>{
		if(e.keyCode==16)return;//Handle ShiftLeft activated when scrolling with touchpad
		this.pick_p.abort();
	}
	document.addEventListener('keydown',this.pick_p.keydown);
	
	this.pick_p.ifAborted(()=>{
			document.removeEventListener('keydown',this.pick_p.keydown);
			this.pick_p=null;
		})
	
	return this.pick_p;
}

SVGEditor.prototype.setExternalScale=function(scale){
	this.scale=scale;
	return this;
}

SVGEditor.prototype.setExternalPadding=function(padding){
	this.padding=padding;
	this.g.setAttribute("transform","translate("+this.padding+","+this.padding+")");
	this.svg.setAttribute("width",(this.width+this.padding*2)+"px");
	this.svg.setAttribute("height",(this.height+this.padding*2)+"px");
	return this;
}

SVGEditor.prototype.setSize=function(width,height){
	this.width=width;
	this.height=height;
	this.svg.setAttribute("width",(this.width+this.padding*2)+"px");
	this.svg.setAttribute("height",(this.height+this.padding*2)+"px");
	return this;
}

SVGEditor.prototype.getWidth=function(){return this.width+this.padding*2;}

SVGEditor.prototype.getHeight=function(){return this.height+this.padding*2;}

SVGEditor.prototype.exportSVG=function(){
	
	var mySVG=new SVG();
	
	for(var i=0;i<this.children.length;i++){
		this.children[i].exportSVGElement(mySVG);
	}
	
	return mySVG;
}

var ShapeGroupEditor=function(options,options2){
	
	this.canResize=true;if(options2&&typeof options2.canResize!='undefined')this.canResize=options2.canResize;
	this.canMove=true;if(options2&&typeof options2.canMove!='undefined')this.canMove=options2.canMove;
	//this.canRotate=true;if(options2&&typeof options2.canRotate!='undefined')this.canRotate=options2.canRotate;
	this.canSelect=true;if(options2&&typeof options2.canSelect!='undefined')this.canSelect=options2.canSelect;
	
	this.svgns="http://www.w3.org/2000/svg";
	
	this.g=document.createElementNS(this.svgns,"g");
	
	
	for(var arg in options){
		
		this.g.setAttribute(arg,options[arg]);
	};
	
	this.children=[];
	
	this.bounding_box=newShape("rect",{stroke:'red','stroke-width':5,'stroke-dasharray':15,fill:'rgba(0,0,0,0)',style:'display:none;'});
	this.g.appendChild(this.bounding_box);
	
	
}

ShapeGroupEditor.prototype.initRoot=function(){
	this.root=this;
	this.svg.addEventListener("mousedown",(event)=>{
			if(this.editingShape&&this.editingShape!=this)this.editingShape.stopEditing();
			if(this.pick_p){
				
				var cx=event.clientX;
				var cy=event.clientY;
				var rect=this.svg.getBoundingClientRect();
				this.pick_p.callThen({object:{x:(event.clientX-rect.left)/this.scale-this.padding,y:(event.clientY-rect.top)/this.scale-this.padding}});
				this.pick_p.abort();
				
				event.stopPropagation();
			}
		});
}

ShapeGroupEditor.prototype.append=function(child){
	child.parent=this;
	child.root=this;
	while(child.root.parent)child.root=child.root.parent;
	
	//We must update here the children's root if any in child.children
	var updateRoot=function(element,root){
		element.root=root;
		for(var i=0;i<element.children;i++)
		updateRoot(element.children[i],root);
	}
	updateRoot(child,child.root);
	
	this.children.push(child);
	this.g.appendChild(child.g);
	
	child.rerender();
	return child;
}

ShapeGroupEditor.prototype.remove=function(){
	if(this.parent){
		this.g.remove();
		var found=false;
		var i=this.parent.children.indexOf(this);
		if(i>-1)this.parent.children.splice(i,1);
		this.parent=null;
		this.root=null;
	}
}

ShapeGroupEditor.prototype.removeAll=function(){
	for(var i=0;i<this.children.length;i++){
		this.children[i].g.remove();
		this.children[i].parent=null;
		this.children[i].root=null;
	}
	this.children=[];
}

ShapeGroupEditor.prototype.getParent=function(){return this.parent;};
ShapeGroupEditor.prototype.getRoot=function(){return this.root;};

ShapeGroupEditor.prototype.whenSelected=function(){
	if(this.selected_p)return this.selected_p;
	this.selected_p=new opn.Promise(this);
	return this.selected_p;
}

ShapeGroupEditor.prototype.createAnchors=function(options){
	
	if(options.angle)this.angle=options.angle;
	else this.angle=0;
	this.width=options.width;
	this.height=options.height;
	this.cx=options.x+this.width/2;
	this.cy=options.y+this.height/2;
	
	this.editing=false;
	
	this.cornerSize=10;
	
	
	var style={fill:"gray",stroke:'black',style:'transition: opacity .4s ease;','stroke-width':5};
	this.upper_left=newShape("rect",style);
	this.upper_right=newShape("rect",style);
	this.lower_left=newShape("rect",style);
	this.lower_right=newShape("rect",style);
	this.top=newShape("rect",style);
	this.bottom=newShape("rect",style);
	this.left=newShape("rect",style);
	this.right=newShape("rect",style);
	this.rotator=newShape("ellipse",style);
	style.style='transition: opacity .4s ease;pointer-events:none;';
	this.center=newShape("ellipse",style);

	this.upper_right.setAttribute("fill", "red"); // Set a distinct color to indicate deletion
    //this.upper_right.setAttribute("stroke", "black"); // Optional: Adjust styling as needed
    this.upper_right.textContent = "X"; // Add text content if desired, though it might not display without additional text elements

    // Adjust the size if necessary for the delete functionality
    this.upper_right.setAttribute("width", 30); // Adjust the width for visibility
    this.upper_right.setAttribute("height", 30); // Adjust the height for visibility

    // Modify the event listener for the upper_right anchor to include delete functionality
    this.upper_right.removeEventListener("mousedown", this.upper_right_mousedownHandler); // Assuming you've previously attached a mousedown handler
    this.upper_right.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent further propagation of the event
		this.remove()
    });
	
	this.startEditing=()=>{
		if(this.editing)return;
		this.editing=true;
		this.bounding_box.setAttribute("style","");
		if(this.canResize){
			this.g.appendChild(this.upper_left);
			this.g.appendChild(this.upper_right);
			this.g.appendChild(this.lower_left);
			this.g.appendChild(this.lower_right);
			//this.g.appendChild(this.top);
			//this.g.appendChild(this.bottom);
			//this.g.appendChild(this.left);
			//this.g.appendChild(this.right);
		}
		if(this.canRotate){
			this.g.appendChild(this.center);
			this.g.appendChild(this.rotator);
		}
		
		if(this.selected_p)this.whenSelected().callThen();
		this.root.whenSelected().callThen({object:this});
	}
	
	this.stopEditing=()=>{
		if(!this.editing)return;
		this.editing=false;
		this.bounding_box.setAttribute("style","display:none;");
		if(this.canResize){
			this.g.removeChild(this.upper_left);
			this.g.removeChild(this.upper_right);
			this.g.removeChild(this.lower_left);
			this.g.removeChild(this.lower_right);
		}
		if(this.canRotate){
			this.g.removeChild(this.center);
			this.g.removeChild(this.rotator);
		}
		
		if(this.selected_p)this.whenSelected().callOtherwise();
		if(this.root)
		this.root.whenSelected().callOtherwise({object:this});
	}
	
	var activateEditor=()=>{
		if(this.getRoot().editingShape&&this.getRoot().editingShape!=this)this.getRoot().editingShape.stopEditing();
		this.getRoot().editingShape=this;
		this.startEditing();
		
		rerender_anchors();
	}
	this.select=activateEditor;
	
	
	var rerender_anchors=()=>{
		
		if(this.root){}else{return;}
		
		this.renderShape();
		
		
		
		var s=this.root.scale;
		var cornerSize=this.cornerSize/s;
		
		this.g.setAttribute("transform","translate("+this.cx+","+this.cy+") rotate("+this.angle+")");
		
		this.bounding_box.setAttribute("x",-this.width/2);
		this.bounding_box.setAttribute("y",-this.height/2);
		this.bounding_box.setAttribute("width",Math.max(0,this.width));
		this.bounding_box.setAttribute("height",Math.max(0,this.height));
		
		
		//we should also update corners here
		this.upper_left.setAttribute("x",-cornerSize-this.width/2);
		this.upper_left.setAttribute("y",-cornerSize-this.height/2);
		this.upper_left.setAttribute("width",cornerSize);
		this.upper_left.setAttribute("height",cornerSize);
		
		this.upper_right.setAttribute("x",(this.width/2));
		this.upper_right.setAttribute("y",(-cornerSize-this.height/2));
		this.upper_right.setAttribute("width",cornerSize);
		this.upper_right.setAttribute("height",cornerSize);
		
		this.lower_left.setAttribute("x",(-cornerSize-this.width/2));
		this.lower_left.setAttribute("y",(this.height/2));
		this.lower_left.setAttribute("width",cornerSize);
		this.lower_left.setAttribute("height",cornerSize);
		
		this.lower_right.setAttribute("x",(this.width/2));
		this.lower_right.setAttribute("y",(this.height/2));
		this.lower_right.setAttribute("width",cornerSize);
		this.lower_right.setAttribute("height",cornerSize);
		
		var barWidth=Math.max(0,Math.min(cornerSize*2,this.width/2));
		var barHeight=Math.max(0,Math.min(cornerSize*2,this.height/2));
		
		this.top.setAttribute("x",-(barWidth/2));
		this.top.setAttribute("y",-cornerSize-this.height/2);
		this.top.setAttribute("width",barWidth);
		this.top.setAttribute("height",cornerSize);
		
		this.bottom.setAttribute("x",-(barWidth/2));
		this.bottom.setAttribute("y",this.height/2);
		this.bottom.setAttribute("width",barWidth);
		this.bottom.setAttribute("height",cornerSize);
		
		this.left.setAttribute("x",-cornerSize-this.width/2);
		this.left.setAttribute("y",-barHeight/2);
		this.left.setAttribute("width",cornerSize);
		this.left.setAttribute("height",barHeight);
		
		this.right.setAttribute("x",this.width/2);
		this.right.setAttribute("y",-barHeight/2);
		this.right.setAttribute("width",cornerSize);
		this.right.setAttribute("height",barHeight);
		
		this.center.setAttribute("cx",0);
		this.center.setAttribute("cy",0);
		this.center.setAttribute("rx",cornerSize);
		this.center.setAttribute("ry",cornerSize);
		this.center.setAttribute("opacity",0);
		
		this.rotator.setAttribute("cx",0);
		this.rotator.setAttribute("cy",-3*cornerSize-this.height/2);
		this.rotator.setAttribute("rx",cornerSize);
		this.rotator.setAttribute("ry",cornerSize);
		
		
	}
	
	var hide_anchors=()=>{
		this.bounding_box.setAttribute("opacity",0);
		this.upper_left.setAttribute("opacity",0);
		this.upper_right.setAttribute("opacity",0);
		this.lower_left.setAttribute("opacity",0);
		this.lower_right.setAttribute("opacity",0);
		this.top.setAttribute("opacity",0);
		this.bottom.setAttribute("opacity",0);
		this.left.setAttribute("opacity",0);
		this.right.setAttribute("opacity",0);
		this.center.setAttribute("opacity",0);
		this.rotator.setAttribute("opacity",0);
	}
	var show_anchors=()=>{
		this.bounding_box.setAttribute("opacity",1);
		this.upper_left.setAttribute("opacity",1);
		this.upper_right.setAttribute("opacity",1);
		this.lower_left.setAttribute("opacity",1);
		this.lower_right.setAttribute("opacity",1);
		this.top.setAttribute("opacity",1);
		this.bottom.setAttribute("opacity",1);
		this.left.setAttribute("opacity",1);
		this.right.setAttribute("opacity",1);
		// this.center.setAttribute("opacity",1);
		this.rotator.setAttribute("opacity",1);
	}
	
	
	//We will use this event to start the movement listeners
	this.shape.addEventListener("mousedown",(event)=>{
			if(this.root.pick_p)return;
			if(!this.canSelect)return;
			
			activateEditor();
			
			event.stopPropagation();
			
			if(!this.canMove)return;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.shape_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.shape_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.shape_mouseup=(event2)=>{
				
				document.removeEventListener("mouseup",this.shape_mouseup);
				this.shape_mouseup=null;
				document.removeEventListener("mousemove",this.shape_mousemove);
				this.shape_mousemove=null;
			};
			
			if(this.shape_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.shape_mousemove);
			}
			
			//We will use this event to update the shape
			this.shape_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				this.cx=original_cx+(x2-x1)/this.root.scale;
				this.cy=original_cy+(y2-y1)/this.root.scale;
				
				
				rerender_anchors();
				
			};
			
			document.addEventListener("mouseup",this.shape_mouseup);
			document.addEventListener("mousemove",this.shape_mousemove);
			
		})
	
	
	
	this.upper_left.addEventListener("mouseover",(event)=>{
			this.upper_left.setAttribute("fill","yellow");
		})
	this.upper_left.addEventListener("mouseout",(event)=>{
			this.upper_left.setAttribute("fill","gray");
		})
	this.upper_left.addEventListener("mousedown",(event)=>{
			this.upper_left.setAttribute("fill","yellow");
			
			event.stopPropagation();
			
			var original_width=this.width;
			var original_height=this.height;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.upper_left_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.upper_left_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.upper_left_mouseup=(event2)=>{
				
				show_anchors();
				this.upper_left.setAttribute("fill","gray");
				document.removeEventListener("mouseup",this.upper_left_mouseup);
				this.upper_left_mouseup=null;
				document.removeEventListener("mousemove",this.upper_left_mousemove);
				this.upper_left_mousemove=null;
			};
			
			if(this.upper_left_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.upper_left_mousemove);
			}
			
			//We will use this event to update the shape
			this.upper_left_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var dx=(x1-x2)/this.root.scale;
				var dy=(y1-y2)/this.root.scale;
				var c=Math.cos(this.angle*Math.PI/180);
				var s=Math.sin(this.angle*Math.PI/180);
				
				this.width=dx*c+dy*s+original_width;
				this.height=-dx*s+dy*c+original_height;
				this.cx=-dx/2+original_cx;
				this.cy=-dy/2+original_cy;
				
				rerender_anchors();
				
			};
			
			document.addEventListener("mouseup",this.upper_left_mouseup);
			document.addEventListener("mousemove",this.upper_left_mousemove);
			hide_anchors();
			this.upper_left.setAttribute("opacity",1);
			this.lower_right.setAttribute("opacity",1);
			this.bounding_box.setAttribute("opacity",1);
			
		})
	
	
	//Upper Right Movement Listeners
	this.upper_right.addEventListener("mouseover",(event)=>{
			this.upper_right.setAttribute("fill","red");
		})
	this.upper_right.addEventListener("mouseout",(event)=>{
			this.upper_right.setAttribute("fill","red");
		})
	this.upper_right.addEventListener("mousedown",(event)=>{
			
			this.upper_right.setAttribute("fill","red");
			
			event.stopPropagation();
			
			var original_width=this.width;
			var original_height=this.height;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.upper_right_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.upper_right_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.upper_right_mouseup=(event2)=>{
				
				show_anchors();
				this.upper_right.setAttribute("fill","red");
				document.removeEventListener("mouseup",this.upper_right_mouseup);
				this.upper_right_mouseup=null;
				document.removeEventListener("mousemove",this.upper_right_mousemove);
				this.upper_right_mousemove=null;
			};
			
			if(this.upper_right_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.upper_right_mousemove);
			}
			
			//We will use this event to update the shape
			this.upper_right_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var dx=(x1-x2)/this.root.scale;
				var dy=(y1-y2)/this.root.scale;
				var c=Math.cos(this.angle*Math.PI/180);
				var s=Math.sin(this.angle*Math.PI/180);
				
				this.width=-dx*c-dy*s+original_width;
				this.height=-dx*s+dy*c+original_height;
				this.cx=-dx/2+original_cx;
				this.cy=-dy/2+original_cy;
				
				rerender_anchors();
				
			};
			
			document.addEventListener("mouseup",this.upper_right_mouseup);
			document.addEventListener("mousemove",this.upper_right_mousemove);
			hide_anchors();
			this.bounding_box.setAttribute("opacity",1);
			this.upper_right.setAttribute("opacity",1);
			this.lower_left.setAttribute("opacity",1);
			
		})
	
	//Lower Left Movement Listeners
	this.lower_left.addEventListener("mouseover",(event)=>{
			this.lower_left.setAttribute("fill","yellow");
		})
	this.lower_left.addEventListener("mouseout",(event)=>{
			this.lower_left.setAttribute("fill","gray");
		})
	this.lower_left.addEventListener("mousedown",(event)=>{
			
			this.lower_left.setAttribute("fill","yellow");
			
			event.stopPropagation();
			
			var original_width=this.width;
			var original_height=this.height;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.lower_left_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.lower_left_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.lower_left_mouseup=(event2)=>{
				
				show_anchors();
				this.lower_left.setAttribute("fill","gray");
				document.removeEventListener("mouseup",this.lower_left_mouseup);
				this.lower_left_mouseup=null;
				document.removeEventListener("mousemove",this.lower_left_mousemove);
				this.lower_left_mousemove=null;
			};
			
			if(this.lower_left_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.lower_left_mousemove);
			}
			
			//We will use this event to update the shape
			this.lower_left_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var dx=(x1-x2)/this.root.scale;
				var dy=(y1-y2)/this.root.scale;
				var c=Math.cos(this.angle*Math.PI/180);
				var s=Math.sin(this.angle*Math.PI/180);
				
				this.width=dx*c+dy*s+original_width;
				this.height=dx*s-dy*c+original_height;
				this.cx=-dx/2+original_cx;
				this.cy=-dy/2+original_cy;
				
				rerender_anchors();
				
			};
			
			document.addEventListener("mouseup",this.lower_left_mouseup);
			document.addEventListener("mousemove",this.lower_left_mousemove);
			hide_anchors();
			this.bounding_box.setAttribute("opacity",1);
			this.upper_right.setAttribute("opacity",1);
			this.lower_left.setAttribute("opacity",1);
			
		})
	
	//Lower Right Movement Listeners
	this.lower_right.addEventListener("mouseover",(event)=>{
			this.lower_right.setAttribute("fill","yellow");
		})
	this.lower_right.addEventListener("mouseout",(event)=>{
			this.lower_right.setAttribute("fill","gray");
		})
	this.lower_right.addEventListener("mousedown",(event)=>{
			
			this.lower_right.setAttribute("fill","yellow");
			
			event.stopPropagation();
			
			var original_width=this.width;
			var original_height=this.height;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.lower_right_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.lower_right_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.lower_right_mouseup=(event2)=>{
				
				show_anchors();
				this.lower_right.setAttribute("fill","gray");
				
				document.removeEventListener("mouseup",this.lower_right_mouseup);
				this.lower_right_mouseup=null;
				document.removeEventListener("mousemove",this.lower_right_mousemove);
				this.lower_right_mousemove=null;
			};
			
			if(this.lower_right_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.lower_right_mousemove);
			}
			
			//We will use this event to update the shape
			this.lower_right_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var dx=(x1-x2)/this.root.scale;
				var dy=(y1-y2)/this.root.scale;
				var c=Math.cos(this.angle*Math.PI/180);
				var s=Math.sin(this.angle*Math.PI/180);
				
				this.width=-dx*c-dy*s+original_width;
				this.height=dx*s-dy*c+original_height;
				this.cx=-dx/2+original_cx;
				this.cy=-dy/2+original_cy;
				
				rerender_anchors();
				
			};
			
			document.addEventListener("mouseup",this.lower_right_mouseup);
			document.addEventListener("mousemove",this.lower_right_mousemove);
			hide_anchors();
			this.bounding_box.setAttribute("opacity",1);
			this.upper_left.setAttribute("opacity",1);
			this.lower_right.setAttribute("opacity",1);
		})
	
	//yellow box on top
	this.top.addEventListener("mouseover",(event)=>{
			this.top.setAttribute("fill","yellow");
		})
	this.top.addEventListener("mouseout",(event)=>{
			this.top.setAttribute("fill","gray");
		})
	this.top.addEventListener("mousedown",(event)=>{
			
			this.top.setAttribute("fill","yellow");
			
			event.stopPropagation();
			
			var original_width=this.width;
			var original_height=this.height;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.top_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.top_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.top_mouseup=(event2)=>{
				
				show_anchors();
				this.top.setAttribute("fill","gray");
				
				document.removeEventListener("mouseup",this.top_mouseup);
				this.top_mouseup=null;
				document.removeEventListener("mousemove",this.top_mousemove);
				this.top_mousemove=null;
			};
			
			if(this.top_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.top_mousemove);
			}
			
			//We will use this event to update the shape
			this.top_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var dx=(x1-x2)/this.root.scale;
				var dy=(y1-y2)/this.root.scale;
				var c=Math.cos(this.angle*Math.PI/180);
				var s=Math.sin(this.angle*Math.PI/180);
				
				//this.width=-dx*c-dy*s+original_width;
				this.height=-dx*s+dy*c+original_height;
				dx=(original_width-this.width)/2;
				dy=(original_height-this.height)/2;
				
				this.cx=-dx*c-dy*s+original_cx;
				this.cy=-dx*s+dy*c+original_cy;
				
				
				
				rerender_anchors();
				
			};
			
			document.addEventListener("mouseup",this.top_mouseup);
			document.addEventListener("mousemove",this.top_mousemove);
			hide_anchors();
			this.bounding_box.setAttribute("opacity",1);
			this.top.setAttribute("opacity",1);
			this.bottom.setAttribute("opacity",1);
		})
	
	//yellow box on bottom
	this.bottom.addEventListener("mouseover",(event)=>{
			this.bottom.setAttribute("fill","yellow");
		})
	this.bottom.addEventListener("mouseout",(event)=>{
			this.bottom.setAttribute("fill","gray");
		})
	this.bottom.addEventListener("mousedown",(event)=>{
			
			this.bottom.setAttribute("fill","yellow");
			
			event.stopPropagation();
			
			
			var original_width=this.width;
			var original_height=this.height;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.bottom_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.bottom_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.bottom_mouseup=(event2)=>{
				
				show_anchors();
				this.bottom.setAttribute("fill","gray");
				
				document.removeEventListener("mouseup",this.bottom_mouseup);
				this.bottom_mouseup=null;
				document.removeEventListener("mousemove",this.bottom_mousemove);
				this.bottom_mousemove=null;
			};
			
			if(this.bottom_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.bottom_mousemove);
			}
			
			//We will use this event to update the shape
			this.bottom_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var dx=(x1-x2)/this.root.scale;
				var dy=(y1-y2)/this.root.scale;
				var c=Math.cos(this.angle*Math.PI/180);
				var s=Math.sin(this.angle*Math.PI/180);
				
				//this.width=-dx*c-dy*s+original_width;
				this.height=dx*s-dy*c+original_height;
				
				dx=(original_width-this.width)/2;
				dy=-(original_height-this.height)/2;
				
				this.cx=-dx*c-dy*s+original_cx;
				this.cy=-dx*s+dy*c+original_cy;
				
				rerender_anchors();
				
			};
			
			document.addEventListener("mouseup",this.bottom_mouseup);
			document.addEventListener("mousemove",this.bottom_mousemove);
			
			hide_anchors();
			this.bounding_box.setAttribute("opacity",1);
			this.top.setAttribute("opacity",1);
			this.bottom.setAttribute("opacity",1);
		})
	
	//yellow box on left
	this.left.addEventListener("mouseover",(event)=>{
			this.left.setAttribute("fill","yellow");
		})
	this.left.addEventListener("mouseout",(event)=>{
			this.left.setAttribute("fill","gray");
		})
	this.left.addEventListener("mousedown",(event)=>{
			
			this.left.setAttribute("fill","yellow");
			
			event.stopPropagation();
			
			var original_width=this.width;
			var original_height=this.height;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.left_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.left_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.left_mouseup=(event2)=>{
				
				show_anchors();
				this.left.setAttribute("fill","gray");
				
				document.removeEventListener("mouseup",this.left_mouseup);
				this.left_mouseup=null;
				document.removeEventListener("mousemove",this.left_mousemove);
				this.left_mousemove=null;
			};
			
			if(this.left_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.left_mousemove);
			}
			
			//We will use this event to update the shape
			this.left_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var dx=(x1-x2)/this.root.scale;
				var dy=(y1-y2)/this.root.scale;
				var c=Math.cos(this.angle*Math.PI/180);
				var s=Math.sin(this.angle*Math.PI/180);
				
				this.width=dx*c+dy*s+original_width;
				//this.height=-dx*s+dy*c+original_height;
				
				dx=-(original_width-this.width)/2;
				dy=(original_height-this.height)/2;
				
				this.cx=-dx*c-dy*s+original_cx;
				this.cy=-dx*s+dy*c+original_cy;
				
				rerender_anchors();
				
			};
			
			document.addEventListener("mouseup",this.left_mouseup);
			document.addEventListener("mousemove",this.left_mousemove);
			
			hide_anchors();
			this.bounding_box.setAttribute("opacity",1);
			this.left.setAttribute("opacity",1);
			this.right.setAttribute("opacity",1);
		})
	
	//yellow box on right
	this.right.addEventListener("mouseover",(event)=>{
			this.right.setAttribute("fill","yellow");
		})
	this.right.addEventListener("mouseout",(event)=>{
			this.right.setAttribute("fill","gray");
		})
	this.right.addEventListener("mousedown",(event)=>{
			
			this.right.setAttribute("fill","yellow");
			event.stopPropagation();
			
			var original_width=this.width;
			var original_height=this.height;
			var original_cx=this.cx;
			var original_cy=this.cy;
			var x1=event.clientX;
			var y1=event.clientY;
			
			if(this.right_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.right_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.right_mouseup=(event2)=>{
				
				show_anchors();
				this.right.setAttribute("fill","gray");
				
				document.removeEventListener("mouseup",this.right_mouseup);
				this.right_mouseup=null;
				document.removeEventListener("mousemove",this.right_mousemove);
				this.right_mousemove=null;
			};
			
			if(this.right_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.right_mousemove);
			}
			
			//We will use this event to update the shape
			this.right_mousemove=(event2)=>{
				
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var dx=(x1-x2)/this.root.scale;
				var dy=(y1-y2)/this.root.scale;
				var c=Math.cos(this.angle*Math.PI/180);
				var s=Math.sin(this.angle*Math.PI/180);
				
				this.width=-dx*c-dy*s+original_width;
				//this.height=-dx*s+dy*c+original_height;
				
				dx=(original_width-this.width)/2;
				dy=(original_height-this.height)/2;
				
				this.cx=-dx*c-dy*s+original_cx;
				this.cy=-dx*s+dy*c+original_cy;
				
				rerender_anchors();
				
				
				
			};
			
			document.addEventListener("mouseup",this.right_mouseup);
			document.addEventListener("mousemove",this.right_mousemove);
			
			hide_anchors();
			this.bounding_box.setAttribute("opacity",1);
			this.left.setAttribute("opacity",1);
			this.right.setAttribute("opacity",1);
		})
	
	this.rotator.addEventListener("mouseover",(event)=>{
			this.rotator.setAttribute("fill","yellow");
		})
	this.rotator.addEventListener("mouseout",(event)=>{
			this.rotator.setAttribute("fill","gray");
		})
	this.rotator.addEventListener("mousedown",(event)=>{
			
			this.rotator.setAttribute("fill","yellow");
			event.stopPropagation();
			
			var original_angle=this.angle;
			var x1=event.clientX;
			var y1=event.clientY;
			
			var rect=this.center.getBoundingClientRect();
			var dx=(x1-rect.x+rect.width/2);
			var dy=(y1-rect.y+rect.height/2);
			var s=dx*dx+dy*dy;
			dx/=s;
			dy/=s;
			var angle1=Math.atan2(dy,dx)*180/Math.PI+90;
			
			
			
			if(this.rotator_mouseup){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mouseup",this.rotator_mouseup);
			}
			
			//We will use this event to clean up the listeners
			this.rotator_mouseup=(event2)=>{
				
				show_anchors();
				this.center.setAttribute("opacity",0);
				this.rotator.setAttribute("fill","gray");
				
				document.removeEventListener("mouseup",this.rotator_mouseup);
				this.rotator_mouseup=null;
				document.removeEventListener("mousemove",this.rotator_mousemove);
				this.rotator_mousemove=null;
			};
			
			if(this.rotator_mousemove){//to handle the rare case of two consecutive mouse downs
				document.removeEventListener("mousemove",this.rotator_mousemove);
			}
			
			//We will use this event to update the shape
			this.rotator_mousemove=(event2)=>{
				
				var x2=event2.clientX;
				var y2=event2.clientY;
				
				var rect=this.center.getBoundingClientRect();
				var dx=(x2-rect.x+rect.width/2);
				var dy=(y2-rect.y+rect.height/2);
				var s=dx*dx+dy*dy;
				dx/=s;
				dy/=s;
				var angle2=Math.atan2(dy,dx)*180/Math.PI+90;
				
				this.angle=original_angle+angle2-angle1;
				
				rerender_anchors();
				this.center.setAttribute("opacity",1);
			};
			
			document.addEventListener("mouseup",this.rotator_mouseup);
			document.addEventListener("mousemove",this.rotator_mousemove);
			
			hide_anchors();
			this.bounding_box.setAttribute("opacity",1);
			this.center.setAttribute("opacity",1);
			this.rotator.setAttribute("opacity",1);
		})
	
	this.rerender=rerender_anchors;
	rerender_anchors();
}


ShapeGroupEditor.prototype.exportSVGElement=function(parent){
	
	var g=parent.group();
	
	for(var i=0;i<this.children.length;i++){
		this.children[i].exportSVGElement(g);
	}
	
	
	
}

ShapeGroupEditor.prototype.remove = function() {
    // Remove the graphical representation from the parent SVG element
    if (this.g && this.g.parentNode) {
        this.g.parentNode.removeChild(this.g);
    }
    // Remove this object from the parent's children array, if applicable
    if (this.parent && this.parent.children) {
        var index = this.parent.children.indexOf(this);
        if (index > -1) {
            this.parent.children.splice(index, 1);
        }
    }
    // Additional cleanup can be performed here if necessary
};


ShapeGroupEditor.prototype.group=function(options){
	return this.append(new ShapeGroupEditor(options));
}

ShapeGroupEditor.prototype.rect=function(options,options2){
	return this.append(new RectEditor(options,options2));
};

ShapeGroupEditor.prototype.image=function(options,options2){
	return this.append(new ImageEditor(options,options2));
};

ShapeGroupEditor.prototype.ellipse=function(options,options2){
	return this.append(new EllipseEditor(options,options2));
};

ShapeGroupEditor.prototype.text=function(options,options2){
	return this.append(new TextEditor(options,options2));
};

ShapeGroupEditor.prototype.line=function(options){
	
	
	
};

ShapeGroupEditor.prototype.path=function(options){
	
	
	
};

ShapeGroupEditor.prototype.polygon=function(options){
	
	
	
};

ShapeGroupEditor.prototype.polyline=function(options){
	
	
	
};



var main=function(){
	
	opn.extend(ShapeGroupEditor,SVGEditor);
	opn.extend(ShapeGroupEditor,RectEditor);
	opn.extend(ShapeGroupEditor,EllipseEditor);
	opn.extend(ShapeGroupEditor,TextEditor);
	opn.extend(ShapeGroupEditor,ImageEditor);
	exportData({SVGEditor});
}