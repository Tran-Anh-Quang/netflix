import {Component, effect, inject, OnInit} from '@angular/core';
import {TmdbService} from '../../service/tmdb.service';
import {Movie} from '../../service/model/movie.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-main-content',
  imports: [
    FaIconComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit{
  tmdbService = inject(TmdbService);

  trendMovie: Movie | undefined;

  constructor() {
    effect(() => {
      const trendMovieResponse = this.tmdbService.fetchTrendMovie().value;
      if(trendMovieResponse) {
        this.trendMovie = trendMovieResponse.results[0];
      }
    });
  }

  ngOnInit(): void {
    this.fetchMovieTrends();
  }

  fetchMovieTrends(): void {
    this.tmdbService.getTrends();
  }
}
