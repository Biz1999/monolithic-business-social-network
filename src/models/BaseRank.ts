import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";

@Entity("base")
export class BaseRank {
  // @PrimaryColumn()
  // readonly id?: string;

  @PrimaryColumn()
  // @Column()
  colaborador: string;

  @Column()
  setor: string;

  @Column()
  resumos_livros_artigos: number;

  @Column()
  treinamentos_palestras_cursos: number;

  @Column()
  artigo: number;

  @Column()
  licoes_aprendidas: number;

  @Column()
  quiz: number;

  @Column()
  atividade_fisica: number;

  @Column()
  alimentacao_saudavel: number;

  @Column()
  qualidade: number;

  @Column()
  walk_the_talk: number;

  @Column()
  responsabilidade_social: number;

  @Column()
  total: number;

  @Column()
  carteira: number;

  // constructor() {
  //   if (!this.id) {
  //     this.id = uuid();
  //   }
  // }
}
