import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsUUID, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateMovieDto } from './create-movie.dto';

export class ExternalMovieDto extends CreateMovieDto {
  @Expose({ name: 'movie_banner' })
  @IsUrl()
  movieBanner: string;
}
