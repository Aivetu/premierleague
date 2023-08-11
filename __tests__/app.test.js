const app = require('../app.js');
const request = require('supertest');
const mongoose = require('mongoose');


beforeAll(done => {
    done()
  });
  
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  });

describe('testing the register route', ()=>{

    test('Duplicate registration should return 400', async ()=>{
        const res = await request(app).post('/register').send({username:"Habibat"});

        expect(res.statusCode).toBe(400);

    })
    test('user created successfully should return 200',async ()=>{
        const res = await request(app).post('/register').send({username:'oiza',password:'abcdefg',roles:'user'});

        expect(res.statusCode).toBe(200);
    })

})
