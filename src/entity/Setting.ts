import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Timestamp } from "typeorm";


@Entity()
export class Setting extends BaseEntity {

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