import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Url, UrlSchema } from "./schemas/url.schema";
import { UrlController } from "./url.controller";
import { UrlRepository } from "./url.repository";
import { UrlService } from "./url.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
    controllers: [UrlController],
    providers: [UrlService, UrlRepository]
})

export class UrlModule {}