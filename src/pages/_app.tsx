// src/pages/_app.tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import "react-day-picker/dist/style.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

// TODO: replace multiparty by busboy
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ReactQueryDevtools />
      <Toaster position="bottom-right" />
      <div className="mx-auto mt-10 flex w-2/3 flex-col gap-y-4 text-gray-800">
        <Navbar />

        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
