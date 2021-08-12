import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wishes')
class Wish {
  @PrimaryGeneratedColumn()
  id!: string;
}

export default Wish;
