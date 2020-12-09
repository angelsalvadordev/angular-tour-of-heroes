import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../interfaces/hero.interface';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroSvc: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // Esperar 300 ms después de cada pulsación para tomar en cuenta al término
      debounceTime(300),
      // Ignorar al nuevo término si es el mismo al anterior
      distinctUntilChanged(),
      // Nueva búsqueda observable cada que cambia el término
      switchMap((term: string) => this.heroSvc.searchHeroes(term))
    );
  }

  // Agrega un término de búsqueda al flujo observable
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
