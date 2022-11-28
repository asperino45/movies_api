import { IsUUID, Length, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsUUID('all')
  id: string;

  @Length(1)
  title: string;

  @Length(1)
  description: string;

  @Length(1)
  director: string;

  @Length(1)
  producer: string;

  @IsUrl()
  movieBanner: string;
}
