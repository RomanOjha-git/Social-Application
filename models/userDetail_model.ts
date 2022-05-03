import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserDocument from "../interface/userDocument.js";

const userDetailSchema = new mongoose.Schema<UserDocument>({
  googleID: {
    type: Number,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  userID: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cpassword: {
    type: String,
    require: true,
  },
  birthday: {
    year: {
      type: String,
      require: true,
    },
    month: {
      type: String,
      require: true,
    },
    day: {
      type: String,
      require: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    require: true,
  },
  messages: [
    {
      messageTo: {
        type: String,
      },
      roomID: {
        type: String,
        require: true,
      },
      receiverPicture: {
        type: String,
      },
      message: [
        {
          sender: {
            type: String,
          },
          content: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  followersNo: {
    type: Number,
  },
  followers: [
    {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      userID: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  ],
  followingNo: {
    type: Number,
  },
  following: [
    {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      userID: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  ],
  friendsNo: {
    type: Number,
  },
  friends: [
    {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      userID: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  ],
  postNo: {
    type: Number,
  },
  posts: [
    {
      id: {
        type: String,
      },
      caption: {
        type: String,
      },
      picture: {
        name: {
          type: String,
        },
        path: {
          type: String,
        },
        url: {
          type: String,
        },
        firebaseStorageDownloadToken: {
          type: String,
        },
        bucket: {
          type: String,
        },
      },
      likes: {
        No: {
          type: Number,
        },
        by: [
          {
            userID: {
              type: String,
            },
          },
        ],
      },
      comments: {
        No: {
          type: Number,
        },
        by: [
          {
            userID: {
              type: String,
            },
            comment: {
              type: String,
            },
            picture: {
              type: String,
            },
          },
        ],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  stories: {
    caption: {
      type: String,
    },
    picture: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

userDetailSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

userDetailSchema.methods.generateAuthToken = async function () {
  try {
    let token: string = jwt.sign({ _id: this._id }, process.env.SECRET_KEY!);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    // console.log(err);
  }
};

userDetailSchema.methods.uploadPost = async function (
  postData: object,
  userStoryDetail: object
) {
  try {
    this.posts.unshift(postData);
    if (userStoryDetail !== undefined) {
      this.stories = userStoryDetail;
    }
    this.postNo++;
    await this.save();
    return this.posts;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

userDetailSchema.methods.followUser = async function (followedToUser) {
  try {
    // saving following user detail into current user database
    this.following.unshift(followedToUser);
    this.followingNo++;
    // saving following user detail into followed to user database
    const res = await UserDetail.updateOne(
      {
        userID: followedToUser.userID,
      },
      {
        // pushing the new followers into followed to user database
        $push: {
          followers: {
            name: this.name,
            email: this.email,
            userID: this.userID,
            picture: this.picture,
          },
        },
        $inc: {
          followersNo: 1,
        },
      }
    );
    if (res) {
      await this.save();
      return true;
    } else {
      return false;
    }
  } catch (err) {}
};

userDetailSchema.methods.saveMessage = async function (message) {
  try {
    console.log(message);
    // searching for a use which is getting the message
  } catch (err) {}
};

const UserDetail = mongoose.model<UserDocument>("USERDETAIL", userDetailSchema);
export default UserDetail;