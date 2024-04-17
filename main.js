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

var Gates=new ButtonGroup({orientation:'horizontal'});
var Signals = new ButtonGroup({orientation:'horizontal'});

var andGate=Gates.append(new Button(""));
andGate.setToolTipText("AND Gate");
andGate.setIcon(new GUIIcon(SVGICONS_DICT["andGateIcon"]));
var orGate=Gates.append(new Button(""));
orGate.setToolTipText("OR Gate");
orGate.setIcon(new GUIIcon(SVGICONS_DICT["orGateIcon"]));
var notGate=Gates.append(new Button(""));
notGate.setToolTipText("NOT Gate");
notGate.setIcon(new GUIIcon(SVGICONS_DICT["notGateIcon"]));
var xorGate=Gates.append(new Button(""));
xorGate.setToolTipText("XOR Gate");
xorGate.setIcon(new GUIIcon(SVGICONS_DICT["xorGateIcon"]));
var nandGate=Gates.append(new Button(""));
nandGate.setToolTipText("NAND Gate");
nandGate.setIcon(new GUIIcon(SVGICONS_DICT["nandGateIcon"]));
var norGate=Gates.append(new Button(""));
norGate.setToolTipText("NOR Gate");
norGate.setIcon(new GUIIcon(SVGICONS_DICT["norGateIcon"]));
var xnorGate=Gates.append(new Button(""));
xnorGate.setToolTipText("XNOR Gate");
xnorGate.setIcon(new GUIIcon(SVGICONS_DICT["xnorGateIcon"]));

var inputSignal0=Signals.append(new Button(""));
inputSignal0.setToolTipText("Input Value 0");
inputSignal0.setIcon(new GUIIcon(SVGICONS_DICT["input0Icon"]));

var inputSignal1=Signals.append(new Button(""));
inputSignal1.setToolTipText("Input Value 1");
inputSignal1.setIcon(new GUIIcon(SVGICONS_DICT["input1Icon"]));

var connectorSignal=Signals.append(new Button(""));
connectorSignal.setToolTipText("Connector Signal");
connectorSignal.setIcon(new GUIIcon(SVGICONS_DICT["connectorIcon"]));

var outputSignal=Signals.append(new Button(""));
outputSignal.setToolTipText("Output Signal");
outputSignal.setIcon(new GUIIcon(SVGICONS_DICT["outputIcon"]));

var horizontalConnect = Signals.append(new Button(""))
horizontalConnect.setToolTipText("Connector Signal");
horizontalConnect.setIcon(new GUIIcon(SVGICONS_DICT["horizontalConnectorIcon"]));

wind.append(Gates);
wind.append(Signals);


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
         mySVG.image({y:50,x:50,width:100,height:100,href:"gates/noun-and-gate-5536388.svg" ,preserveAspectRatio:"none"});
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
inputSignal0.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/input-0.svg",preserveAspectRatio:"none"});
    }
);
inputSignal1.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/input-1.svg",preserveAspectRatio:"none"});
    }
);
connectorSignal.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/horizontal-line-svgrepo-com.svg",preserveAspectRatio:"none"});
    }
);
outputSignal.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/flipped-line-with-dot.svg",preserveAspectRatio:"none"});
    }
);
horizontalConnect.whenClicked().then(
    (button) => {
        // init gate class
        mySVG.image({y:50,x:50,width:100,height:100,href:"gates/vertical-line-svgrepo-com.svg",preserveAspectRatio:"none"});
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
mySVG .image({y:1320,x:1500,width:200,height:200,href:"https://digitalworlds.github.io/op.n/img/logo.png",preserveAspectRatio:"none"});

div.appendChild(mySVG.svg);

menulayout.getContainer().div.scrollTop=mySVG.getHeight()/2-wind.getHeight()/2;
menulayout.getContainer().div.scrollLeft=mySVG.getWidth()/2-wind.getWidth()/2;
*/
