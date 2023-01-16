import { TOTPToken } from "@/libs/vault";
import { useEffect, useState } from "react";

import styles from "@/styles/Home.module.css";

export function Token() {
  const [data, setData] = useState<{ tokens: TOTPToken[] } | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let interval = setInterval(() => {
      fetch("/api/tokens")
        .then((res) => res.json())
        .then((data: { tokens: TOTPToken[] }) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("error fetching tokens: ", error);
        });
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/tokens")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error fetching tokens: ", error);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No Token data</p>;

  return (
    <>
      {data.tokens.map((token: TOTPToken) => {
        return (
          <div className={styles.totpContainer} key={`token:${token.keyName}"`}>
            <div className={styles.totpLabel} key={`issuer:${token.keyName}"`}>
              <div>{token.issuerName}</div>
              <div>({token.accountName})</div>
            </div>
            <div key={`code:${token.keyName}"`}>
              <code
                className={styles.totpCode}
                onClick={() => {
                  navigator.clipboard.writeText(token.code);
                }}
              >
                {token.code}
              </code>
            </div>
          </div>
        );
      })}
    </>
  );
}
