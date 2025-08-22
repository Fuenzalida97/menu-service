import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuModule } from './menu/menu.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para poder inyectar ConfigService
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Lee la URI desde las variables de entorno
        // aquí puedes añadir más opciones de conexión si las necesitas
      }),
      inject: [ConfigService],
    }),

    MenuModule,
  ],
})
export class AppModule {}
