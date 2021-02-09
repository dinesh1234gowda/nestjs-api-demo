import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { UserService } from './user.service'
import { Request } from 'express';
import { responseCodeMapper } from '../lib/responsecode_mapper' 

@Controller()
export class UserController {
	constructor(private readonly UserService: UserService){

	}
	@Post('userSignup')
	createUser(@Req() request: Request):any {
		console.log(request.body)
		let reqBody = request.body 
		if(!reqBody || !reqBody.email || !reqBody.fname || !reqBody.lname){
			return {
				message:responseCodeMapper('invalid.body')
			}
		}
		return this.UserService.createUser(request.body);
	}

	@Post('userLogin')
	loginUser(@Req() request: Request):any{
		console.log(request.body)
		if(!request.body || !request.body.email || !request.body.password){
			return {
				message:responseCodeMapper('invalid.body')
			}
		}
		return this.UserService.loginUser(request.body);
	}
	// @Post('getUser')
	// getUser(@Req() request: Request){
	// 	return this.UserService.getUser(request)
	// }
}