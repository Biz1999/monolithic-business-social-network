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
import { Saude } from "./Saude";

@Entity("images")
export class Image {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  post_id: string;

  @JoinColumn({ name: "post_id" })
  @ManyToOne(() => Saude)
  postId: Saude;

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
