import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';

config();
const MONGO_URI = process.env.MONGO_URI;

@Module({
    imports: [MongooseModule.forRoot(MONGO_URI), UrlModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
