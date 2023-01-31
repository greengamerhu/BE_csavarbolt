import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('decimal(30,2)')
    ar : number

    @Many
}