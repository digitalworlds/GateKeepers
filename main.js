preload(libs['GUI']).before(function(args){
		args.app.showLoading();
	});

preload("SVGEditor.js");
preload("SVGIcons.js");

var main=function(args){
	args.app.clearContents();

	var wind=args.app.getWindow();

	var menulayout=new MenuLayout();

  let runMenu=menulayout.getMenuBar().append(new MenuItem('Run'));
  let instructionsMenu=menulayout.getMenuBar().append(new MenuItem('Instructions'));

	wind.getContent().append(menulayout);

    var vertSplitLayout=new SplitLayout({orientation:'vertical',sticky:'second',editable:false,splitPosition:'0.125'});

    var gatesAndSignals=new ButtonGroup({orientation:'horizontal'});
    var andGate=gatesAndSignals.append(new Button(""));
    andGate.setToolTipText("AND Gate");
    andGate.setIcon(new GUIIcon(SVGICONS_DICT["andGateIcon"]));
    var orGate=gatesAndSignals.append(new Button(""));
    orGate.setToolTipText("OR Gate");
    orGate.setIcon(new GUIIcon(SVGICONS_DICT["orGateIcon"]));
    var notGate=gatesAndSignals.append(new Button(""));
    notGate.setToolTipText("NOT Gate");
    notGate.setIcon(new GUIIcon(SVGICONS_DICT["notGateIcon"]));
    var xorGate=gatesAndSignals.append(new Button(""));
    xorGate.setToolTipText("XOR Gate");
    xorGate.setIcon(new GUIIcon(SVGICONS_DICT["xorGateIcon"]));
    var nandGate=gatesAndSignals.append(new Button(""));
    nandGate.setToolTipText("NAND Gate");
    nandGate.setIcon(new GUIIcon(SVGICONS_DICT["nandGateIcon"]));
    var norGate=gatesAndSignals.append(new Button(""));
    norGate.setToolTipText("NOR Gate");
    norGate.setIcon(new GUIIcon(SVGICONS_DICT["norGateIcon"]));
    var xnorGate=gatesAndSignals.append(new Button(""));
    xnorGate.setToolTipText("XNOR Gate");
    xnorGate.setIcon(new GUIIcon(SVGICONS_DICT["xnorGateIcon"]));
    var inputSignal=gatesAndSignals.append(new Button(""));
    inputSignal.setToolTipText("Input Signal");
    inputSignal.setIcon(new GUIIcon(SVGICONS_DICT["inputIcon"]));
    var connectorSignal=gatesAndSignals.append(new Button(""));
    connectorSignal.setToolTipText("Connector Signal");
    connectorSignal.setIcon(new GUIIcon(SVGICONS_DICT["connectorIcon"]));
    var outputSignal=gatesAndSignals.append(new Button(""));
    outputSignal.setToolTipText("Output Signal");
    //output Icon doesn't work, need to figure out how to flip svg icon
    outputSignal.setIcon(new GUIIcon(SVGICONS_DICT["inputIcon"]));


    vertSplitLayout.getFirstContainer().append(gatesAndSignals);

    menulayout.getContainer().append(vertSplitLayout);
    var splitLayout=new SplitLayout({orientation:'horizontal',sticky:'second',editable:true,splitPosition:'0.25'});
    vertSplitLayout.getSecondContainer().append(splitLayout);
}
   
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

    /* This is an example of the SVGEditor class
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


	