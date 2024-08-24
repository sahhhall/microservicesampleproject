import request from "supertest";
import { app } from "../../app";
import { idText } from "typescript";
import { response } from "express";

// Successful signup
it("returns a 201 on a successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("return a 400 that invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testsata",
      password: "password",
    })
    .expect(400);
});

it("return a 400 invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1",
    })
    .expect(400);
});

it("returns a 400 for a duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

// successfull reponse header check

it("sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  
    expect(response.get("Set-Cookie")).toBeDefined();
  });