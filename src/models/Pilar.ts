import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";
import { Colaborador } from "./Colaborador";

@Entity("pilares")
export class Pilar {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  colaborador_id: string;

  @JoinColumn({ name: "colaborador_id" })
  @ManyToOne(() => Colaborador)
  colaboradorId: Colaborador;

  @Column()
  pontuacao: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: string;

  @Exclude()
  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
