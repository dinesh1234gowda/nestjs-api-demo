import { connectionUrl } from './connection-url'
import { MongooseModule } from '@nestjs/mongoose';

export function dataBaseProvider(dbconfig){
	return dbconfig.map((db)=>{
		return MongooseModule.forRoot(connectionUrl(db),{
			connectionName:db.dbName
		})
	})
}