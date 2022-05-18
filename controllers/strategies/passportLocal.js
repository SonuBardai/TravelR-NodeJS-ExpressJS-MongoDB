import passport from "passport";
import { Strategy } from "passport-local";

import bcrypt from "bcrypt";

import User from "../../models/user.js";

export const userAuthentication = () => {
	passport.use(
		new Strategy(async (username, password, done) => {
			try {
				if (!username || !password) {
					return done(null, null);
				}
				const user = await User.findOne({ username });
				if (!user) {
					return done(null, false, {
						message:
							"No such user found. Register to create a new account.",
					});
				}
				const isValid = bcrypt.compareSync(password, user.password);
				if (isValid) {
					return done(null, user, {
						message: `Successfully Logged in as ${username}`,
					});
				} else {
					return done(null, false, {
						message: "Password Incorrect.",
					});
				}
			} catch (error) {
				return done(error, null, { message: error });
			}
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const tempUser = await User.findById(id);
			if (!tempUser) {
				done(null, false, { message: "No such user found." });
			} else {
				done(null, tempUser);
			}
		} catch (err) {
			done(err, null);
		}
	});
};
