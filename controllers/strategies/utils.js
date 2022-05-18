export const isAuthenticated = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		req.flash("info", "Please log in to access this page.");
		res.redirect("/users/login");
	}
};

export const isNotAuthenticated = (req, res, next) => {
	if (!req.user) {
		next();
	} else {
		res.redirect("/");
	}
};
