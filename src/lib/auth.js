import NextAuth from "next-auth";
import GitHub from 'next-auth/providers/github';
import { connectToDb } from "./connectToDb";
import { User } from "./models";
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({ 
  providers: [GitHub({ 
    clientId: process.env.GITHUB_ID, 
    clientSecret: process.env.GITHUB_SECRET
  })],
  callbacks: {
    async signIn({user, account, profile}) {
      console.log(user, account, profile);
      if (account.provider === 'github') {
        connectToDb();
        try {

          const user = await User.findOne({email: profile.email});

          if (!user) {
            const newuser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });

            await newuser.save();
          }

        } catch(e) {
          console.log(e);
          return false
        }
      }
      return true;
    }
  }
});