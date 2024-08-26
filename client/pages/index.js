import buildClient from "../api/build-client";

const LandingPage = ({ curentUser }) => {
  return curentUser ? (
    <h1>you are signedin </h1>
  ) : (
    <h1>you are not signedin </h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log("context", context);
  const client = buildClient(context);
  try {
    const { data } = await client.get("/api/users/currentuser");
    return data;
  } catch (err) {
    return {};
  }
};

export default LandingPage;
