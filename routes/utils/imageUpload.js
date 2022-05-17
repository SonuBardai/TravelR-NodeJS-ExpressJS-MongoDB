import multer from "multer";

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "static/blog-images");
	},

	filename: (req, file, callback) => {
		callback(null, Date.now() + "-" + file.originalname);
	},
});

export const upload = multer({ storage: fileStorageEngine });
