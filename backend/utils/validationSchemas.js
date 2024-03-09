export const signUpDataValidationSchema = {
  fullName: {
    notEmpty: {
      errorMessage: "Full name is required",
    },
    isString: {
      errorMessage: "Full name must be a string",
    },
    isLength: {
      options: {
        min: 2,
        max: 255,
      },
      errorMessage:
        "Full name should be min: 2 characters and max: 255 characters",
    },
    trim: true,
    escape: true,
  },
  gender: {
    notEmpty: {
      errorMessage: "Gender is required",
    },
    isString: {
      errorMessage: "Gender must be a string",
    },
    isIn: {
      options: ["Male", "Female"],
      errorMessage: "Invalid gender. Please choose Male or Female",
    },
    trim: true,
    escape: true,
  },
  username: {
    notEmpty: {
      errorMessage: "Username is required",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      options: {
        min: 5,
        max: 20,
      },
      errorMessage: "Username must be 5 to 20 characters long",
    },
    matches: {
      options: /^[a-zA-Z0-9-_@]+$/,
      errorMessage:
        "Username can only contain letters, numbers, underscores, dashes, and @",
    },
    trim: true,
    escape: true,
  },
  password1: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: {
        min: 6,
        max: 32,
      },
      errorMessage: "Password must be 6 to 32 characters long",
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      errorMessage:
        "Password must contain at least 1 lowercase, 1 uppercase, 1 digit, and 1 special character",
    },
  },
  password2: {
    notEmpty: {
      errorMessage: "Confirm password is required",
    },
    custom: {
      options: (value, { req }) => value === req.body.password1,
      errorMessage: "Passwords don't match",
    },
  },
};
