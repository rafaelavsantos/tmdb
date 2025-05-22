import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly api_key: string;
  private readonly baseUrl: string;
  private readonly urlGenre: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.api_key = this.configService.get<string>('API_KEY')!;
    this.baseUrl = this.configService.get<string>('BASE_URL')!;
    this.urlGenre = this.configService.get<string>('URL_GENRE')!;
  }

  async getTopRatedMovies(): Promise<any[]> {
    const allMovies: any[] = [];

    // paginação 20 filmes por página
    for (let i = 1; i <= 13; i++) {
      const url = `${this.baseUrl}?api_key=${this.api_key}&language=pt-BR&page=${i}`;
      const response = await firstValueFrom(this.httpService.get(url));

      allMovies.push(...response.data.results);
    }
    return allMovies.slice(0, 250);
  }

  async getGenre(): Promise<any[]> {
    const url = `${this.urlGenre}?api_key=${this.api_key}&language=pt-BR`;
    const response = await firstValueFrom(this.httpService.get(url));

    return response.data.genres;
  }

  async getAverageByGenre(): Promise<Record<string, number>> {
    const allMovies = await this.getTopRatedMovies();
    const genres = await this.getGenre();

    const count: Record<string, number> = {};
    const sum: Record<string, number> = {};
    const average: Record<string, number> = {};
    
    genres.forEach((g) => {
      const idGenre = g.id;
      const nameGenre = g.name;
      
      allMovies.forEach((movie) => {
        const genreMovieId = movie.genre_ids;
        console.log(movie);

        if(genreMovieId.includes(idGenre)) {
          count[nameGenre] = (count[nameGenre] || 0) + 1;
          sum[nameGenre] = (sum[nameGenre] || 0) + movie.vote_average;
        }
      });
    });

    Object.keys(sum).forEach((name) => {
      average[name] = parseFloat((sum[name] / count[name]).toFixed(2));
    })

    return average;
  }

  async getCountByGenre(): Promise<Record<string, number>>{
    const allMovies = await this.getTopRatedMovies();
    const genres = await this.getGenre();

    const count: Record<string, number> = {};

    genres.forEach((g) => {
      const idGenre = g.id;
      const nameGenre = g.name;
      
      allMovies.forEach((movie) => {
        const genreMovieId = movie.genre_ids;

        if(genreMovieId.includes(idGenre)) {
          count[nameGenre] = (count[nameGenre] || 0) + 1;
        }
      });
    });

    return count;
  }

  async getCountByYear(): Promise<Record<string, number>> {
    const movies = await this.getTopRatedMovies();
    const count: Record<string, number> = {};

    movies.forEach((movie) => {
      const year = movie.release_date.slice(0, 4);

      if (!count[year]) {
        count[year] = 1;
      } else {
        count[year]++;
      }
    })

    return count;
  }

  async getTrendingComparison(): Promise<string> {
    return 'Filmes dos top-rated que estão entre os trending';
  }
}
