import { Injectable } from '@nestjs/common';
import { Url } from './schemas/url.schema';
import { UrlRepository } from './url.repository';
import { nanoid } from 'nanoid';

/**
 * Service class
 * Injectables to be used by controller class methods - additional functionality
 */
@Injectable()
export class UrlService {
    constructor(private readonly urlRepository: UrlRepository) {}

    async getShortUrl(origUrl: string): Promise<Url> {
        // check if origUrl already exists in the database
        const existingUrl = await this.urlRepository.findUrl({ origUrl });

        if (existingUrl) {
            return existingUrl;
        }

        // else, create a new shortUrl
        const randId = nanoid(7);
        const newUrl = this.urlRepository.createUrl({
            origUrl: origUrl,
            shortUrl: `${process.env.BASE_URL}/${randId}`,
            shortId: `${randId}`
        });

        return newUrl;
    }

    async getLongUrl(shortId: string): Promise<Url> {
        const existingUrl = await this.urlRepository.findUrl({ shortId });

        if (existingUrl) {
            return existingUrl;
        }

        throw new Error('URL not found');
    }
}
