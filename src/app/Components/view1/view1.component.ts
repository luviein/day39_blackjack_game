import { CardService } from './../../cards.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { cardsArray } from 'src/app/newDeck.model';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit{
  constructor(private activatedRoute: ActivatedRoute, private title: Title, private fb: FormBuilder, private svc: CardService, private router: Router) {}
  deck_id = ""
  cardsArray: cardsArray[] = []
  computerCardsArray: cardsArray[]=[]
  userTotal!: number
  computerTotal!: number
  hasUserLost: boolean = false
  drawCount: string[] = ['1', '2']
  form!: FormGroup


  cardValueMap: {[key: string] : number} = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'JACK': 10,   // Assigning JACK a value of 10
    'QUEEN': 10,  // Assigning QUEEN a value of 10
    'KING': 10 ,   // Assigning KING a value of 10
    'ACE': 11
  }

  ngOnInit(): void {
    this.deck_id = this.activatedRoute.snapshot.params['deck_id']
    this.title.setTitle("Deck " + this.deck_id)
    this.form = this.fb.group({

    })
    this.drawTwoCardsUser()
    this.drawTwoCardsComputer()

  }

  drawTwoCardsUser(){
    const result = this.svc.drawCard().subscribe(result => {
      this.cardsArray = result.cards
      this.userTotal = result.cards.reduce((sum, card) => {
        const cardValue = card.value;
        const numericValue = this.cardValueMap[cardValue] || parseInt(cardValue);

        return sum + numericValue;
      }, 0);
      console.log("in drawtwocardsuser >>>", this.userTotal)

      if(this.userTotal== 21) {
      this.displayCardsWithDelay(() => {
        alert("BLACKJACK! You Won!");
        this.router.navigate(['/']);
      })
    }

    })


  }

  drawTwoCardsComputer(){
    const result = this.svc.drawCard().subscribe(result => {
      this.computerCardsArray = result.cards
      this.computerTotal = result.cards.reduce((sum, card) => {
        const cardValue = card.value;
        const numericValue = this.cardValueMap[cardValue] || parseInt(cardValue);

        return sum + numericValue;
      }, 0);
      if(this.computerTotal == 21){
        this.displayCardsWithDelay(() => {
          alert("Dang, you have no luck today. Try again?");
          this.router.navigate(['/']);
        })
      }
    })

  }


  drawOneCard() {
    const output = this.svc.drawOneCard().subscribe(result=>{
      this.cardsArray.push(...result.cards);
      // const value = this.form.value;
      this.userTotal = result.cards.reduce((sum, card) => {
        const cardValue = card.value;
        const numericValue = this.cardValueMap[cardValue] || parseInt(cardValue);

        return sum + numericValue;
      }, this.userTotal);

      if (this.userTotal == 21) {
        this.displayCardsWithDelay(() => {
          alert("BLACKJACK! You Won!");
          this.router.navigate(['/']);
        });
      } else if (this.userTotal > 21 || this.computerTotal == 21 || (this.computerTotal <= 21 && this.computerTotal < this.userTotal && this.userTotal > 21)) {
        this.displayCardsWithDelay(() => {
          alert("You lose!\n Try again?");
          this.router.navigate(['/']);
        });
      }
      else {
        this.drawOneCardComputer()
      }


    })

  }

  drawOneCardComputer() {

    if(this.computerTotal < 17) {
      const output = this.svc.drawOneCard().subscribe(result=>{
        this.computerCardsArray.push(...result.cards);
        // const value = this.form.value;
        this.computerTotal = result.cards.reduce((sum, card) => {
          const cardValue = card.value;
          const numericValue = this.cardValueMap[cardValue] || parseInt(cardValue);

          return sum + numericValue;
        }, this.computerTotal);

        console.log("in draw card comp >>>>", this.computerTotal )
        console.log("in draw card comp user >>>>", this.userTotal )
        if(this.computerTotal > 21 && this.userTotal < 21) {
          this.displayCardsWithDelay(() => {
            alert("You beat the Computer!\n Play again?");
            this.router.navigate(['/']);
          })
        }
      })


    }




  }

  displayCardsWithDelay(callback: Function, delayMs: number = 1300) {
    // Display cards for the specified delay before calling the callback
    setTimeout(() => {
      callback();
    }, delayMs);
  }

  endTurn() {
    this.drawOneCardComputer()
    if(this.computerTotal > this.userTotal && this.computerTotal <=21) {
      this.displayCardsWithDelay(() => {
        alert("Computer beat you hard! \n Play again?");
        this.router.navigate(['/']);
      })
    } else if (this.userTotal == this.computerTotal) {
      this.displayCardsWithDelay(() => {
        alert("Oh wow, you actually tied with the Computer!\n Play again?");
        this.router.navigate(['/']);
      })
    } else {
      this.displayCardsWithDelay(() => {
        alert("You beat the Computer!\n Play again?");
        this.router.navigate(['/']);
      })
    }

  }





}
