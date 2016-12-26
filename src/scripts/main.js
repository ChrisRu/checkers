import { $ } from "./helpers.js";
import Board from "./Board";

const board = new Board($(".board"));
board.init();