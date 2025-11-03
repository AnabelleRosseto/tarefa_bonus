

interface CardListProps {
    cards?: Cardimage[];
    color?: string;
}

export interface Cardimage{
    image: string,
    suit: string,
    value: string
}


const CardList = ({ cards, color = "blue" }: CardListProps) => {
    return (
        <div className={`grid grid-cols-2 justify-center items-center gap-2 h-min grid-rows-2 object-contain border-2 
        border-b-${color}-900 border-r-${color}-900 border-l-${color}-500 border-t-${color}-500 rounded-md`}>
            {cards?.length ? cards.map((card, index) => (
                <img key={index} src={card.image} alt={`An ${card.value} of ${card.suit} card`} className="h-36"/>
            )): null}
        </div>
    );
}
export default CardList;