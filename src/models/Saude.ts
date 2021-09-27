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
import { Exclude, Expose } from "class-transformer";

@Entity("saude")
export class Saude {
  @PrimaryColumn()
  readonly id: string;

  @Expose({ name: "id_pilar" })
  @Column()
  pilar_id: string;

  @Expose({ name: "pilar" })
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

  @Exclude()
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
