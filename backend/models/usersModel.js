const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,

    },
    lastName: {
      type: String,
      required: true,
      trim: true,

    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin","cusservice"],
      default: "user",
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

// Virtual to hash the password
userSchema.virtual('password')
.set(function(password) {
    this.hash_password = bcrypt.hashSync(password, 10);
});

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Method to authenticate the user
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
