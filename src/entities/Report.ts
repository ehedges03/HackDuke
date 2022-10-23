import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column("varchar", { length: 255 })
    user: string;

  @Column("simple-array")
    symptoms: number[];

  @Column("float")
    lat: number;

  @Column("float")
    lng: number;

  @CreateDateColumn()
    created: Date;
}