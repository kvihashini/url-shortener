import { Controller, Get, Post, Body } from '@nestjs/common';
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
  @Post('/shorten') // send data to server to create/update resource
  async createUrl(@Body() createUrlDto: CreateUrlDto): Promise<Url> {
    const shortUrl = await this.urlService.createUrl(createUrlDto.origUrl);
    return shortUrl;
  }
    

  /**
   * Define route to get original URLs from server
   * Handles GET requests to the /url/find endpoint
   */
  @Get('/getoriginal') 
  async findUrl(shortUrl: string): Promise<Url> {
    const originalUrl = await this.urlService.findUrl(shortUrl);
    return originalUrl;
  }

}
