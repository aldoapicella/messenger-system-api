import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: this.configService.get('POSTGRES_URI'),
            // autoLoadEntities: true,
            // synchronize: true, // DO NOT USE IN PRODUCTION - THIS WILL DROP ALL TABLES ON EVERY RESTART
        }
    }
}