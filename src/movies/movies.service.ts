import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { TransformPlainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { firstValueFrom, catchError, map } from 'rxjs';
import { FindDto } from 'src/dto/find.dto';
import { PaginatedDto } from 'src/dto/paginated.dto';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ExternalMovieDto } from './dto/external-movie.dto';
import { PaginatedMovieDto } from './dto/paginated-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto);
  }

  async findAll(findDto: FindDto) {
    const [total, data] = await Promise.all([
      this.movieRepository.count(),
      this.movieRepository.find({
        skip: findDto.offset,
        take: findDto.limit,
      }),
    ]);

    return new PaginatedMovieDto(data, total);
  }

  findOne(id: string) {
    return this.movieRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = this.movieRepository.findOneOrFail({ where: { id: id } });
    return this.movieRepository.save({ ...movie, ...updateMovieDto });
  }

  remove(id: string) {
    return this.movieRepository.delete(id);
  }

  @TransformPlainToInstance(ExternalMovieDto)
  async findAllExternal(): Promise<ExternalMovieDto[]> {
    return await firstValueFrom(
      this.httpService.get<ExternalMovieDto[]>(`films`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new InternalServerErrorException(
            'Error when consulting external movie api.',
          );
        }),
        map((res) => res.data),
      ),
    );
  }

  async seed() {
    const movies = await this.findAllExternal();
    movies.forEach((movie) => validate(movie, { whitelist: true }));
    return this.movieRepository.save(movies);
  }
}
