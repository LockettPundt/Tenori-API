import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity()
export class Setting {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  createdAt!: Date;

  @Column()
  value!: string;

}