import { Test, TestingModule} from '@nestjs/testing';
import { UserService } from './user.service';
import {  getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/nestjs-testing'
import { Model, Query } from 'mongoose';
import { User } from './user.model';
import { responseCodeMapper } from '../../utils/responsecode_mapper' 
import responseCodes from '../../response_codes'

//const Mocked

describe('UserService',()=>{ 
	let service: UserService;
	let model: Model<User>;
	beforeEach(async () =>{
		const module: TestingModule = await Test.createTestingModule({
			providers:[
			UserService,
			{
				provide:getModelToken('User'),
				useValue:{
					findOne:jest.fn(),
					create:jest.fn(),
				},
			}
			]
		}).compile();

		service = module.get<UserService>(UserService);
		model = module.get<Model<User>>(getModelToken('User'));
	});

	afterEach(()=>{
		jest.clearAllMocks();
	})

	it('should findOne user',async ()=>{
		jest.spyOn(model,'findOne').mockReturnValue(
			createMock<Query<User, User>>({
				exec: jest.fn().mockResolvedValueOnce({
						fname:'ftest',
						lname:'ltest',
						email:'f.t@test.com',
						pass:'test'
					})
			})
		);
		let reqBody={
			email:"f.sdsdst@test.com",
			pass:"testss"
		}
		const successfulLoginMsg = { message:responseCodeMapper(responseCodes,'login.success')}
		expect(await service.loginUser(reqBody)).toMatchObject(successfulLoginMsg)
	})
	it('should findOne user and display no such user',async ()=>{
		let reqBody={
			email:"f.sdsdst@test.com",
			pass:"testss"
		}
		const noSuchUserMsg = { message:responseCodeMapper(responseCodes,'login.nouser')}
		expect(await service.loginUser(reqBody)).toMatchObject(noSuchUserMsg)
	})
	
	it('should create user',async ()=>{
	    jest.spyOn(model, 'create').mockImplementationOnce(() =>
	      Promise.resolve({
	      	fname:"test",
	      	lname:"test",
	      	email:"test@gmail.com",
	      	pass:"test"
	      }),
	    );
		let reqBody={
			fname:"test",
			lname:"test",
			email:"f.sdsdst@test.com",
			pass:"testss"
		}
		const successfulLoginMsg = { message:responseCodeMapper(responseCodes,'user.created')}
		expect(await service.createUser(reqBody)).toMatchObject(successfulLoginMsg)
	})
})