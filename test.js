import chai from "chai";
import chaiHttp from "chai-http";
import app from "./index.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Transactions API", () => {
  let userToken = process.env.TOKEN;

  before(async () => {});

  it("should deposit funds into the user account", (done) => {
    chai
      .request(app)
      .post("/api/deposit")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ userId: process.env.USERID, amount: 100 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Deposit successful");
        done();
      });
    done();
  });

  it("should withdraw funds from the user account", (done) => {
    chai
      .request(app)
      .post("/api/withdraw")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ userId: process.env.USERID, amount: 50 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Withdrawal successful");
        done();
      });
    done();
  });

  it("should get user transactions", (done) => {
    chai
      .request(app)
      .get(`/api/transactions/${process.env.USERID}`)
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    done();
  });

  after(async () => {});
});
