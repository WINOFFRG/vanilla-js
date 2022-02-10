import gameLogic from './controller.js';

const application = {
    
    data: {
        references: {
            gameZone: null,
            p1: null,
            p2: null,
        },
        game: new Array(3).fill(0).map(() => new Array(3).fill(-1)),
        key: {
            A: null,
            B: null,
        },
        currentPlayer: null,
    },

    initialize() {
        const startGame = document.querySelector('#submit');

        startGame.addEventListener('click', () => {
            this.validate();
        });
    },

    startGame() {
        const gameZone = this.data.references.gameZone = document.querySelector('.game-zone');
        gameZone.style.display = 'block';
        
        gameZone.addEventListener('click', (event) => {
            this.onUserSelect(event.target);
        });
    },

    onUserSelect(userKey) {
        this.setActivePlayer();

        const key = userKey.innerHTML;
        const row = userKey.getAttribute('data-row');
        const col = userKey.getAttribute('data-col');

        if(key) return;

        if(this.data.currentPlayer === this.data.key.A) {
            userKey.innerHTML = '❌';
            this.data.game[row][col] = 1;
            this.data.currentPlayer = this.data.key.B;
        }
        else if(this.data.currentPlayer === this.data.key.B) {
            userKey.innerHTML = '⭕';
            this.data.game[row][col] = 0;
            this.data.currentPlayer = this.data.key.A;
        }

        const result = gameLogic.checkStatus(this.data.game);

        
        if(this.checkDraw()) {
            let message = `No one wins! There is a draw`;
            
            setTimeout(() => {
                this.resetGame();
            }, 10000);

            setTimeout( () => {
                alert(message);
            }, 1);

            return;
        }
        
        if(result == 1 || result == 0) {
            let message = `Player ${this.data.currentPlayer} wins!`;
            
            setTimeout(() => {
                this.resetGame();
            }, 10000);

            setTimeout( () => {
                alert(message);
            }, 1);
        }
    },

    resetGame() {
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                this.data.game[row][col] = -1;
            }
        }

        this.data.references.gameZone.style.display = 'none';
        this.data.key.A = null;
        this.data.key.B = null;
        this.data.currentPlayer = null;
        this.data.references.A = '';
        this.data.references.B = '';

        document.querySelectorAll('td > button').forEach( (element) => {
            element.innerHTML = '';    
        });
    },

    validate() {
        
        const p1 = document.querySelector('#player1');
        const p2 = document.querySelector('#player2');
        const playerA = this.data.references.A = p1.value;
        const playerB = this.data.references.B = p2.value;
        const defaultPlayer = document.querySelector('#checkbox');

        if(!playerA || !playerB) {
            alert('Player names are mandatory!');
        }
        else {
            this.data.key.A = playerA;
            this.data.key.B = playerB;
        }

        if(defaultPlayer.checked) {
            this.data.currentPlayer = playerB;
        }
        else {
            this.data.currentPlayer = playerA;
        }
        
        this.data.references.p1 = p1;
        this.data.references.p2 = p2;

        this.setActivePlayer();
        this.startGame();
    },
    
    setActivePlayer() {
        
        if(this.data.references.p1.value !== this.data.currentPlayer) {
            this.data.references.p1.classList.add('active');
            this.data.references.p2.classList.remove('active');
        }
        else {
            this.data.references.p2.classList.add('active');
            this.data.references.p1.classList.remove('active');
        }
    },

    checkDraw() {

        for (let index = 0; index < this.data.game.length; index++) {
            for (let indexIn = 0; indexIn < this.data.game[index].length; indexIn++) {
                const element = this.data.game[index][indexIn];
                if(element == -1) {
                    return false;
                }
            }
        }

        return true;
    }
}

window.addEventListener('load', () => {
    application.initialize();
});