import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-auto max-w-[1120px]">
      <Header />
      <main className="max-w-3xl mx-auto mt-24">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
