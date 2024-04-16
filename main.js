preload(libs['GUI']).before(function(args){
    args.app.showLoading();
});


preload("SVGEditor.js");
preload("SVGIcons.js");
preload("Interactive.js");

var main=function(args){
args.app.clearContents();

var wind=args.app.getWindow();

var menulayout=new MenuLayout();

let runMenu=menulayout.getMenuBar().append(new MenuItem('Run'));
let instructionsMenu=menulayout.getMenuBar().append(new MenuItem('Instructions')).getSubMenu();
instructionsMenu.append(new MenuItem("CircuitCanvas: How to Build Your Own Collaborative Circuit.<br>To begin, hit insert to drag and drop elements into your circuit.<br>When you have finished building hit run to see it in action! "));

wind.getContent().append(menulayout);

//var vertSplitLayout=new SplitLayout({orientation:'vertical',sticky:'second',editable:false,splitPosition:'0.125'});

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
outputSignal.setIcon(new GUIIcon(SVGICONS_DICT["outputIcon"]));

wind.append(gatesAndSignals);

//menulayout.getContainer().append(vertSplitLayout);
//var splitLayout=new SplitLayout({orientation:'horizontal',sticky:'second',editable:true,splitPosition:'0.25'});
//vertSplitLayout.getSecondContainer().append(splitLayout);

var div=document.createElement("div");
menulayout.getContainer().div.appendChild(div);

var mySVG=new SVGEditor();
mySVG.setSize(wind.getWidth(), wind.getHeight());

// var holdingCell = [];

//button on-click functionality
andGate.whenClicked().then(
    (button) => {
        //holdingCell.push(new ANDGate("gates/noun-and-gate-5536388.svg", false));
         var andgate = new ANDGate("gates/noun-and-gate-5536388.svg", false);
         console.log(andgate.getSVGContent());
         mySVG.image({y:50,x:50,width:100,height:100,href:"gates/noun-and-gate-5536388.svg" ,preserveAspectRatio:"none", object: ANDGate});
    }
);
orGate.whenClicked().then(
    (button) => {
        //var gate2 = new ORGate("gates/noun-or-gate-5536390.svg", false); // debug console: "Uncaught ReferenceError ReferenceError: ORGate is not defined" idk why its saying that
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/noun-or-gate-5536390.svg" ,preserveAspectRatio:"none"});
    }
);
notGate.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/noun-not-gate-5536385.svg",preserveAspectRatio:"none"});
    }
);
xorGate.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/noun-xor-gate-5536387.svg",preserveAspectRatio:"none"});
    }
);
nandGate.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/noun-nand-gate-1375339.svg",preserveAspectRatio:"none"});
    }
);
norGate.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/noun-nor-77568.svg",preserveAspectRatio:"none"});
    }
);
xnorGate.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/noun-xnor-gate-3834994.svg",preserveAspectRatio:"none"});
    }
);
inputSignal.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:75,height:75,href:"gates/line-with-dot.svg",preserveAspectRatio:"none"});
    }
);
connectorSignal.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:75,height:75,href:"gates/noun-line-924522.svg",preserveAspectRatio:"none"});
    }
);
outputSignal.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:75,height:75,href:"gates/flipped-line-with-dot.svg",preserveAspectRatio:"none"});
    }
);

div.appendChild(mySVG.svg);

menulayout.getContainer().div.scrollTop=mySVG.getHeight()/2-wind.getHeight()/2;
menulayout.getContainer().div.scrollLeft=mySVG.getWidth()/2-wind.getWidth()/2;

}



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
mySVG.image({y:1320,x:1500,width:200,height:200,href:"https://digitalworlds.github.io/op.n/img/logo.png",preserveAspectRatio:"none"});

div.appendChild(mySVG.svg);

menulayout.getContainer().div.scrollTop=mySVG.getHeight()/2-wind.getHeight()/2;
menulayout.getContainer().div.scrollLeft=mySVG.getWidth()/2-wind.getWidth()/2;
*/
