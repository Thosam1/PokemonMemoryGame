document.addEventListener('DOMContentLoaded', () => {
    // create the cards options
    const cardArray = [ // 2 of each
        {
            name: 'ash',
            img: 'images/ash.png'
        },
        {
            name: 'ash',
            img: 'images/ash.png'
        },
        {
            name: 'bulbasaur',
            img: 'images/bulbasaur.png'
        },
        {
            name: 'bulbasaur',
            img: 'images/bulbasaur.png'
        },
        {
            name: 'charmander',
            img: 'images/charmander.png'
        },
        {
            name: 'charmander',
            img: 'images/charmander.png'
        },
        {
            name: 'eevee',
            img: 'images/eevee.png'
        },
        {
            name: 'eevee',
            img: 'images/eevee.png'
        },
        {
            name: 'riolu',
            img: 'images/riolu.png'
        },
        {
            name: 'riolu',
            img: 'images/riolu.png'
        },
        {
            name: 'squirtle',
            img: 'images/squirtle.png'
        },
        {
            name: 'squirtle',
            img: 'images/squirtle.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())   //random shuffling of the board

    const grid = document.querySelector('.grid') // selects the css styling
    const resultDisplay = document.querySelector('#result') // selects html "id=result"

    var cardsChosen = [] // empty array of chosen cards
    var cardsChosenId = [] // empty array containing the ids of the chosen cards
    var cardsWon = [] // will contain the cards won by the user


    // creating the game board
    function createBoard() {
        for(let i = 0; i < cardArray.length; i++){
            var card = document.createElement('img')

            card.setAttribute('src', 'images/pokeball.png') // giving a "style" and its value - black is the back of the card
            card.setAttribute('data-id', i)

            card.addEventListener('click', flipCard) //when there is "click" the function flipcard is called

            grid.appendChild(card) // linking the gameboard to the css
        }
    }

    //check for matches - when 2 cards are selected
    function checkForMatch() {
        const cards = document.querySelectorAll('img')

        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if(optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/pokeball.png')
            cards[optionTwoId].setAttribute('src', 'images/pokeball.png')
            alert('You have clicked the same image!')
        }else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You caught ' + cardArray[optionOneId].name + ' ! ')
            cards[optionOneId].setAttribute('src', 'images/white.png')   //changing the image to white - so we cannot see the card
            cards[optionTwoId].setAttribute('src', 'images/white.png')

            cards[optionOneId].removeEventListener('click', flipCard)   // so we cannot flip them again to get more points and cheat
            cards[optionTwoId].removeEventListener('click', flipCard)

            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/pokeball.png')  //flipping back the cards
            cards[optionTwoId].setAttribute('src', 'images/pokeball.png')
            alert('Sorry, try again')
        }

        cardsChosen = []    //important to empty these two arrays
        cardsChosenId = []

        resultDisplay.textContent = cardsWon.length
        if(cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You caught them all'
        }

    }

    //flip the card
    function flipCard(){
        var cardId = this.getAttribute('data-id') // here we get the index id

        cardsChosen.push(cardArray[cardId].name) //we get the card name corresponding to the id
        cardsChosenId.push(cardId)

        this.setAttribute('src', cardArray[cardId].img) // we set the image corresponding to the id


        if(cardsChosen.length === 2){
            setTimeout(checkForMatch, 600) //check for match when 2 cards are selected
        }
    }


    createBoard()


})