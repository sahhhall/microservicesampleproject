  import buildClient from "../api/build-client";
  import Header from "../component/header";
  import "../styles/globals.css";
  function MyApp({ Component, pageProps, currentUser }) {
    return (
      <div>
        <Header currentUser={currentUser}/>
        <Component {...pageProps} />
      </div>
    );
  }

  MyApp.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    
    let pageProps = {};
    try {
      const { data } = await client.get("/api/users/currentuser");
      if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
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
