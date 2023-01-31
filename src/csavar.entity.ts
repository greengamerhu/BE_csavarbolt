import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rendeles } from "./rendeles.entity";

@Entity()
export class Csavar {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    tipus : string
    
    @Column('int')
    hossz : number

    @Column('int')
    keszlet : number

    @Column({type : 'decimal', scale: 2})
    ar : number

  @OneToMany(() => Rendeles, (rendeles) => rendeles.csavar_id)
    rendelesek: Rendeles[]
}