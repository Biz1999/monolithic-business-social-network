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
import { Exclude } from "class-transformer";

@Entity("files")
export class File {
  @PrimaryColumn()
  readonly id: string;

  @Exclude()
  @Column()
  conhecimento_id: string;

  @JoinColumn({ name: "conhecimento_id" })
  @ManyToOne(() => Conhecimento)
  conhecimentoId: Conhecimento;

  @Column()
  uri: string;

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
