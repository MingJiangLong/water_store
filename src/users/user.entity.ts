import {
    Table,
    Column,
    Model,
    Unique,
    IsEmail,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
} from 'sequelize-typescript';
import { Gender } from '../shared/enum/Gender';
import { UserStatus } from '../shared/enum/UserStatus';

@Table({
    tableName: 'users',
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        field: 'user_id'
    })
    userId: string;

    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: 'open_id'
    })
    openId: string;

    @Column({ type: DataType.ENUM(Gender.FEMALE, Gender.MALE) })
    gender: Gender;

    @Column(DataType.STRING)
    phone: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column({
        type: DataType.ENUM(UserStatus.ABLE, UserStatus.DISABLE, UserStatus.IN_USE),
        field: 'user_status',
    })
    userStatus: string

    @Column({
        type: DataType.STRING,
        field: 'user_name',
    })
    userName: string

    @Column(DataType.STRING)
    password: string

    @Column(DataType.DATEONLY)
    birthday: string;

    @CreatedAt
    @Column({
        field: 'created_at',
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;
}
