(function(win, doc) {
  const TicTacToe = function TicTacToe() {
    this.xPlayer = 'X';
    this.circlePlayer = 'O';
    this.$actualPlayer = doc.querySelector('#actual-player');
    this.$restart = doc.querySelector('#restart');
    this.$squares = doc.querySelectorAll('.item');
    this.fillProperties();
  };

  TicTacToe.prototype.fillProperties = function fillProperties() {
    this.actualPlayer = this.getRandomPlayer();
    this.gamePositions = Array(9).fill(null);
    this.isGameOver = false;
    this.playsCounter = 0;
  }

  TicTacToe.prototype.start = function start() {
    this.setActualPlayerText();
    this.addEvents();
  };

  TicTacToe.prototype.restart = function restart() {
    this.fillProperties();
    this.$squares.forEach( $square => {
      $square.innerHTML = '';
      $square.style.backgroundColor = '#fff';
    });
  }

  TicTacToe.prototype.getRandomPlayer = function getRandomPlayer() {
    return Math.floor(Math.random() * 2) === 0 ? this.circlePlayer : this.xPlayer;
  };

  TicTacToe.prototype.setActualPlayerText = function setActualPlayerText() {
    this.$actualPlayer.innerHTML = this.actualPlayer;
  };

  TicTacToe.prototype.addEvents = function addEvents() {
    this.$squares.forEach( ($square, index) => {
      $square.addEventListener('click', event => this.handleSquareClick(index));
    });
    this.$restart.addEventListener('click', event => this.restart());
  }

  TicTacToe.prototype.handleSquareClick = function handleSquareClick(index) {
    if ( this.isGameOver ) {
      alert('Fim de jogo');
      return;
    }
    const {target: clickedSquare} = event;
    const actualPosition = this.gamePositions[index];
    if ( actualPosition ) {
      return;
    }
    this.playsCounter++;
    this.gamePositions[index] = this.actualPlayer;
    clickedSquare.innerText = this.actualPlayer;
    clickedSquare.style.backgroundColor = '#e3e3e3'
    if (this.validatesWin() ) {
      sleep(300).then(() => alert(`Jogador: ${this.actualPlayer} venceu!`));
      return;
    }

    if (this.playsCounter === this.gamePositions.length) {
      sleep(() => alert('Empate!!'));
    }
    this.actualPlayer = this.actualPlayer === 'O' ? this.xPlayer : this.circlePlayer;
    this.setActualPlayerText();
  }

  TicTacToe.prototype.validatesWin = function validatesWin() {
    const winRangePositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winRangePositions.reduce( (isWinner, range) => {
      const [rangePositionA, rangePositionB, rangePositionC] = range;
      const positionA = this.gamePositions[rangePositionA],
            positionB = this.gamePositions[rangePositionB],
            positionC = this.gamePositions[rangePositionC];
      if (positionA && positionA === positionB && positionA === positionC) {
        this.isGameOver = true;
        this.fillWinnerPositions(range);
        return true;
      }
      return isWinner || false;
    }, false);
  };

  TicTacToe.prototype.fillWinnerPositions = function fillWinnerPositions( range ) {
    this.$squares.forEach( ($square, index) => {
      if ( range.indexOf( index ) !== -1 ) {
        $square.style.backgroundColor = '#97ffa0';
      }
    });
  }

  win.TicTacToe = TicTacToe;
})(window, document);