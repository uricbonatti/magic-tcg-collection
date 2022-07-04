/* eslint-disable indent */
import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  ObjectID
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';

@Entity('player')
class Player {
  @Exclude()
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Expose({ name: 'id' })
  getId() {
    return this.id.toHexString();
  }
}

export default Player;
