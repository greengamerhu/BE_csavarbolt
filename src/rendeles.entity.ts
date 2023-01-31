import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Csavar } from "./csavar.entity";

@Entity()
export class Rendeles {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column('int')
    csavar_id : number

    @Column('int')
    db : number

    @ManyToOne(() => Csavar, (csavar) => csavar.id)
    csavar: Csavar
}