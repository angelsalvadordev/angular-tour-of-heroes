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

  add(name: string): void {
    name = name.trim();

    if (!name) return;

    this.heroSvc.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(heroSelected: Hero): void {
    this.heroes = this.heroes.filter((hero) => hero !== heroSelected);
    this.heroSvc.deleteHero(heroSelected).subscribe();
  }
}
