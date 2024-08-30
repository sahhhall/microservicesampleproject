import buildClient from "../api/build-client";
import Header from "../component/header";
import "../styles/globals.css";

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="flex justify-center items-center mt-8">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  let pageProps = {};
  try {
    const { data } = await client.get("/api/users/currentuser");
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(
        appContext.ctx,
        client,
        data
      );
    }

    return {
      pageProps,
      currentUser: data.curentUser,
    };
  } catch (err) {
    console.error("Error fetching current user", err);
    return {
      pageProps,
      currentUser: null,
    };
  }
};

export default MyApp;
