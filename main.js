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

var output=null;

var callback = (menu_item)=> {
    var outputValue = -1;
    if(output != null) {
        //start outputsignal and call calculate output recursively
        outputValue = output.calculate();
        
    } else {
        throw new Error("Missing output signal");
    }
    console.log("you clicked run");

    //notif card for circuit output
    var notificationArea=wind.getWindowContainer().getNotificationArea();
    var notificationCard=new NotificationCard({title:"Output:"});
    notificationArea.append(notificationCard);
    var seconds = 10;
    notificationCard.setDuration(seconds);
    console.log(outputValue);
    notificationCard.append(new Label (outputValue));
}

let runMenu=menulayout.getMenuBar().append(new MenuItem('Run')).whenPressed().then(callback);
let clearMenu=menulayout.getMenuBar().append(new MenuItem('Clear'));
let instructionsMenu=menulayout.getMenuBar().append(new MenuItem('Instructions')).getSubMenu();
instructionsMenu.append(new MenuItem("CircuitCanvas: How to Build Your Own Collaborative Circuit.<br>To begin, drag and drop elements into your circuit.<br>When you have finished building hit run to see it in action! "));

//TogetherJS button for collaboration, must use document.createElement
var togetherJsButton=document.createElement("button");
togetherJsButton.id='start-togetherjs';
togetherJsButton.innerHTML="Start TogetherJS";
togetherJsButton.addEventListener("click",TogetherJS,false);
TogetherJS.on("ready", function () {
    togetherJsButton.innerHTML="End TogetherJS";
    togetherJsButton.className="togetherjs-started";
});
TogetherJS.on("close", function () {
    togetherJsButton.innerHTML="Start TogetherJS";
    togetherJsButton.className='';
});

var visibilityChangeFromRemote = false;

function fireTogetherJSVisibility(element, isVisible) {
  if (visibilityChangeFromRemote) {
    return;
  }
  var elementFinder = TogetherJS.require("elementFinder");
  var location = elementFinder.elementLocation(element);
  TogetherJS.send({type: "visibilityChange", isVisible: isVisible, element: location});
}

/*TogetherJS.hub.on("visibilityChange", function (msg) {
  if (! msg.sameUrl) {
    return;
  }
  var elementFinder = TogetherJS.require("elementFinder");
  // If the element can't be found this will throw an exception:
  var element = elementFinder.findElement(msg.element);
  visibilityChangeFromRemote = true;
  try {
    app.changeVisibility(element, msg.isVisible);
  } finally {
    visibilityChangeFromRemote = false;
  }
});*/

TogetherJS.hub.on("togetherjs.hello", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    app.allToggleElements.forEach(function (el) {
      var isVisible = $(el).is(":visible");
      fireTogetherJSVisibility(el, isVisible);
    });
  });

menulayout.getContainer().div.append(togetherJsButton);

wind.getContent().append(menulayout);


// creating button groups for gates and signals
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
var verticalConnect = Signals.append(new Button(""))
verticalConnect.setToolTipText("Connector Signal");
verticalConnect.setIcon(new GUIIcon(SVGICONS_DICT["horizontalConnectorIcon"]));

wind.append(Gates);
wind.append(Signals);

//div or "canvas" for displaying SVGs
var div=document.createElement("div");
menulayout.getContainer().div.appendChild(div);

var mySVG=new SVGEditor();
mySVG.setSize(wind.getWidth(), wind.getHeight());

// option to clear the canvas
clearMenu.whenClicked().then(
    (button)=>{
        mySVG.removeAll();
    }
);

//button on-click functionality
andGate.whenClicked().then(
    (button) => {
         var andgate = new ANDGate("gates/noun-and-gate-5536388.svg", false);
         //console.log(andgate.getSVGContent());
         mySVG.image({y:50,x:50,width:100,height:100,object:andgate,href:"gates/noun-and-gate-5536388.svg" ,preserveAspectRatio:"none"});
         console.log("hello")
    }
);
orGate.whenClicked().then(
    (button) => {
        var orgate = new ORGate("gates/noun-or-gate-5536390.svg", false); // debug console: "Uncaught ReferenceError ReferenceError: ORGate is not defined" idk why its saying that
        mySVG.image({y:50,x:50,width:100,height:100,object:orgate,href:"gates/noun-or-gate-5536390.svg" ,preserveAspectRatio:"none"});
    }
);
notGate.whenClicked().then(
    (button) => {
        var notgate = new NOTGate("gates/noun-not-gate-5536385.svg");
        mySVG.image({y:50,x:50,width:100,height:100,object:notgate,href:"gates/noun-not-gate-5536385.svg",preserveAspectRatio:"none"});
    }
);
xorGate.whenClicked().then(
    (button) => {
        var xorgate = new XORGate("gates/noun-xor-gate-5536387.svg", false);
        mySVG.image({y:50,x:50,width:100,height:100,object:xorgate,href:"gates/noun-xor-gate-5536387.svg",preserveAspectRatio:"none"});
    }
);
nandGate.whenClicked().then(
    (button) => {
        var nandgate = new ANDGate("gates/noun-nand-gate-1375339.svg", true);
        mySVG.image({y:50,x:50,width:100,height:100,object:nandgate,href:"gates/noun-nand-gate-1375339.svg",preserveAspectRatio:"none"});
    }
);
norGate.whenClicked().then(
    (button) => {
        var notgate = new ORGate("gates/noun-nor-77568.svg", true);
        mySVG.image({y:50,x:50,width:100,height:100,object:notgate,href:"gates/noun-nor-77568.svg",preserveAspectRatio:"none"});
    }
);
xnorGate.whenClicked().then(
    (button) => {
        var xnorgate = new XORGate("gates/noun-xnor-gate-3834994.svg", true);
        mySVG.image({y:50,x:50,width:100,height:100,object:xnorgate,href:"gates/noun-xnor-gate-3834994.svg",preserveAspectRatio:"none"});
    }
);
inputSignal0.whenClicked().then(
    (button) => {
        var input0 = new InputSignal0("gates/input-0.svg");
        mySVG.image({y:50,x:50,width:100,height:100,object:input0,href:"gates/input-0.svg",preserveAspectRatio:"none"});
    }
);
inputSignal1.whenClicked().then(
    (button) => {
        var input1 = new InputSignal1("gates/input-1.svg");
        mySVG.image({y:50,x:50,width:100,height:100,object:input1,href:"gates/input-1.svg",preserveAspectRatio:"none"});
    }
);
connectorSignal.whenClicked().then(
    (button) => {
        var connector = new ConnectorSignal("gates/noun-line-924522.svg");
        mySVG.image({y:50,x:50,width:100,height:100,object:connector,href:"gates/noun-line-924522.svg",preserveAspectRatio:"none"});
    }
);
outputSignal.whenClicked().then(
    (button) => {
       var outputs = new OutputSignal("gates/flipped-line-with-dot.svg");
        mySVG.image({y:50,x:50,width:100,height:100,object:outputs,href:"gates/flipped-line-with-dot.svg",preserveAspectRatio:"none"});
        console.log(output);
        if(output != null){
            throw new Error("Output already assigned")
        } else {
            output = outputs;
        }
    }
);
verticalConnect.whenClicked().then(
    (button) => {
        var horizontalconnector = new ConnectorSignal("gates/vertical-line-svgrepo-com.svg");
        mySVG.image({y:50,x:50,width:100,height:100,object:horizontalconnector, href:"gates/vertical-line-svgrepo-com.svg",preserveAspectRatio:"none"});
    }
);

div.appendChild(mySVG.svg);

menulayout.getContainer().div.scrollTop=mySVG.getHeight()/2-wind.getHeight()/2;
menulayout.getContainer().div.scrollLeft=mySVG.getWidth()/2-wind.getWidth()/2;

}
