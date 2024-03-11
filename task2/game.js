document.addEventListener('DOMContentLoaded', function () {
	const symbols = ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍋', '🍍']
	const numPairs = 8
	let flippedCards = []
	let matchedPairs = 0

	function createCards() {
		const cardContainer = document.getElementById('cards')
		const shuffledSymbols = shuffle(symbols.concat(symbols))
		cardContainer.innerHTML = '' // Clear previous cards
		shuffledSymbols.forEach(symbol => {
			const card = document.createElement('div')
			card.classList.add('card')
			card.dataset.symbol = symbol
			cardContainer.appendChild(card)
		})
	}

	function flipCard(card) {
		if (!flippedCards.includes(card) && flippedCards.length < 2) {
			card.classList.add('flipped')
			card.textContent = card.dataset.symbol
			flippedCards.push(card)
			if (flippedCards.length === 2) {
				setTimeout(checkMatch, 1000)
			}
		}
	}

	function checkMatch() {
		const [card1, card2] = flippedCards
		if (card1.dataset.symbol === card2.dataset.symbol) {
			matchedPairs++
			if (matchedPairs === numPairs) {
				alert('Congratulations! You have won!')
				resetGame()
			}
		} else {
			flippedCards.forEach(card => {
				card.classList.remove('flipped')
				card.textContent = ''
			})
		}
		flippedCards = []
	}

	function resetGame() {
		flippedCards = []
		matchedPairs = 0
		createCards()
	}

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	document.getElementById('cards').addEventListener('click', function (event) {
		const card = event.target.closest('.card')
		if (card) {
			flipCard(card)
		}
	})

	createCards()
})
