import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

/**
 * Database schema for Url
 */
@Schema()
export class Url {
    @Prop({ required: true })
    origUrl: string;

    @Prop({ required: true })
    shortUrl: string;
}

// Creation of Mongoose schema
export const UrlSchema = SchemaFactory.createForClass(Url);
