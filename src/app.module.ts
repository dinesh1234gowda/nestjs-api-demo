import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Authentication } from './middleware/auth.middleware'

@Module({
  imports: [UserModule,MongooseModule.forRoot('mongodb://localhost/mydb',{
  	connectionName:'mydb'
  }),MongooseModule.forRoot('mongodb://localhost/mydb2',{
  	connectionName:'mydb2'
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
	configure(consumer:MiddlewareConsumer){
		consumer
		.apply(Authentication)
		.forRoutes(
      { path: '/**', method: RequestMethod.ALL }
   );
	}
}
