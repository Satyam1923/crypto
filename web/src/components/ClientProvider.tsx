"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
