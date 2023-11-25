import { IsEmail , Min , Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column , BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm"
import bcrypt from "bcrypt"
import {instanceToPlain , Exclude} from "class-transformer"

@Entity("users")
export class User extends BaseEntity {
    constructor( user : Partial<User> = {} ) {
        super();
        Object.assign(this, user)
    }
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Length(3 , undefined)
    @Column({ unique: true})
    username: string

    @Index()
    @IsEmail()
    @Column({ unique: true})
    email: string  

    @Exclude()
    @Length(3)
    @Column()
    password:  string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async hashPassword() {
        this.password = bcrypt.hashSync(this.password, 6);
    }

    toJSON() {
        return instanceToPlain(this);
    }
}
