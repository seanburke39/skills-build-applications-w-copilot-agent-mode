import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    firstName: { type: String, trim: true, default: '' },
    lastName: { type: String, trim: true, default: '' },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    points: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['walking', 'running', 'strength-training'], required: true },
    durationMinutes: { type: Number, min: 0, required: true },
    distanceKm: { type: Number, min: 0, default: 0 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    points: { type: Number, min: 0, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, min: 0, default: 0 },
    rank: { type: Number, min: 1, required: true },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], default: 'monthly' },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationMinutes: { type: Number, min: 0, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, min: 1 },
        reps: { type: Number, min: 1 },
      },
    ],
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const Leaderboard = model('Leaderboard', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);