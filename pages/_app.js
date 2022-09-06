import Header from "../components/Header";
import "../styles/globals.css";
import { store } from "../redux";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_URL}
    >
      <Provider store={store}>
        <div className="mx-auto max-w-[1120px] pt-24">
          <Header />
          <main className="max-w-3xl mx-auto mt-24">
            <Component {...pageProps} />
          </main>
        </div>
      </Provider>
    </Auth0Provider>
  );
}

export default MyApp;
