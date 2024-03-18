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
    }
  
    connect(inputGate, outputGate) {
      inputGate.setOutput(this);
      outputGate.setInput(this);
      this.addListener(() => outputGate.calculateOutput());
    }
  }
  
  class InputSignal extends Signal {
    constructor(svgURL) {
      super(svgURL);
    }
  
    setUserValue(value) {
      // Method for user to set the initial signal value
      this.setValue(value);
    }
  }
  
  class OutputSignal extends Signal {
    constructor(svgURL) {
      super(svgURL);
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
    calculateOutput() {
      if (this.firstInputSignal && this.secondInputSignal) {
        const outputValue = this.firstInputSignal.value && this.secondInputSignal.value;
        this.outputSignal.setValue(outputValue);
      }
    }
  }
  
class ORGate extends Gate {
    calculateOutput() {
      if (this.firstInputSignal && this.secondInputSignal) {
        const outputValue = this.firstInputSignal.value || this.secondInputSignal.value;
        this.outputSignal.setValue(outputValue);
      }
    }
  }
  
class NOTGate extends Gate {
    calculateOutput() {
      if (this.firstInputSignal) {
        const outputValue = !this.firstInputSignal.value;
        this.outputSignal.setValue(outputValue);
      }
    }
  }
  
  lass XORGate extends Gate {
    calculateOutput() {
      if (this.firstInputSignal && this.secondInputSignal) {
        const outputValue = (this.firstInputSignal.value !== this.secondInputSignal.value);
        this.outputSignal.setValue(outputValue);
      }
    }
  }
  
  // Example usage:
const andGate = new ANDGate('andGate.svg');
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