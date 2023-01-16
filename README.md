# vault-totp-next-app
Frontend for Hashicorp Vault TOTP Tokens.

Caution this was built with a single user in mind. The App will have access to all tokens in Vault.

Uses Next Auth to auth the app via OIDC. 

OIDC provider is Vault tho I haven't figured out how to reuse the OIDC tokens to make the calls to Vault for the TOTP tokens.
So for now it uses a Auth Token generated via `vault token create`

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Compose Example

[here](./docker-compose.yml)

If using docker-compose you will need to setup Vault then populate the environment and recreate `vault-totp-app`

## REQUIRED ENV VARS

```bash
VAULT_WELL_KNOWN_URL=https://<VAULT_DOMAIN_NAME>/v1/identity/oidc/provider/<VAULT_PROVIDER_NAME>/.well-known/openid-configuration
VAULT_CLIENT_ID=....
VAULT_CLIENT_SECRET=....
NEXTAUTH_SECRET=....
NEXTAUTH_URL=https://<DOMAIN_NAME>
NEXT_APP_EN_DOMAIN=<DOMAIN_NAME>
VAULT_BASE_URL=<VAULT_DOMAIN_NAME>
VAULT_AUTH_TOKEN=.....
```
