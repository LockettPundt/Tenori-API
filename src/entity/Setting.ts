import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity()
export class Setting {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  createdAt!: Date;

  @Column({ nullable: true })
  updatedAt!: Date;

  @Column()
  value!: string;

}