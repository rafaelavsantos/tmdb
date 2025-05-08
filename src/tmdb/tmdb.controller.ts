import { Controller, Get} from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('top-rated')
  async getTopRatedMovies() {
    return await this.tmdbService.getTopRatedMovies();
  }

  @Get('average-by-genre')
  async getAverageByGenre() {
    return await this.tmdbService.getAverageByGenre();
  }

  @Get('count-by-genre')
  async getCountByGenre() {
    return await this.tmdbService.getCountByGenre();
  }

  @Get('count-by-year')
  async getCountByYear() {
    return await this.tmdbService.getCountByYear();
  }

  @Get('trending-comparison')
  async getTrendingComparison() {
    return await this.tmdbService.getTrendingComparison();
  }
}
