import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Disease extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('varchar', { length: 255, unique: true })
    name: string;

  @Column("simple-array")
    symptoms: number[];
}