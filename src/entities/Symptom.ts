import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export default class Symptom extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('varchar', { length: 255, unique: true })
    name: string;
}