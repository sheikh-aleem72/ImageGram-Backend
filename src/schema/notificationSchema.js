import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['follow', 'like', 'comment', 'mention', 'message'],
      required: true
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },

    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Notification = new mongoose.model('Notification', notificationSchema);

export default Notification;
