import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('urls')
export class Url extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'old_url', type: 'varchar', length: 2048 })
  oldUrl: string;

  @Column({ name: 'new_url', type: 'varchar', length: 10, unique: true })
  newUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;
}
