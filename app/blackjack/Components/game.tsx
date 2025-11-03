
'use client'

import { useEffect, useState } from "react";

import CardList from "./card-list";


export interface Deck {
    "success": boolean,
    "deck_id": string,
    "shuffled": boolean,
    "remaining": number
}
interface Card {
    code: string,
    image: string,
    images: {
        svg: string,
        png: string
    },
    value: string,
    suit: string
}
async function fetchDeck() {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle'
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    // console.log(data)
    return data as Deck;
}



async function fetchCard(deck_id: string, count: number) {
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    // console.log(data)
    return data.cards;
}




const Game = () => {

    const [deck, setDeck] = useState<Deck | null>(null);
    
    const [playerCards, setPlayerCards] = useState<Card[]>([]);
    const [compCards, setCompCards] = useState<Card[]>([]);
    const [playerSum,setPlayerSum] = useState<number>(0);
    const [compSum, setCompSum] = useState<number>(0);
    
    const [gameResult, setGameResult] = useState<string>("");
    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [runningComp, setRunningComp] = useState<boolean>(false)
    
    console.log(playerSum)
    //Cria um novo deck

    function getCardNumberValue(value: string){
        
        if (Number.isNaN(parseInt(value))){
            if (value == "Ace"){
                return "11";
            }
            else{
                return "10";
            }
        }
        return value;
    }

    async function drawCard() : Promise<Card[]>{
        const cc : Card[] = await fetchCard(deck!.deck_id, 1).then((card) => {
            
            card[0].value = getCardNumberValue(card[0].value)

            return card;
        });
        return cc;
    }

    //Compra uma carta do deck e aumenta a pontuação do jogador.
    function playerBuyCard() {
        fetchCard(deck!.deck_id, 1).then((card) => setPlayerCards((prev) => {
            
            card[0].value = getCardNumberValue(card[0].value);
            
            const newCards = [...prev, ...card];
            const newSum = newCards.reduce((acc, c) => acc + parseInt(c.value), 0);
            setPlayerSum(newSum);

            return newCards;
        }));
        
        //console.log("bought")
    
    }



    async function compTurn(ccard: Card[], csum: number) {
        if (!runningComp){
            setRunningComp(true);
        }
        console.log("a")
        
        if (csum < 17) 
        {
            await drawCard().then((c) => {
                let nc:Card[] = [...ccard, ...c]
                setCompCards((prev) => {
                    const newCards = [...prev, c[0]];
                    console.log("new cards: " + newCards);
                    const sum = newCards.reduce((acc,c) => acc + parseInt(c.value), 0);
                    setCompSum(sum);
                    
                    return newCards;
                })
                return nc
            }).then((nc:Card[]) => {
                const sum = nc.reduce((acc,c) => acc + parseInt(c.value), 0);
                compTurn(nc, sum);
            });
        } 
        else 
        {
            endGame(csum);
        }
        // O retorno da função é a Promise resultante do fetchCard.
        
        
    
    }    
    

    function endGame(csum: number){
        
        setGameRunning(false);
        setRunningComp(false);
        // console.log(`player sum = ${playerSum} \ncomp sum = ${csum}`);
        if ((playerSum > 21 && csum > 21) || playerSum == csum){
            setGameResult("Empate!!");
        }
        else if((playerSum > csum && playerSum <= 21) || csum > 21){
            setGameResult("Você ganhou!!");
        }
        else{
            setGameResult("Você perdeu!!");
        };
    }


    //inicializa o jogo
    function newGame()
    {
        setGameRunning(false)
        setPlayerCards([]);
        setCompCards([]);
        setPlayerSum(0);
        setCompSum(0);
        setGameResult("Esperando nova rodada");
        setRunningComp(false)
        fetchDeck().then((data) => setDeck(data)).then(() => {
            setGameResult("FaçaSuaAposta");
            setGameRunning(true);
        }).catch(() => setGameResult("Não conseguimos achar o baralho de cartas..."));
    }


    //chama a função de inicializar o jogo quando o objeto é carregado
    useEffect(() => newGame(), [])


    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full text-black dark:text-white">
            <h4>deck id: {deck?.deck_id}</h4>

            <h2>{gameResult}</h2>
            
            <button
            className="bg-blue-700 rounded p-2 text-white my-8"
            onClick={newGame}
            >
                Novo Jogo
            </button>

            <div className="flex flex-row justify-evenly">
                <div className="p-10">
                    <div className="flex flex-row justify-evenly">
                        <h3 className="">Jogador: </h3>
                        <h3 className={` ${playerSum > 21 ? "text-neutral-600" : ""}`}> {playerSum}</h3>
                    </div>
                    
                    <CardList
                        
                        cards={playerCards?.map((card) => (
                            {
                                image: card.image,
                                suit: card.suit,
                                value: card.value
                            }))} />
                    <button 
                        className={` rounded p-2  my-8
                            ${!(gameRunning && playerSum <= 21) ? "bg-gray-700 cursor-not-allowed text-neutral-500" : "bg-blue-700 border-l-red text-white"} `} 
                        onClick={playerBuyCard}
                        disabled={playerSum >= 21 || !gameRunning}
                    > comprar 1 carta
                    </button>
                    
                </div>
                <div className="p-10">
                    <div className="flex flex-row justify-evenly">
                        <h3 className="">Casa: </h3>
                        <h3 className={` ${compSum > 21 ? "text-neutral-600" : ""}`}> {compSum}</h3>
                    </div>
                    <CardList
                        color="red"
                        cards={compCards?.map((card) => (
                            {
                                image: card.image,
                                suit: card.suit,
                                value: card.value
                            }))} />
                    <button 
                        className={` rounded p-2  my-8 border-2
                            ${!(gameRunning && !runningComp) ? "bg-gray-700 cursor-not-allowed border-t-neutral-500 border-l-neutral-500 text-neutral-500" : 
                                "bg-orange-500  border-b-orange-900 border-r-orange-900 text-white"} `}
                        onClick={() => compTurn(compCards, compSum)}
                        disabled={!gameRunning && runningComp}
                    > Apostar
                    </button>
                </div>

            </div>
        </div>
    )
}
export default Game;