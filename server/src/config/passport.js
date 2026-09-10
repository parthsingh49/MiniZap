import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

/* ===========================
   GOOGLE OAUTH
=========================== */

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Strategy Executed");
console.log(profile.displayName);
      try {
        let user = await User.findOne({
          email: profile.emails[0].value,
        });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            provider: "google",
            avatar: profile.photos?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

/* ===========================
   GITHUB OAUTH
=========================== */

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
      scope: ["user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          githubId: profile.id,
        });

        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value || "",
            githubId: profile.id,
            provider: "github",
            avatar: profile.photos?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

/* ===========================
   PASSPORT SESSION
=========================== */

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;