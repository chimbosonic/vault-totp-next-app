import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { Token } from "@/components/TokenTable";

export default function Home(props: any) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        Currently not signed in:{" "}
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Hashicorp Vault Authenticator</title>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta name="theme-color" content="#292929" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.headerContainer}>
        <div>Hashicorp Vault Authenticator</div>
      </div>
      <div className={styles.calculatorContainer}>
        <Token></Token>
      </div>
      <div className={styles.calculatorContainer}>
        <div className={styles.logout} onClick={() => signOut()}>
          Logout
        </div>
      </div>
    </>
  );
}
