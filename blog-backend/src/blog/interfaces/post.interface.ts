import { Document } from 'mongoose';

export interface Post extends Document {
    readonly title: String;
    readonly description: String;
    readonly body: string;
    readonly author: string;
    readonly date_posted: string;
}