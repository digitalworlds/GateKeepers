preload("SVGEditor.js");
class InteractiveSVG {
  constructor() {
    if (new.target === InteractiveSVG) {
      throw new TypeError("Cannot construct InteractiveSVG instances directly");
    }
    // SVG container setup for interactive elements.
    this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svgElement.setAttribute("width", "100px"); // Set appropriate size
    this.svgElement.setAttribute("height", "50px"); // Set appropriate size
  }

  onClick(listener) {
    this.svgElement.addEventListener('click', listener);
  }

  setSVGContent(svgContent) {
    this.svgElement.innerHTML = svgContent;
  }

  getSVGContent() {
    return this.svgElement.innerHTML;
  }

  setPosition(x, y) {
    this.svgElement.style.transform = `translate(${x}px, ${y}px)`;
  }

  // Method to make the SVG draggable within the container
  makeDraggable() {
    let drag = false;
    let offsetX, offsetY;

    this.svgElement.addEventListener('mousedown', (event) => {
      drag = true;
      offsetX = event.clientX - this.svgElement.getBoundingClientRect().left;
      offsetY = event.clientY - this.svgElement.getBoundingClientRect().top;
      this.svgElement.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
      if (drag) {
        this.setPosition(event.clientX - offsetX, event.clientY - offsetY);
      }
    });

    document.addEventListener('mouseup', () => {
      drag = false;
      this.svgElement.style.cursor = 'grab';
    });
  }

  // Add any other methods to manipulate the SVG as needed
}


class Signal extends InteractiveSVG {
  constructor(svgURL) {
    super(svgURL);
    this.value = false;
    this.listeners = []; // Gates that listen to this signal
  }

  setValue(value) {
    if (this.value !== value) {
      this.value = value;
      // Notify all listeners (gates) that the value has changed.
      this.listeners.forEach(listener => listener());
      // Optionally, update the SVG visual representation based on the signal value.
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
  }
}

class ConnectorSignal extends Signal {
  constructor(svgURL) {
    super(svgURL);
    this.leftList = new Set();
  }

  connect(inputGate, outputGate) {
    inputGate.setOutput(this);
    outputGate.setInput(this);
    this.addListener(() => outputGate.calculateOutput());
  }
}

class InputSignal0 extends Signal {
  constructor(svgURL) {
    super(svgURL);
    this.value = 0;
  }

  getValue() {
    return this.value;
  }
}

class InputSignal1 extends Signal {
  constructor(svgURL) {
    super(svgURL);
    this.value = 1;
  }

  getValue() {
    return this.value;
  }
}

class OutputSignal extends Signal {
  constructor(svgURL) {
    super(svgURL);
    this.leftList = new Set();
  }

  calculate() {
    //call calculate output recursively - logic

    return outputValue;
  }

  reportValue() {
    // Method to report the boolean value/output to the user
    console.log('Output value:', this.value);
    // Additionally, update the SVG visual representation or UI element that displays the value
  }
}

class Gate extends InteractiveSVG {
  constructor(svgURL) {
    super(svgURL);
    this.firstInputSignal = null;
    this.secondInputSignal = null;
    this.outputSignal = null;
    this.leftList = new Set();
  }


  setInput(inputSignal) {
    if (!this.firstInputSignal) {
      this.firstInputSignal = inputSignal;
    } else if (!this.secondInputSignal) {
      this.secondInputSignal = inputSignal;
    } else {
      throw new Error("Both inputs already connected");
    }
    inputSignal.addListener(() => this.calculateOutput());
  }

  setOutput(outputSignal) {
    this.outputSignal = outputSignal;
  }

  calculateOutput() {
    throw new Error("Must override calculateOutput in subclass");
  }
}

class ANDGate extends Gate {
  constructor(svgContent, isNAND) {
    super();
    this.setSVGContent(svgContent);
    this.NAND = isNAND;
  }


  calculateOutput() {
    if (this.firstInputSignal && this.secondInputSignal) {
      const outputValue = this.firstInputSignal.value && this.secondInputSignal.value;
      if(!NAND) {
        this.outputSignal.setValue(outputValue);
      } else {
        this.outputSignal.setValue(!outputValue);

      }
    }
  }
}

class ORGate extends Gate {
constructor(svgContent, isNOR) {
  super();
  this.setSVGContent(svgContent);
  this.NOR = isNOR;
}
  calculateOutput() {
    if (this.firstInputSignal && this.secondInputSignal) {
      const outputValue = this.firstInputSignal.value || this.secondInputSignal.value;
      if(!NOR) {
        this.outputSignal.setValue(outputValue);
      } else {
        this.outputSignal.setValue(!outputValue);
      }
    }
  }
}

class NOTGate extends Gate {
constructor(svgContent) {
  super();
  this.setSVGContent(svgContent);
}
  calculateOutput() {
    if (this.firstInputSignal) {
      const outputValue = !this.firstInputSignal.value;
      this.outputSignal.setValue(outputValue);
    }
  }
}

class XORGate extends Gate {
  constructor(svgContent, isXNOR) {
    super();
    this.setSVGContent(svgContent);
    this.XNOR = isXNOR;
  }
  calculateOutput() {
    if (this.firstInputSignal && this.secondInputSignal) {
      const outputValue = (this.firstInputSignal.value !== this.secondInputSignal.value);
      if(!XNOR) {
        this.outputSignal.setValue(outputValue);
      } else {
        this.outputSignal.setValue(!outputValue);
      }
    }
  }
}
var main = function() {
  opn.extend(Gate,ANDGate);
  exportData({InteractiveSVG,ANDGate,XORGate,NOTGate,ORGate,InputSignal1,InputSignal0, OutputSignal,ConnectorSignal});
}

/*
// Example usage:


const andGateSVG = `<svg xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 12.69922 15.874025" version="1.1" x="0px" y="0px"><g transform="translate(-123.27327,-135.85802)"><path style="color:#000000;" d="m 127.875,138.91602 c -0.4777,-1e-5 -0.87305,0.39535 -0.87305,0.87304 v 4.83594 c 0,0.4777 0.39535,0.875 0.87305,0.875 h 1.63867 c 1.81301,0 3.29297,-1.47974 3.29297,-3.29297 0,-1.81322 -1.47974,-3.29101 -3.29297,-3.29101 z m 0,0.79296 h 1.63867 c 1.38425,0 2.49805,1.1138 2.49805,2.49805 0,1.38427 -1.11408,2.49805 -2.49805,2.49805 H 127.875 c -0.0487,0 -0.0801,-0.0314 -0.0801,-0.0801 v -4.83594 c 0,-0.0487 0.0314,-0.0801 0.0801,-0.0801 z" fill="#000000" stroke-linecap="round" stroke-linejoin="round"/><path style="color:#000000;" d="m 132.4082,141.81055 a 0.3968755,0.3968755 0 0 0 -0.39648,0.39648 0.3968755,0.3968755 0 0 0 0.39648,0.39649 h 2.12696 a 0.3968755,0.3968755 0 0 0 0.39648,-0.39649 0.3968755,0.3968755 0 0 0 -0.39648,-0.39648 z" fill="#000000" stroke-linecap="round" stroke-linejoin="round"/><path style="color:#000000;" d="m 124.73438,143.25586 a 0.3968755,0.3968755 0 0 0 -0.39844,0.39648 0.3968755,0.3968755 0 0 0 0.39844,0.39844 h 2.66406 a 0.3968755,0.3968755 0 0 0 0.39648,-0.39844 0.3968755,0.3968755 0 0 0 -0.39648,-0.39648 z" fill="#000000" stroke-linecap="round" stroke-linejoin="round"/><path style="color:#000000;" d="m 124.73047,140.36523 a 0.3968755,0.3968755 0 0 0 -0.39844,0.39649 0.3968755,0.3968755 0 0 0 0.39844,0.39648 h 2.66797 a 0.3968755,0.3968755 0 0 0 0.39648,-0.39648 0.3968755,0.3968755 0 0 0 -0.39648,-0.39649 z" fill="#000000" stroke-linecap="round" stroke-linejoin="round"/></g><text x="0" y="27.69922" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Meko</text><text x="0" y="32.69922" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`;
const andGate = new ANDGate(andGateSVG, false);

const inputSignal = new InputSignal('inputSignal.svg');
const outputSignal = new OutputSignal('outputSignal.svg');

// User sets initial value of the input signal.
inputSignal.setUserValue(true);

// Connect the input signal to the AND gate.
andGate.setInput(inputSignal);

// Connect the AND gate to the output signal.
andGate.setOutput(outputSignal);

// Complete circuit run and report output.
outputSignal.reportValue();  // Should log the value of the output signal.
*/