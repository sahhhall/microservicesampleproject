import request from "supertest";
import { app } from "../../app";

it("respond with details about the current the user", async () => {
  const authResoponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const cookie: any = authResoponse.get("Set-Cookie");
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  console.log(response.body);
  expect(response.body.curentUser.email).toEqual("test@test.com");
});
