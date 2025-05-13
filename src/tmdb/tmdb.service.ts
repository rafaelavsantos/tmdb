import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly api_key: string;
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.api_key = this.configService.get<string>('API_KEY')!;
    this.baseUrl = this.configService.get<string>('BASE_URL')!;
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

  async getAverageByGenre(): Promise<string> {
    return 'Retorna a media';
  }

  async getCountByGenre(): Promise<string> {
    return 'Retorna a quantidade de filme por genero';
  }

  async getCountByYear(): Promise<Record<string, number>> {
    const movies = await this.getTopRatedMovies();
    const count: Record<string, number> = {};

    movies.forEach((movie, index) => {
      const year = movie.release_date.slice(0,4);
      
      if(!count[year]) {
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
