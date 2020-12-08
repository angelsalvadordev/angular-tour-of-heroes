import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { HEROES } from '../mocks/mock-heroes';
import { Observable, of } from 'rxjs';

// Services
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageSvc: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    this.messageSvc.add('HeroService: Fetched heroes');
    return of(HEROES);
  }
}
