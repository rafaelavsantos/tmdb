import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly api_key: string = process.env.API_KEY!;
  private readonly baseUrl: string = process.env.BASE_URL!;

  constructor(private readonly httpService: HttpService) {}

  async getTopRatedMovies(): Promise<any[]> {
    const allMovies: any[] = [];

    // paginação 20 filmes por página
    for (let i = 1; i <= 13; i++) {
      const url = `${this.baseUrl}?api_key=${this.api_key}&language=pt-BR&page=${i}`;
      const response = await firstValueFrom(this.httpService.get(url));

      console.log(response.data)
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

  async getCountByYear(): Promise<string> {
    return 'Retorna a quantidade de filme por ano';
  }

  async getTrendingComparison(): Promise<string> {
    return 'Filmes dos top-rated que estão entre os trending';
  }
}
