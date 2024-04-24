//Base class for all gates and signals
class InteractiveSVG {
  constructor() {
    //Prevents direct instantiation of InteractiveSVG object
    if (new.target === InteractiveSVG) {
      throw new TypeError("Cannot construct InteractiveSVG instances directly");
    }
    // Initializes and sets up SVG
    this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svgElement.setAttribute("width", "100px"); 
    this.svgElement.setAttribute("height", "50px"); 
  }
  // Adds SVG content into svgElement
  setSVGContent(svgContent) {
    this.svgElement.innerHTML = svgContent;
  }

}

//Signal super class defines default behavior for signals
class Signal extends InteractiveSVG {
  constructor(svgURL) {
    super(svgURL);
    this.value = false;
  }
}

// ConnectorSignal manages connections between gates.
class ConnectorSignal extends Signal {
  constructor(svgURL) {
    super(svgURL);
    this.leftList = new Set();
  }

  calculateOutput() {
    for(const Gate of this.leftList){
      var val =  Gate.calculateOutput();
      console.log("connector val:",val);
      return val;
    }
  }
}

// InputSignal0 inherits from Signal and is a signal with a preset value of 0
class InputSignal0 extends Signal {
  constructor(svgURL) {
    super(svgURL);
    this.value = 0;
  }

  getValue() {
    return this.value;
  }
}

// InputSignal1 inherits from Signal and is a signal with a preset value of 1
class InputSignal1 extends Signal {
  constructor(svgURL) {
    super(svgURL);
    this.value = 1;
  }

  getValue() {
    return this.value;
  }
}

// OutputSignal specifically designed to manage the output of the circut
class OutputSignal extends Signal {
  constructor(svgURL) {
    super(svgURL);
    this.leftList = new Set(); // manage inputs to the OutputSignal
  }

  // Manages recursive calculate of circut simulation
  calculate() {
    var val = null;

    for(const Gate of this.leftList){
      //console.log(typeof gate);
      val =  Gate.calculateOutput();
      console.log("val:",val);
    }
    
    if(val == true) {
      return "True";
    } else {
      return "False";
    }
  }

  reportValue() {
    // Method to report the boolean value/output to the user
    console.log('Output value:', this.value);
  }
}


//Gate superclass inherits from InteractiveSVG and implements logic gates
class Gate extends InteractiveSVG {
  constructor(svgURL) {
    super(svgURL);
    this.firstInputValue = -1;
    this.secondInputValue = -1;
    this.outputValue = null;
    this.leftList = new Set(); // Manages inputs for all Gate class objects
  }
  // Set inputs from the connected signals
  setInputs() {
    var first = null;
    var second = null;
    this.leftList.forEach(function (input) {
      if(first == null) {
        if(!(input instanceof InputSignal0 || input instanceof InputSignal1)) {
          first = input.calculateOutput();
        } else {
          first = input.value;
        }
      } else {
        if(!(input instanceof InputSignal0 || input instanceof InputSignal1)) {
          second = input.calculateOutput();
        } else {
          second = input.value;
        }
      }
    });
    this.firstInputValue=first;
    this.secondInputValue=second;
  }

  // Subclasses must override this to provide specific gate logic.
  calculateOutput() {
    throw new Error("Must override calculateOutput in subclass");
  }
}

// ANDGate class inherits from Gate class and implements AND and NAND logic gates
class ANDGate extends Gate {
  constructor(svgContent, isNAND) {
    super();
    this.setSVGContent(svgContent);
    this.NAND = isNAND; // Configures the gate as NAND if true, otherwise AND
  }

  // Calculate the logical output based on the gate's mode and input signals
  calculateOutput() {
    this.setInputs();
    // Ensure both input signals are present before performing logic operations
    if (this.firstInputValue && this.secondInputValue) {
      console.log(this.firstInputValue, " ", this.secondInputValue);
      if(this.NAND == false) {
        this.outputValue = this.firstInputValue && this.secondInputValue; // AND operation 
      } else {
        this.outputValue = !(this.firstInputValue && this.secondInputValue); // NAND operation
      }
    }
    return this.outputValue; // Returns output signal
  }
}

// ORGate class inherits from Gate class and implements OR and NOR logic gates
class ORGate extends Gate {
  constructor(svgContent, isNOR) {
    super();
    this.setSVGContent(svgContent);
    this.NOR = isNOR; // Configures the gate as NOR if true, otherwise OR
  }
  
  // Calculate the logical output based on the gate's mode and input signals
  calculateOutput() {
    this.setInputs();
    // Ensure both input signals are present before performing logic operations
    if (this.firstInputValue && this.secondInputValue) {
      console.log(this.firstInputValue, " ", this.secondInputValue);
      if(this.NOR == false) {
        this.outputValue = this.firstInputValue || this.secondInputValue; // OR operation
      } else {
        this.outputValue = !(this.firstInputValue || this.secondInputValue); // NOR operation
      }
    }

    return this.outputValue; // Returns output signal
  }
}

//NOTGate inherits from Gate class and negates input signal through NOT operation
class NOTGate extends Gate {
constructor(svgContent) {
  super();
  this.setSVGContent(svgContent);
}
  // Calculate the logical output with single input signal
  calculateOutput() {
    this.setInputs();
    console.log(this.firstInputValue);

    this.outputValue = !this.firstInputValue; // Performs NOT operation 
    console.log(!this.firstInputValue);

    return this.outputValue;
  }

}

// XORGate class inherits from Gate class and implements XOR and XNOR logic gates
class XORGate extends Gate {
  constructor(svgContent, isXNOR) {
    super();
    this.setSVGContent(svgContent);
    this.XNOR = isXNOR; // Configures gate to be XNOR if true, otherwise XOR
  }
  // Calculate the logical output based on the gate's mode and input signals
  calculateOutput() {
    this.setInputs();
    // Ensure both input signals are present before performing logic operations
    if (this.firstInputValue && this.secondInputValue) {
      console.log(this.firstInputValue, " ", this.secondInputValue);
      
      if(this.XNOR == false) {
        this.outputValue = this.firstInputValue != this.secondInputValue; // XOR operation
      } else {
        this.outputValue = !(this.firstInputValue != this.secondInputValue); // XNOR operation
      }
    }
    return this.outputValue; // // Return the computed output signal
  }
}
var main = function() {
  exportData({InteractiveSVG,ANDGate,XORGate,NOTGate,ORGate,InputSignal1,InputSignal0, OutputSignal,ConnectorSignal});
}

