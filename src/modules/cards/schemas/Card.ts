/* eslint-disable indent */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

@Entity('cards')
class Card {
  @Exclude()
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  foil: boolean;

  @Column()
  edition: string;

  @Column()
  playerId: string;

  @Column()
  language: string;

  @Column()
  quantity: number;

  @Column()
  priceInBrazilianReal: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'id' })
  getId() {
    return this.id.toHexString();
  }

  @BeforeInsert()
  @BeforeUpdate()
  checkPrice() {
    if (this.priceInBrazilianReal < 0.0) {
      this.priceInBrazilianReal = 0.0;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  checkQuantity() {
    if (this.quantity < 0) {
      this.quantity = 0;
    }
    this.quantity = parseInt(`${this.quantity}`);
  }
}

export default Card;
