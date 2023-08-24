export interface newDeck
{
  success: boolean,
  deck_id: string,
  remaining: number,
  shuffled: boolean
}

export interface deckResponse {
  success: boolean,
  deck_id: string,
  cards: cardsArray[],
  remaining: number
}

export interface cardsArray {
  code: string,
  image: string,
  value: string,
  suit: string
}
