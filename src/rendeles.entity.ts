import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Csavar } from "./csavar.entity";

@Entity()
export class Rendeles {
    @PrimaryGeneratedColumn()
    id : number;
    
    @ManyToOne(() => Csavar, (csavar) => csavar.id)
    csavar_id : Csavar

    @Column('int')
    db : number

}