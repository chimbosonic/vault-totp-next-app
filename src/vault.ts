
const VAULT_CONFIG = {
  authToken: process.env.VAULT_AUTH_TOKEN || "",
  baseUrl: process.env.VAULT_BASE_URL || ""
}


export type TOTPToken = {
  keyName: string,
  accountName: string,
  issuerName: string,
  code: string
}



export async function getTOTPTokens(): Promise<TOTPToken[]> {
  const keyNames: string[] = await listKeys();
  console.log(`Got these keys back: ${keyNames}`);

  const totpTokens: TOTPToken[] = [];

  for (const keyName of keyNames) {
    console.log(`Looking up ${keyName}`)
    const totpToken: TOTPToken | undefined = await getTOTPToken(keyName)
    if(totpToken) {
      totpTokens.push(totpToken);
    }
  }
  console.log(totpTokens)

  return totpTokens
}

async function getTOTPToken(keyName: string): Promise<TOTPToken | undefined> {
  const url = `${VAULT_CONFIG.baseUrl}/totp/keys/${keyName}`

  const headers = {
    "X-Vault-Token": VAULT_CONFIG.authToken,
  };

  const request = {
    method: "GET",
    headers: headers,
    body: null,
  };

  return fetch(url, request)
    .then((r) => {
      return r.json();
    })
    .then(async (data) => {
      if(data.errors) {
        console.log(data.errors)
        return undefined
      } else if(data.data) {
        return {
          keyName: keyName,
          accountName: data.data.account_name,
          issuerName: data.data.issuer,
          code: await getTOTPTokenCode(keyName)
        } as TOTPToken
      }
    })
}

function getTOTPTokenCode(keyName: string): Promise<string> {
  const url = `${VAULT_CONFIG.baseUrl}/totp/code/${keyName}`

  const headers = {
    "X-Vault-Token": VAULT_CONFIG.authToken,
  };

  const request = {
    method: "GET",
    headers: headers,
    body: null,
  };

  return fetch(url, request)
    .then((r) => {
      return r.json();
    })
    .then((data) => {
      if(data.errors) {
        console.log(data.errors)
        return [""]
      } else if(data.data) {
        return data.data.code
      }
    })
}


async function listKeys(): Promise<string[]> {
  const url = `${VAULT_CONFIG.baseUrl}/totp/keys`

  const headers = {
    "X-Vault-Token": VAULT_CONFIG.authToken,
  };

  const request = {
    method: "LIST",
    headers: headers,
    body: null,
  };

  return fetch(url, request)
    .then((r) => {
      return r.json();
    })
    .then((data) => {
      if(data.errors) {
        console.log(data.errors)
        return [""]
      } else if(data.data) {
        return data.data.keys
      }
    })
}
