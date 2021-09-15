import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Conhecimento } from "./Conhecimento";
import { v4 as uuid } from "uuid";

@Entity("files")
export class File {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  conhecimento_id: string;

  @JoinColumn({ name: "conhecimento_id" })
  @ManyToOne(() => Conhecimento)
  conhecimentoId: Conhecimento;

  @Column()
  uri: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
