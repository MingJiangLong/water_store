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
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript';
import { Gender } from '../shared/enum/Gender';
import { UserStatus } from '../shared/enum/UserStatus';
import { AccountStatus } from '../shared/enum/AccountStatus';

@Table({
    tableName: 'user',
})
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: 'user_id'
    })
    userId: string;

    @Column({
        type: DataType.STRING,
        field: 'open_id'
    })
    openId: string;

    @Column({
        type: DataType.STRING,
        field: 'user_name',
    })
    userName: string

    @Column({ type: DataType.ENUM(Gender.FEMALE, Gender.MALE) })
    gender: Gender;

    @Unique
    @Column(DataType.STRING)
    phone: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column({
        type: DataType.ENUM(AccountStatus.IN_USE, AccountStatus.DELETE, AccountStatus.BLACK),
        field: 'account_status',
        comment: "用户账号状态"
    })
    accountStatus: AccountStatus



    @Column(DataType.DATEONLY)
    birthday: string;


    @Column(DataType.STRING)
    account: string

    @Column(DataType.STRING)
    password: string

    @CreatedAt
    @Column({
        field: 'created_at',
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @UpdatedAt
    @Column({
        field: 'updated_at',
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}
