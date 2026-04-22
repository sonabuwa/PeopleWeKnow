import mongoose from "mongoose";
// import bcrypt from "bcrypt"; // Uncomment this ONLY if you ran: npm install bcrypt

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  uniqueresetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

// ⚠️ THE HOOK MUST BE OUTSIDE THE SCHEMA OBJECT!
// Leave this commented out for now so we can just get it working.
/*
AuthSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
*/

const Auth = mongoose.model("Auth", AuthSchema);
export default Auth;
