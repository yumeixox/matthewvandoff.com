import Board from './board.js'
import Human from "./humanPlayer.js"
import Comp from "./computerPlayer.js"

class Game {
  constructor() {
    this.board = new Board

    // Level 1 = easy, Level 2 = medium, Level 3 = hard
    this.comp = new Comp(this.board, 3)
  }
}

export default Game
