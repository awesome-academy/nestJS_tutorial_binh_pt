import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;
}
