import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    fullName: { type: String, trim: true,},
    avatar: { filePath:{type:String},fileName:{type:String}},
    phoneNumber: { type: String,},
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date },
    modifiedAt: { type: Date }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    fullName: { type: String, trim: true,},
    avatar: { filePath:{type:String},fileName:{type:String}},
    phoneNumber: { type: String,},
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date },
    modifiedAt: { type: Date }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);