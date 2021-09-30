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

@Entity("conhecimento")
export class Conhecimento {
  @PrimaryColumn()
  readonly id: string;

  @Exclude()
  @Column()
  pilar_id: string;

  @Expose({ name: "pilar" })
  @JoinColumn({ name: "pilar_id" })
  @OneToOne(() => Pilar)
  pilarId: Pilar;

  @Column()
  categoria: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({ nullable: true, select: false })
  file: string;

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
