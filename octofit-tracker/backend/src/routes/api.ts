import { Router } from 'express';
import type { RequestHandler } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

const listRecords = (findRecords: () => Promise<unknown[]>): RequestHandler =>
  async (_request, response, next) => {
    try {
      response.json(await findRecords());
    } catch (error) {
      next(error);
    }
  };

router.get('/users/', listRecords(() => User.find().lean().exec()));
router.get('/teams/', listRecords(() => Team.find().lean().exec()));
router.get('/activities/', listRecords(() => Activity.find().lean().exec()));
router.get('/leaderboard/', listRecords(() => Leaderboard.find().sort({ points: -1 }).lean().exec()));
router.get('/workouts/', listRecords(() => Workout.find().lean().exec()));

export default router;