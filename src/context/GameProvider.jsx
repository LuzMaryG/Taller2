import { useState, useEffect } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	
	const [idGame, setIdGame] = useState(null);
	let idGame2;
	let banderaJugador1 = [false,false,false,false];
	let banderaJugador2 = [false,false,false,false];
	let cartasJugador1 = [];
	let cartasJugador2 = [];
	var arrayEqualPlayer1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	const [win, setWin] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');
	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
	});


	useEffect (() => {
		DeckOfCardsAPI.getIdGame().then (idGame => setIdGame (idGame))
		}, [ ]);

	const playGame = async () => {
		//idGame = await DeckOfCardsAPI.getIdGame()
		//idGame2 = idGame
		//setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	const preparateCards = async () => {
		let cards;
			cards = await DeckOfCardsAPI.getCards(idGame);
			playerOne.cards = cards
			cards = await DeckOfCardsAPI.getCards(idGame);
			playerTwo.cards = cards
			winner();
	};

	const winner = () => {
		let arrayT1, arrayT2, arrayC;
		for(let i = 0; i<=13;i++){
			arrayEqualPlayer1[i] = 0;
		}
		for(let i = 0; i<playerOne.cards.length;i++){
			if(playerOne.cards[i].value == "JACK"){
				arrayEqualPlayer1[11]++;
			}else{
				if(playerOne.cards[i].value == "ACE"){
					arrayEqualPlayer1[0]++;
				}else{
					if(playerOne.cards[i].value == "KING"){
						arrayEqualPlayer1[13]++;
					}else{
						if(playerOne.cards[i].value == "QUEEN"){
							arrayEqualPlayer1[12]++
						}else{
							arrayEqualPlayer1[playerOne.cards[i].value]++;
						}
					}
				}
			}
		}
		for(let i = 0; i <=13;i++){
			if(arrayEqualPlayer1[i] == 3){
				if(!banderaJugador1[0]){
					banderaJugador1[0] = true;
					cartasJugador1[0] = i;
				}else{
					banderaJugador1[1] = true;
					cartasJugador1[1] = i
				}
			}
			if(arrayEqualPlayer1[i] == 4){
				banderaJugador1[2] = true;
				cartasJugador1[2] = i;
			}
		}
		console.log("----------Array antes----------")
		console.log(arrayEqualPlayer1)
		console.log(playerOne.cards)
		console.log("-------------------")
		if(banderaJugador1[0] && banderaJugador1[1] && banderaJugador1[2]){
			banderaJugador1[3] = true
		}
	};

	const requestCards = async () => {
		console.log(playerOne)
		const cards = await DeckOfCardsAPI.getCard(idGame);
		if(validarJugador1(cards[0])){
			//setPlayerOne({ ...playerOne, cards: [...playerOne.cards, cards[0]] });
		}
		//setPlayerOne({ ...playerOne, cards: [...playerOne.cards, cards[0]] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, cards[1]] });

		/*const findCardPlayerOne = playerOne.cards.find(
			card => card.value === cards[0].value
		);

		const findCardPlayerTwo = playerTwo.cards.find(
			card => card.value === cards[1].value
		);

		if (findCardPlayerOne || findCardPlayerTwo) {
			setWin(true);
			setShowToast(true);
			setWinName(findCardPlayerOne ? playerOne.name : playerTwo.name);
		}*/
	};
	const validarJugador1 = (card) => {
		winner();
		let valor, valorAnterior;
		console.log(card);
		console.log("-------------------")
		if(card.value == "JACK"){
			valor = 11;
		}else{
			if(card.value == "ACE"){
				valor=0;
			}else{
				if(card.value == "QUEEN"){
					valor = 12;
				}else{
					if(card.value == "KING"){
						valor = 13;
					}else{
						valor = card.value;
					}
				}
			}
		}
		if(arrayEqualPlayer1[valor] > 0){
			arrayEqualPlayer1[valor]++;
			for(let i = 0; i<13;i++){
				if(arrayEqualPlayer1[i] == 1){
					arrayEqualPlayer1[i]--;
					if(i == 0){
						valorAnterior = "ACE"
					}else{
						if(i == 11){
							valorAnterior = "JACK"
						}else{
							if(i == 12){
								valorAnterior = "QUEEN"
							}else{
								if(i == 13){
									valorAnterior = "KING";
								}else{
									valorAnterior = i;
								}
							}
						}
					}
					i=15;
				}else{
					if(arrayEqualPlayer1[i] == 2){
						arrayEqualPlayer1[i]--;
						if(i == 0){
							valorAnterior = "ACE"
						}else{
							if(i == 11){
								valorAnterior = "JACK"
							}else{
								if(i == 12){
									valorAnterior = "QUEEN"
								}else{
									if(i == 13){
										valorAnterior = "KING";
									}else{
										valorAnterior = i;
									}
								}
							}
						}
						i=15;
					}
				}
			}
			for(let i = 0; i<playerOne.cards.length;i++){
				if(valorAnterior == playerOne.cards[i].value){
					playerOne.cards[i] = card;
					i = playerOne.cards.length;
				}
			}
		}
		console.log("----------Array despues----------")
		console.log(arrayEqualPlayer1);
		console.log(playerOne.cards)
		return true;
	}

	return (
		<GameContext.Provider
			value={{
				playGame,
				requestCards,
				preparateCards,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				showToast,
				setShowToast,
				winName,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
