import {Component, effect, inject, Input, OnInit} from '@angular/core';
import {TmdbService} from '../../../service/tmdb.service';
import {Movie, MovieApiResponse} from '../../../service/model/movie.model';
import {MovieCardComponent} from './movie-card/movie-card.component';

export type Mode = 'GENRE' | 'TREND'

@Component({
  selector: 'app-movie-list',
  imports: [
    MovieCardComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit{

  @Input() genreId = -1;

  @Input() mode: Mode = 'GENRE'

  tmdbService = inject(TmdbService);

  moviesByGenre: Movie[] | undefined;

  trendMovies: Movie[] | undefined;

  constructor() {
    effect(() => {
      if (this.mode === 'GENRE') {
        const moviesByGenreResponse = this.tmdbService.moviesByGenre().value ?? {} as MovieApiResponse;
        if(moviesByGenreResponse.genreId === this.genreId) {
          this.moviesByGenre = moviesByGenreResponse.results;
        }
      } else if (this.mode === 'TREND') {
        const trendMovieResponse = this.tmdbService.fetchTrendMovie().value;
        if (trendMovieResponse) {
          this.moviesByGenre = trendMovieResponse.results;
        }
      }
    });
  }

  ngOnInit() {
    this.fetchMoviesByGenre();
    this.fetchTrends();
  }

  private fetchMoviesByGenre(){
    this.tmdbService.getMoviesByGenre(this.genreId);
  }

  private fetchTrends() {
    this.tmdbService.getTrends();
  }

}
