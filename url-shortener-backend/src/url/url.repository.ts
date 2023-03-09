import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './schemas/url.schema';
import { FilterQuery, Model } from 'mongoose';

/**
 * Layer in charge of storing Url and Document
 */
@Injectable()
export class UrlRepository {
    constructor(
        @InjectModel(Url.name) private readonly urlModel: Model<UrlDocument>
    ) {}

    async createUrl(url: Url): Promise<Url> {
        const newUrl = new this.urlModel(url);
        const result = await newUrl.save();
        return result;
    }

    async findUrl(query: FilterQuery<Url>): Promise<Url> {
        return this.urlModel.findOne(query);
    }
}
