import { IsNumber, IsOptional } from 'class-validator';

export class FindDto {
  @IsNumber()
  @IsOptional()
  offset?: number;
  @IsNumber()
  @IsOptional()
  limit?: number;
}
