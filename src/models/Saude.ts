import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Pilar } from "./Pilar";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("saude")
export class Saude {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  pilar_id: string;

  @JoinColumn({ name: "pilar_id" })
  @OneToOne(() => Pilar)
  pilarId: Pilar;

  @Column()
  categoria: string;

  @Column()
  legenda: string;

  @Exclude()
  @Column()
  isAvailable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
