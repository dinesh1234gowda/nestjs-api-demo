import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import { User } from './user.model';
import * as jwt from 'jsonwebtoken';
import config from '../config'
import  { checkJWT } from '../middleware/checkjwt'
import { Request } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { responseCodeMapper } from '../lib/responsecode_mapper' 

@Injectable()
export class UserService  {
	constructor(@InjectModel('User') private readonly userModel:Model<User>){}
	async createUser(reqBody:any) {
		const isUser = await this.userModel.findOne({email:reqBody.email});
		if(isUser){
			return {
				message:responseCodeMapper('user.exist')
			}
		}
		const newUser = new this.userModel({first_name:reqBody.fname,last_name:reqBody.lname,email:reqBody.email,password:reqBody.password});
		await newUser.save();
		return {
			message:responseCodeMapper('user.created'),
		}
	}

	async loginUser(reqBody:any){
		const isUser = await this.userModel.findOne({email:reqBody.email,password:reqBody.password});
		if(!isUser){
			return {
				message:responseCodeMapper('login.nouser')
			}
		}
		const token = jwt.sign(isUser.toJSON(),config.jwtSecret,{ expiresIn: "1h"})
		return {
			message:responseCodeMapper('login.success'),
			token
		}
	}
	async getUser(reqBody:any){
		const result = checkJWT(reqBody.token)
		return result
	}
}
