preload("SVGEditor.js");
//preload("IntreractiveSVG.js");

preload(libs['GUI']).before(function(args){
		args.app.showLoading();
	});
	

var main=function(args){
	args.app.clearContents();

	var wind=args.app.getWindow();

	var menulayout=new MenuLayout();

	
	let insertMenu=menulayout.getMenuBar().append(new MenuItem('Insert')).getSubMenu();
    let runMenu=menulayout.getMenuBar().append(new MenuItem('Run')).getSubMenu();
    let instructionsMenu=menulayout.getMenuBar().append(new MenuItem('Instructions')).getSubMenu();
    instructionsMenu.append(new MenuItem("CircuitCanvas: How to Build Your Own Collaborative Circuit.<br>To begin, hit insert to drag and drop elements into your circuit.<br>When you have finished building hit run to see it in action! "));

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
/*
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

*/
var mySVG=new SVGEditor();
mySVG.setSize(3000,3000);
const andGateSVG = `<svg xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 12.69922 15.874025" version="1.1" x="0px" y="0px"><g transform="translate(-123.27327,-135.85802)"><path style="color:#000000;" d="m 127.875,138.91602 c -0.4777,-1e-5 -0.87305,0.39535 -0.87305,0.87304 v 4.83594 c 0,0.4777 0.39535,0.875 0.87305,0.875 h 1.63867 c 1.81301,0 3.29297,-1.47974 3.29297,-3.29297 0,-1.81322 -1.47974,-3.29101 -3.29297,-3.29101 z m 0,0.79296 h 1.63867 c 1.38425,0 2.49805,1.1138 2.49805,2.49805 0,1.38427 -1.11408,2.49805 -2.49805,2.49805 H 127.875 c -0.0487,0 -0.0801,-0.0314 -0.0801,-0.0801 v -4.83594 c 0,-0.0487 0.0314,-0.0801 0.0801,-0.0801 z" fill="#000000" stroke-linecap="round" stroke-linejoin="round"/><path style="color:#000000;" d="m 132.4082,141.81055 a 0.3968755,0.3968755 0 0 0 -0.39648,0.39648 0.3968755,0.3968755 0 0 0 0.39648,0.39649 h 2.12696 a 0.3968755,0.3968755 0 0 0 0.39648,-0.39649 0.3968755,0.3968755 0 0 0 -0.39648,-0.39648 z" fill="#000000" stroke-linecap="round" stroke-linejoin="round"/><path style="color:#000000;" d="m 124.73438,143.25586 a 0.3968755,0.3968755 0 0 0 -0.39844,0.39648 0.3968755,0.3968755 0 0 0 0.39844,0.39844 h 2.66406 a 0.3968755,0.3968755 0 0 0 0.39648,-0.39844 0.3968755,0.3968755 0 0 0 -0.39648,-0.39648 z" fill="#000000" stroke-linecap="round" stroke-linejoin="round"/><path style="color:#000000;" d="m 124.73047,140.36523 a 0.3968755,0.3968755 0 0 0 -0.39844,0.39649 0.3968755,0.3968755 0 0 0 0.39844,0.39648 h 2.66797 a 0.3968755,0.3968755 0 0 0 0.39648,-0.39648 0.3968755,0.3968755 0 0 0 -0.39648,-0.39649 z" fill="#000000" stroke-linecap="round" stroke-linejoin="round"/></g><text x="0" y="27.69922" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Meko</text><text x="0" y="32.69922" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`;
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.innerHTML = andGateSVG;
svg.setAttribute("width", "100%");
svg.setAttribute("height", "100%");
svg.setAttribute("viewBox", "0 0 2000 2000");
svg.style.bottom = "0"; // Align it to the bottom of the screen
svg.style.left = "0"; // Align it to the left side of the screen
div.appendChild(svg);
  
}
