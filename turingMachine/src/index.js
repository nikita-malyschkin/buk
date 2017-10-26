import TuringMachine from "./TuringMaschine";
import { Instruction } from "./TuringMaschine";

const tm = (global.tm = new TuringMachine());
// tm.setStates(["q0", "q#", "qEmpty", "qL0", "qL1", "qEnd"]);
// tm.setEndState("qEnd");
// tm.setStartState("q0");

// tm.setInstruction("q0", "0", new Instruction("q0", "0", "R"));
// tm.setInstruction("q0", "1", new Instruction("q0", "1", "R"));
// tm.setInstruction("q0", "#", new Instruction("q#", "#", "R"));
// tm.setInstruction("q0", "B", new Instruction("qEnd", "1", "N"));

// tm.setInstruction("q#", "0", new Instruction("qL0", "#", "L"));
// tm.setInstruction("q#", "1", new Instruction("qL1", "#", "L"));
// tm.setInstruction("q#", "#", new Instruction("q#", "#", "R"));
// tm.setInstruction("q#", "B", new Instruction("qEmpty", "B", "L")); // rechts von # ist leer => links soll muss auch leer sein

// tm.setInstruction("qL0", "0", new Instruction("q#", "#", "R"));
// tm.setInstruction("qL0", "1", new Instruction("qEnd", "0", "N")); //reject
// tm.setInstruction("qL0", "#", new Instruction("qL0", "#", "L"));
// tm.setInstruction("qL0", "B", new Instruction("qEnd", "0", "N")); //reject

// tm.setInstruction("qL1", "0", new Instruction("qEnd", "0", "N")); //reject
// tm.setInstruction("qL1", "1", new Instruction("q#", "#", "R")); 
// tm.setInstruction("qL1", "#", new Instruction("qL1", "#", "L"));
// tm.setInstruction("qL1", "B", new Instruction("qEnd", "0", "N"));

// tm.setInstruction("qEmpty", "0", new Instruction("qEnd", "0", "N")); //reject
// tm.setInstruction("qEmpty", "1", new Instruction("qEnd", "0", "N")); //reject
// tm.setInstruction("qEmpty", "#", new Instruction("qEmpty", "#", "L"));
// tm.setInstruction("qEmpty", "B", new Instruction("qEnd", "1", "N"));

tm.checkInstructionTable();

global.Instruction = Instruction;
