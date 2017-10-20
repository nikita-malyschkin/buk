export default class TuringMaschine {
    constructor() {
        //turing machine state declaration
        this.alphabet = ["0", "1", "B"];

        this.allStates = [];
        this.startState = undefined;
        this.endState = undefined;

        this.instructionTable = {};

        //runtime params
        this.tape = undefined;
        this.headPosition = 0;
        this.stateRegister = undefined;
        this.stepCounter = 0;
    }

    setStates(states) {
        this.allStates = new Set(states);
    }

    addState(state) {
        if (!this.allStates) {
            throw "states not set";
        }
        this.allStates.add(state);
    }

    setStartState(startState) {
        if (!this.allStates) {
            throw "states not set";
        }
        if (!this.allStates.has(startState)) {
            throw "tryed to set unknown state as start state";
        }
        this.stateRegister = startState;
        this.startState = startState;
    }

    setEndState(endState) {
        if (!this.allStates) {
            throw "states not set";
        }
        if (!this.allStates.has(endState)) {
            throw "tryed to set unknown state as start state";
        }
        this.endState = endState;
    }

    setInstructionTable(instructionTable) {
        this.instructionTable = {
            ...this.instructionTable,
            ...instructionTable
        };
    }

    setInstruction(state, symbol, instruction) {
        if (!this.instructionTable[state]) {
            this.instructionTable[state] = {};
        }
        this.instructionTable[state][symbol] = instruction;
    }

    getInstructionAt(state, symbol) {
        return this.instructionTable[state][symbol];
    }

    checkInstructionTable() {
        let allSet = true;
        this.allStates.forEach(function(state) {
            if (state != this.endState) {
                this.alphabet.forEach(function(symbol) {
                    if (!this.instructionTable[state] || !this.instructionTable[state][symbol]) {
                        console.log("Missing instruction for : ", state, " : ", symbol);
                        allSet = false;
                    }
                }, this);
            }
        }, this);
        return allSet;
    }

    resetTo(input) {
        this.tape = input;
        this.headPosition = 1;
        this.stateRegister = this.startState;
        this.stepCounter = 0;
        this.tape.unshift("B");
        this.tape.push("B");
    }

    step() {
        if (!this.checkInstructionTable()) {
            console.log("insert missing instructions");
        }

        this.stepCounter = this.stepCounter + 1;
        const currInstr = this.getInstructionAt(this.stateRegister, this.tape[this.headPosition]);
        this.runInstruction(currInstr);

        if (this.headPosition > this.tape.length - 1) {
            this.tape.push("B");
        } else if (this.headPosition < 0) {
            this.headPosition = this.headPosition + 1;
            this.tape.unshift("B");
        }

        if (this.stepCounter > 10000) {
            throw "not terminating after 10000 iterations";
        }

        if (this.stateRegister == this.endState) {
            console.log("================");
            console.log("endState reached after", this.stepCounter, "steps");
            console.log("================");
            return false;
        }
        return true;
    }

    runInstruction(instruction) {
        this.tape[this.headPosition] = instruction.writeSymbol;
        this.stateRegister = instruction.nextState;
        this.headPosition = this.headPosition + instruction.direction;
    }

    printCurrentState() {
        console.table({
            tape: { ...this.tape },
            position: { [this.headPosition]: "↑" }
        });
    }
}

export class Instruction {
    constructor(nextState, writeSymbol, moveDirection) {
        this.nextState = nextState;
        this.writeSymbol = writeSymbol;
        this.moveDirection = moveDirection;
    }

    get direction() {
        switch (this.moveDirection) {
            case "L":
            case "l":
                return -1;
            case "R":
            case "r":
                return 1;
            default:
                return 0;
        }
    }
}
