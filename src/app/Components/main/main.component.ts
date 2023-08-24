import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from 'src/app/cards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  form!: FormGroup
  constructor(private fb: FormBuilder, private cardSvc: CardService, private router: Router) {}
  decks: string[] = ['1', '2', '3', '4']
  deckId!: string
  @Output() transmit_id : EventEmitter<string>= new EventEmitter<string>()

  ngOnInit(): void {
    this.form = this.fb.group({
      selectedDeck:['', [Validators.required]]
    })
  }

  process() {
    const value = this.form.value
    console.log("value >>>>>>", value)
    this.cardSvc.getNewDeck()
      .subscribe((result )=>{
        console.log(result.deck_id)
        this.cardSvc.setDeckId(result.deck_id)
        this.router.navigate(['/deck', result.deck_id])
    })
  }


}
