import * as mongoose from 'mongoose';

export interface IActivity {
    _id?: string;
    title: string;
    description: string;
    rate: number;
}