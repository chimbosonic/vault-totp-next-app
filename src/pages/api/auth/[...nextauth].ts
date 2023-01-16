import NextAuth, { AuthOptions, Profile } from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      id: "vault",
      name: "Vault",
      wellKnown: process.env.VAULT_WELL_KNOWN_URL,
      type: "oauth",
      version: "2.0",
      authorization: { params: { scope: "openid email profile" } },
      profile: (profile: Profile) => {
        return {
          name: profile.name,
          email: profile.email,
          id: profile.sub,
          image: profile.image,
        };
      },
      clientId: process.env.VAULT_CLIENT_ID,
      clientSecret: process.env.VAULT_CLIENT_SECRET,
    },
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = {
        image: null,
        name: null,
        email: null,
      };

      return session;
    },
  },
  debug: process.env.NODE_ENV !== "production"
} as AuthOptions;

export default NextAuth(authOptions);
