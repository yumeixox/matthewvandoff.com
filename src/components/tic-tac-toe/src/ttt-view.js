import Game from "../core/game.js"
import $ from 'jquery'

class View {
  constructor($el) {
    this.game = new Game
    this.$ttt = $el
    this.comp = true

    this.setupBoard()
    this.bindEvents()
  }

  bindEvents() {
    $(".grid").on("click", ".cell", (event) => {      
      $(event.target).append(`<strong class="mark">${this.game.board.currentMark()}</strong>`)
      this.makeMove(event.target)
      $(event.target).addClass("noHover")
    })
  }

  async makeMove(sq) {
    const $sq = $(sq)
    let row = parseInt($sq.attr("data-pos")[0])
    let col = parseInt($sq.attr("data-pos")[2])

    this.game.board.placeMark(`${row}${col}`)

    let winner = this.game.board.winner()
    if (winner !== null) {
      this.endGame(winner)
    }
    if (this.comp === true && this.game.board.current_turn % 2 !== 0 && winner === null) {   
      this.makeCompMove()      
    }
  }

  makeCompMove() {
    if(this.game.board.current_turn === 1) {      
      $('#ttt-container').css('pointer-events','none')
      $('#thinking').css('opacity','1')
      setTimeout(() => {
        let move=this.game.comp.takeTurn()
        let row=parseInt(move[0])
        let col=parseInt(move[1])
        let sq=$(`.cell[data-pos='${row},${col}']`)
        sq.trigger("click")
        setTimeout(() => {
          $('#ttt-container').css('pointer-events','auto')
          $('#thinking').css('opacity','0')
        }, 200)
        
      }, 500)
    }
    else {
      let move=this.game.comp.takeTurn()
      let row=parseInt(move[0])
      let col=parseInt(move[1])
      let sq=$(`.cell[data-pos='${row},${col}']`)
      sq.trigger("click")
    }
  }

  endGame(winner) {
    // Disable Events
    $(".grid").off("click", ".cell")
    $(".cell").addClass("noHover")

    this.displayReplayButton()
    this.displayWinner(winner)

    // Fade board
    $("h1").addClass("faded")
    $(".grid").addClass("faded")
  }

  setupBoard() {
    this.$ttt.append('<ul class="grid"></ul>')
    for (let i = 0; i < 9; i++) {
      $(".grid").append("<li class='cell'></li>")
    }

    let j = 0
    $(".cell").each((i, sq) => {
      $(sq).attr("data-pos", [j, i % 3])
      if (i % 3 === 2) { j++ }
    })
  }

  displayReplayButton() {
    $("#tic-tac-toe").prepend("<div class='replay-container'><strong class='replay'><em>↻</em></strong></div>")
    $(".replay").click((event) => { this.resetBoard() })
  }

  resetBoard() {
    this.game = new Game
    this.$ttt = $(".ttt")

    $(".grid").remove()
    $(".replay-container").remove()
    $(".replay").remove()
    $(".winner").remove()

    this.setupBoard()
    this.bindEvents()

    $("h1").removeClass("faded")
  }

  displayWinner(winner) {
    if (winner !== "draw") {
      $("#tic-tac-toe").prepend(`<strong class='winner hidden'> wins!</strong>`)
    } else {
      $("#tic-tac-toe").prepend(`<strong class='winner hidden'></strong>`)
    }

    $(".winner").prepend(winner)
    $(".winner").addClass("banner")
    $(".winner").removeClass("hidden")
  }
}

export default View;
