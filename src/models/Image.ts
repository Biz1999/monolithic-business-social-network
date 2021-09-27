import { Exclude, Expose } from "class-transformer";
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

  @Exclude()
  @Column()
  post_id: string;

  @Expose({ name: "post" })
  @JoinColumn({ name: "post_id" })
  @ManyToOne(() => Saude, (saude) => saude.photos)
  postId: Saude;

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
