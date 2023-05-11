import mongoose from 'mongoose';

const boosterSchema = new mongoose.Schema({
  boosterName: { type: String, required: true },
  status: { type: String },
  content: {
    goal: { type: String },
    message: { type: String },
    progressMessage: { type: String },
    goalReachedMessage: { type: String }
  },
  design: {
    position: { type: String },
    template: { type: String },
    backgroundColor: { type: String },
    backgroundImage: { type: String},
    font: { type: String },
    fontSize: { type: Number },
    messageColor: { type: String }
  },
  
});

const booster = mongoose.model('Booster', boosterSchema);
export default booster;
