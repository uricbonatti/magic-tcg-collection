import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  Index
} from 'typeorm';
import { ObjectId } from 'mongodb';

import { Expose, Exclude } from 'class-transformer';

@Entity('players')
class Player {
  @Exclude()
  @ObjectIdColumn()
  id: ObjectId;

  @Index({ unique: true })
  @Column()
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
