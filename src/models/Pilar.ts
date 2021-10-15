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
import { Exclude, Expose } from "class-transformer";
import { Colaborador } from "./Colaborador";

@Entity("pilares")
export class Pilar {
  @PrimaryColumn()
  readonly id: string;

  @Exclude()
  @Column()
  colaborador_id: string;

  @Expose({ name: "colaborador" })
  @JoinColumn({ name: "colaborador_id" })
  @ManyToOne(() => Colaborador)
  colaboradorId: Colaborador;

  @Column()
  pontuacao: Number;

  @Column()
  status: string;

  @Expose({ name: "data_inclusao" })
  @CreateDateColumn()
  created_at: string;

  @Expose({ name: "data_alteracao" })
  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
