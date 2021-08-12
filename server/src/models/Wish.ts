import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wishes')
class Wishes {
  @PrimaryGeneratedColumn()
  id!: string;
}

export default Wishes;
