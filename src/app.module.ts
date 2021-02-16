import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Authentication } from './middleware/auth.middleware'
import { dataBaseProvider } from './db/database'
import config from './config'
// function databaseProvider(db){
// 	let dataBases = [];
// 		dataBases.push(MongooseModule.forRoot('mongodb://localhost/mydb',{
//   		connectionName:'mydb'
//   	}))

// 	dataBases.push(MongooseModule.forRoot('mongodb://localhost/mydb2',{
//   	connectionName:'mydb2'
//   }))

// 	return dataBases;
// }

console.log(process.env.NODE_ENV)

@Module({
  imports: [UserModule,...dataBaseProvider(config.databases)],
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
