import TuringMachine from "./TuringMaschine";
import { Instruction } from "./TuringMaschine";

const tm = (global.tm = new TuringMachine());
tm.setStates(["a", "b", "end"]);
tm.setEndState("end");
tm.setStartState("a");

tm.setInstruction("a", "0", new Instruction("a", "0", "R"));
tm.setInstruction("a", "1", new Instruction("a", "1", "R"));
tm.setInstruction("a", "B", new Instruction("b", "B", "L"));

tm.setInstruction("b", "0", new Instruction("end", "0", "R"));
tm.setInstruction("b", "1", new Instruction("b", "1", "L"));
tm.setInstruction("b", "B", new Instruction("a", "B", "R"));

tm.checkInstructionTable();

tm.resetTo("110".split(""));

global.Instruction = Instruction;
