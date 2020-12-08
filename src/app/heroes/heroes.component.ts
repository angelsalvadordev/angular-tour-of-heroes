import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

// Services
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(
    private heroSvc: HeroService,
    private messageSvc: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroSvc.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.messageSvc.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
