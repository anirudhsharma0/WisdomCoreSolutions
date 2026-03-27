import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: [String],
  link: String,
  status: { type: String, default: 'Completed' }
});

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  isHidden: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const SettingsSchema = new mongoose.Schema({
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  instagram: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
