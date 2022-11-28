import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  movieBanner: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column()
  producer: string;
}
