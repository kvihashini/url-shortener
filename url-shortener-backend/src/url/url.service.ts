import { Injectable } from '@nestjs/common';
import { Url } from './schemas/url.schema';
import { UrlRepository } from './url.repository';

/**
 * Service class
 * Injectables to be used by controller class methods - additional functionality
 */
@Injectable()
export class UrlService {
    constructor(private readonly urlRepository: UrlRepository) {}

    async createUrl(url: string): Promise<Url> {
        const shortUrl = 'testurl';
        const newUrl = this.urlRepository.createUrl({
            origUrl: url,
            shortUrl: shortUrl
        });
        return newUrl;
    }

    async findUrl(shortUrl: string): Promise<Url> {
        const url = this.urlRepository.findUrl({ shortUrl });
        return url;
    }
}
