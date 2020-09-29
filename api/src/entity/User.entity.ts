import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  email: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contact: string;

  @Field({ nullable: true })
  @Column({ nullable: false })
  dob: string;

  @Column()
  password: string;
}
