import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Pilar } from "./Pilar";
import { v4 as uuid } from "uuid";
import { Exclude, Expose } from "class-transformer";
import { File } from "./File";

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

  @OneToMany((type) => File, (file) => file.conhecimentoId)
  files: File[];

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
