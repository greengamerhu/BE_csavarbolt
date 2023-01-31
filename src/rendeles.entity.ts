import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Redndeles {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column('int')
    csavar_id : number

    @Column('int')
    db : number

    
}