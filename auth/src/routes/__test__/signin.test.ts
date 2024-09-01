import request from "supertest";
import { app } from "../../app";

it("failas when incorrect passowrd", async () => {
  console.log("hi");
  
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "s",
    })
    .expect(400);
});

//valid credentials check

it("valid credenetial check", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
});
