/* 
1. Відповідь повина мати статус-код 200
2. У відповіді повинен повертатися токен
3. У відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
*/

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

const REGISTERED_USER_EMAIL = "test@i.ua";
const REGISTERED_USER_PASSWORD = "testtest";

describe("Test login function", () => {
  /* Connecting to the database before each test. */
  beforeEach(async () => {
    await mongoose.connect(DB_HOST);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  // it(...)
  test("The response must: have a 200 status code, return a token, return a user object with 2 fields 'email' and 'subscription' with data type String", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: REGISTERED_USER_EMAIL,
      password: REGISTERED_USER_PASSWORD,
    });
    expect(res.statusCode).toBe(200);
    expect(!!res.body.token).toBe(true); // .toBeTruthy()
    expect(!!res.body.user && typeof res.body.user === "object").toBe(true);
    expect(
      typeof res.body.user.email && typeof res.body.user.subscription
    ).toBe("string"); // .toBeString()
  });
});
