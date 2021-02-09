import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { responseCodeMapper } from './../src/lib/responsecode_mapper' 

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
      email:"d@gmail.com",
      password:"dd"
    })
    .expect(200)
    .expect({message:responseCodeMapper('user.created')})
  })

  it('/POST Invalid request body',()=>{
    return request(app.getHttpServer())
    .post('/userSignup')
    .send({
      fname:"test"
    })
    .expect(200)
    .expect({message:responseCodeMapper('invalid.body')})
  })

  it('/POST user login',()=>{
    return request(app.getHttpServer())
    .post('/userLogin')
    .send({
      email:"test",
      password:"test123"
    })
    .expect(200)
    .expect({message:responseCodeMapper('login.success')})
  })

  it('/ testing 404',()=>{
    return request(app.getHttpServer())
    .post('/404')
    .expect(400)
  })

});
