import * as jwt from 'jsonwebtoken';
import config from '../config';

export const checkJWT = (token)=>{
	let jwtPayload:any = {};
	let isAutheticated = false;
	try {
		jwtPayload = <any>jwt.verify(token,config.jwtSecret)
	}catch(error){
		console.log(error)
	}
	if(jwtPayload && jwtPayload.email){
		isAutheticated = true
	}
	return {isAutheticated,jwtPayload}
}