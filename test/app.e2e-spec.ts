import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { responseCodeMapper } from './../src/lib/responsecode_mapper';
import responseCodes from '../src/response_codes'


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/POST User signup',()=>{
    return request(app.getHttpServer())
    .post('/userSignup')
    .send({
      fname:"test",
      lname:"test2",
      email:`d${Math.floor(Math.random()*100%100)}@gmail.com`,
      password:"dd"
    })
    .expect(201)
    .expect({message:responseCodeMapper(responseCodes,'user.created')})
  })

  it('/POST Invalid request body',()=>{
    return request(app.getHttpServer())
    .post('/userSignup')
    .send({
      fname:"test"
    })
    .expect(201)
    .expect({message:responseCodeMapper(responseCodes,'invalid.body')})
  })

  it('/POST user login',()=>{
    return request(app.getHttpServer())
    .post('/userLogin')
    .send({
      email:"d55@gmail.com",
      password:"dd"
    })
    .expect(201)
  })

  it('/POST user login/No such user',()=>{
    return request(app.getHttpServer())
    .post('/userLogin')
    .send({
      email:"test",
      password:"test123"
    })
    .expect(201)
    .expect({message:responseCodeMapper(responseCodes,'login.nouser')})
  })

  it('/ testing 404',()=>{
    return request(app.getHttpServer())
    .get('/404')
    .expect(404)
  })
});
