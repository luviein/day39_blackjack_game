import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { deckResponse, newDeck } from './newDeck.model';

const newDeckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle"

@Injectable()
export class CardService{
  constructor(private http: HttpClient, private activatedRoute:  ActivatedRoute) {}

  private deck_id: string = ""

  setDeckId(deck_id: string): void {
    console.log(deck_id)
    this.deck_id = deck_id
  }

  getNewDeck() : Observable<newDeck> {
    const params = new HttpParams().set("deck_count", 1)
    // json response is string []
    return this.http.get<newDeck>(newDeckUrl, {params})
  }

  drawCard() : Observable<deckResponse> {


    // deck_id = this.activatedRoute.snapshot.params['deck_id']
    const drawCardUrl = `https://www.deckofcardsapi.com/api/deck/${this.deck_id}/draw/`
    const params = new HttpParams().set("count", 2)
    return this.http.get<deckResponse> (drawCardUrl, {params})
  }

  drawOneCard(): Observable<deckResponse> {

    const drawOneCard = `https://www.deckofcardsapi.com/api/deck/${this.deck_id}/draw/`
    const params = new HttpParams().set("count", 1)
    return this.http.get<deckResponse> (drawOneCard, {params})
  }
}
