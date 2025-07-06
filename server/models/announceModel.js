import mongoose from 'mongoose';

const announceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: '',
  },
  message: {
    type: String,
    required: true,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const announceModel = mongoose.model('Announcement', announceSchema);

export default announceModel;
