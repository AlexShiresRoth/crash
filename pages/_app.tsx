import "../styles/main.css";
import React from "react";
import { useStore } from "../redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps  }: any) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
