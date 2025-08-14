import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: [true, 'Account with this email already exists!'],
      match: [
        /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },

    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exists'],
      minLength: [3, 'Username must be at least 3 characters'],
      match: [
        /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{1,30}(?<!\.)$/,
        'Username must contain only letters,symbols and numbers'
      ]
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be of minimum 8 characters']
    },

    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin']
    },

    name: {
      type: String,
      maxLength: [30, 'Maximum length is 30 characters']
    },

    profilePicture: {
      type: String,
      trim: true,
      default:
        'https://res.cloudinary.com/dsqd95xzu/image/upload/v1750073303/default-profile-picture_bnpglm.jpg', // fallback DP
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid image URL`
      }
    },

    bio: {
      type: String,
      maxlength: 150,
      trim: true,
      default: ''
    },

    accountPrivacy: {
      type: String,
      default: 'public',
      enum: ['public', 'private']
    },

    gender: {
      type: String,
      default: 'male',
      enum: ['male', 'female', 'other']
    },

    followersCount: {
      type: Number,
      default: 0
    },

    followingCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function saveUser(next) {
  if (this.isNew) {
    const user = this;

    const SALT = bcrypt.genSaltSync(9);

    const hashedPassword = bcrypt.hashSync(user.password, SALT);

    user.password = hashedPassword;
  }

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
