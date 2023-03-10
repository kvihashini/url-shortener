import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { Url } from './schemas/url.schema';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

/**
 * Controller class
 * Handles incoming requests with GET, POST methods
 * Handles requests at the /url endpoint
 */

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    /**
     *
     * Define new route to create in server for generating short URLs
     * Handles POST requests to the /url/shorten endpoint
     */

    @Post('/shorten')
    async createUrl(@Body() createUrlDto: CreateUrlDto): Promise<Url> {
        const shortUrl = await this.urlService.getShortUrl(
            createUrlDto.origUrl
        );
        return shortUrl;
    }

    /**
     * Define route to get original URLs from server
     * Handles GET requests to the /url/find endpoint
     */

    @Get(':shortUrl')
    async findUrl(
        @Param('shortUrl') shortUrl: string,
        @Req() req: Request
    ): Promise<Url> {
        const originalUrl = await this.urlService.getLongUrl(shortUrl);
        return originalUrl;
    }
}
