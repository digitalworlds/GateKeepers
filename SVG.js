var SVG=function(options){
	
	this.svgns="http://www.w3.org/2000/svg";
	this.svg=document.createElementNS(this.svgns,"svg");
	
	this.svg.setAttribute('xmlns',this.svgns);
	
	for(var arg in options){
		
		this.svg.setAttribute(arg,options[arg]);
	}
	
	ShapeGroup.call(this,{});
	
	this.svg.appendChild(this.g);
	
}

var ShapeGroup=function(options){
	
	
	this.svgns="http://www.w3.org/2000/svg";
	
	this.g=document.createElementNS(this.svgns,"g");
	
	for(var arg in options){
		
		this.g.setAttribute(arg,options[arg]);
	}
	
}

SVG.prototype.getSVG=function(){
	return this.svg;
};

SVG.prototype.toString=function(){
	
	var codeDIV=document.createElement("div");
	
	var prevParent=this.svg.parentElement;
	var nextSibling=this.svg.nextSibling;
	codeDIV.appendChild(this.svg);
	
	var code=codeDIV.innerHTML;
	if(prevParent){
		prevParent.insertBefore(this.svg,nextSibling);
	}
	
	
	return code;
	
}

SVG.prototype.getDataURL=function(){
	return'data:image/svg+xml;utf8,'+this.toString();
}


ShapeGroup.prototype.group=function(options){
	
	var o=options||{};
	
	var group=new ShapeGroup(o);
	
	this.g.appendChild(group.g);
	
	return group;
	
}

ShapeGroup.prototype.shape=function(shapeType,options){
	
	
	var newShape=document.createElementNS(this.svgns,shapeType);
	
	for(var name in options){
		
		newShape.setAttribute(name,options[name]);
		
	}
	
	
	this.g.appendChild(newShape);
	
	return newShape;
	
};

ShapeGroup.prototype.rect=function(options){
	
	this.shape("rect",options);
	return this;
};

ShapeGroup.prototype.text=function(options,text){
	var s=this.shape("text",options);
	s.innerHTML=text;
	return this;
};

ShapeGroup.prototype.image=function(options,text){
	this.shape("image",options);
	return thisl
};

ShapeGroup.prototype.ellipse=function(options){
	this.shape("ellipse",options);
	return this;
};

ShapeGroup.prototype.line=function(options){
	this.shape("line",options);
	return this;
};

ShapeGroup.prototype.path=function(options){
	this.shape("path",options);
	return this;
};

ShapeGroup.prototype.polygon=function(options){
	this.shape("polygon",options);
	return this;
};

ShapeGroup.prototype.polyline=function(options){
	this.shape("polyline",options);
	return this;
};


var main=function(){
	
	opn.extend(ShapeGroup,SVG);
	exportData({SVG});
}