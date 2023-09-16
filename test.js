import chai from "chai";
import chaiHttp from "chai-http";
import app from "./index.js";
import mongoose from "mongoose";


chai.use(chaiHttp);
const expect = chai.expect;

describe('Transactions API', () => {
  // Define a user token to use in the Authorization header
  let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDQwMmFjYzQ0ZjEzY2U1YTM4ZWVmNyIsInBob25lTnVtYmVyIjoiMDcwMzY0OTgzNDAiLCJpYXQiOjE2OTQ3NjE3NzksImV4cCI6MTY5NDc3MjU3OX0.R_RR81Wb_h0nvVI6vIrEa4r9x9oQUZ-NDYANd-3mvHQ';

  before(async () => {
    // Perform any setup steps here, like user authentication and obtaining a token.
    // You can use a testing library like supertest to authenticate and obtain a token.
    // Store the token in the userToken variable.
  });

  it('should deposit funds into the user account', (done) => {
    chai
      .request(app)
      .post('/api/deposit')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ userId: '650402acc44f13ce5a38eef7', amount: 100 }) // Replace with valid user ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Deposit successful');
        done();
      });
      done();
  });

  // it('should deposit funds into the user account', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/deposit')
  //     .set('Authorization', `Bearer ${userToken}`)
  //     .send({ userId: '650402acc44f13ce5a38eef7', amount: 100 }) // Replace with a valid user ID and a valid amount
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err); // Handle request error
  //       }
  
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.have.property('message', 'Deposit successful');
  
  //       done(); // Call done() to indicate that the test is complete
  //     });
  // });

  it('should withdraw funds from the user account', (done) => {
    chai
      .request(app)
      .post('/api/withdraw')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ userId: '650402acc44f13ce5a38eef7', amount: 50 }) // Replace with valid user ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Withdrawal successful');
        done();
      });
      done();
  });

  it('should get user transactions', (done) => {
    chai
      .request(app)
      .get('/api/transactions/650402acc44f13ce5a38eef7') // Replace with valid user ID
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions to check the structure of the response if needed.
        done();
      });
      done();
  });

  // Add more test cases as needed

  after(async () => {
   
    // resetApplicationState();
  });
});
