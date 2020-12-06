import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity()
export class Setting {

  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  createdAt!: Date;

  @Column()
  value!: string;

}