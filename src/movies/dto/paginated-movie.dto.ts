import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDto } from 'src/dto/paginated.dto';
import { Movie } from '../entities/movie.entity';

export class PaginatedMovieDto extends PaginatedDto<Movie> {
  @ApiProperty({ type: [Movie] })
  readonly data: Movie[];

  constructor(data: Movie[], total: number) {
    super(data, total);
  }
}
