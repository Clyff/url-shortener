import { BaseEntity } from 'typeorm';
export declare class Url extends BaseEntity {
    id: number;
    oldUrl: string;
    newUrl: string;
    createdAt: Date;
}
