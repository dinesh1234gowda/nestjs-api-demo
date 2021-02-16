import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';
import { userSchema } from './user.model';
import { responseCodeMapper } from '../../utils/responsecode_mapper' 
import responseCodes from '../../response_codes'



describe('UsersController',()=>{
	let controller: UserController;
	let service: UserService;

	beforeEach(async()=>{
		const moduleRef = await Test.createTestingModule({
			controllers:[UserController],
			providers:[{
				provide:UserService,
				useValue:{
					createUser:jest.fn().mockResolvedValue({message:responseCodeMapper(responseCodes,'user.created')}),
					loginUser:jest.fn().mockResolvedValue({message:responseCodeMapper(responseCodes,'login.success')})				}
			}]
		}).compile();
		service = moduleRef.get<UserService>(UserService);
		controller = moduleRef.get<UserController>(UserController);		// userService = new UserService()
	})
	describe('unit test cases of User Service',()=>{
		it('create a user',async()=>{
			const result:any = {message:responseCodeMapper(responseCodes,'user.created')};
			let requestBody:any = {
				body:{
					fname:"testfname",
					lname:"testlname",
					email:"test@test.com",
					password:"pass",
				}
			}
			expect(await controller.createUser(requestBody)).toEqual(result)
		})

		it('user login',async()=>{
			const result:any = {message:responseCodeMapper(responseCodes,'login.success')};
			let requestBody:any = {
				body:{
					email:"test@test.com",
					password:"pass",
				}
			}
			expect(await controller.loginUser(requestBody)).toEqual(result)
		})

		it('invalid request Body',async()=>{
			let requestBody:any = {
				body:{
					fname:'testfname'
				}
			}
			expect(await controller.createUser(requestBody)).toEqual({message:responseCodeMapper(responseCodes,'invalid.body')})
		})

		it('controller should be defined',()=>{
			expect(controller).toBeDefined();
		})
	})

})


