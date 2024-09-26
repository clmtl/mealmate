import { type AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Theme } from "react-daisyui";
import Head from "next/head";
import AppNavbar from "~/components/common/Navbar";
import Link from "next/link";

const Main = ({
  Component,
  pageProps,
}: Pick<AppProps, "Component" | "pageProps">) => {
  const session = useSession();
  return (
    <>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full overflow-y-scroll md:max-w-2xl">
          {session.status !== "authenticated" ? (
            <>
              <Link href="/auth" className="btn-primary btn">
                Connect
              </Link>
            </>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </main>
      <AppNavbar />
    </>
  );
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Mealmate</title>
      </Head>
      <Theme dataTheme="dark">
        <Main Component={Component} pageProps={pageProps} />
      </Theme>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
