import mongoose from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

const userShema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userShema.plugin(uniqueValidator);

export default mongoose.model("User", userShema);
