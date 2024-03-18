preload("SVGEditor.js");
preload(libs['GUI']).before(function(args){
		args.app.showLoading();
	});
	

var main=function(args){
	args.app.clearContents();

	var wind=args.app.getWindow();

	var menulayout=new MenuLayout();

	
	let helpMenu=menulayout.getMenuBar().append(new MenuItem('Help')).getSubMenu();

	helpMenu.append(new MenuItem("Example")).whenClicked().then((item)=>{
		item.collapseMenu();
		console.log("You clicked!");
	});

	wind.getContent().append(menulayout);


	var div=document.createElement("div");
    menulayout.getContainer().div.appendChild(div);
    

    // const svgns = "http://www.w3.org/2000/svg";
    // //link for assistance creating dynamic svg elements -> https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
    // let svg=document.createElementNS(svgns, "svg");
    // svg.setAttribute("width","100%");
    // svg.setAttribute("height","100%");

    //svg.setAttribute("viewBox","0 0 2000 2000");
    //area.appendChild(svg);
    
    //end



    //only need to change SVGEditor, but everything can be draggable
    //start with rect only

    var mySVG=new SVGEditor();
	mySVG.setSize(3000,3000);
    mySVG.rect({y:1320,x:1500,width:200,height:200,stroke:'#000000',fill:"rgba(0,0,0,0)",strokeWidth:"3"},{canResize:true})
    mySVG.rect({y:1310,x:1310,width:20,height:20,stroke:'#000000',fill:"rgba(0,0,0,0)",strokeWidth:"3"})
    mySVG.ellipse({cy:1400,cx:1310,rx:209,ry:20,stroke:'#000000',fill:"rgba(0,0,0,0)",strokeWidth:"3"})
    mySVG.text({x:1350,y:1350,text:"Hello this is my test",'font-family':'Arial','font-size':'20px',fill:'black',style:'user-select:none;'})
	mySVG .image({y:1320,x:1500,width:200,height:200,href:"https://digitalworlds.github.io/op.n/img/logo.png",preserveAspectRatio:"none"});

    div.appendChild(mySVG.svg);
    
	menulayout.getContainer().div.scrollTop=mySVG.getHeight()/2-wind.getHeight()/2;
	menulayout.getContainer().div.scrollLeft=mySVG.getWidth()/2-wind.getWidth()/2;

}
