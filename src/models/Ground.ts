import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Pilar } from "./Pilar";
import { Colaborador } from "./Colaborador";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("grounds")
export class Ground {
  @PrimaryColumn()
  readonly id: string;

  @Exclude()
  @Column()
  pilar_id: string;

  @JoinColumn({ name: "pilar_id" })
  @OneToOne(() => Pilar)
  pilarId: Pilar;

  @Exclude()
  @Column()
  colaborador_id: string;

  @JoinColumn({ name: "colaborador_id" })
  @OneToOne(() => Colaborador)
  colaboradorId: Colaborador;

  @Column()
  descricao: string;

  @Exclude()
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
