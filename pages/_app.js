import Header from "../components/Header";
import "../styles/globals.css";
import { store } from "../redux";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="mx-auto max-w-[1120px] pt-24">
        <Header />
        <main className="max-w-3xl mx-auto mt-24">
          <Component {...pageProps} />
        </main>
      </div>
    </Provider>
  );
}

export default MyApp;
