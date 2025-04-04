import express from 'express';
import { saveScore } from '../db/score.js';

const router = express.Router();

router.post('/score', async (req, res) => {
    const userId = req.cookies?.user_id;
    const score = parseInt(req.body.score);
    const game = "runner";

    if (!userId) return res.status(401).json({ error: '로그인이 필요합니다.' });
    if (!game || typeof score !== 'number') return res.status(400).json({ error: '유효하지 않은 요청' });

    try {
        await saveScore({ userId, game, score });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB 오류' });
    }
});

export default router;