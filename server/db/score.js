import { db } from './index.js';

export async function saveScore({ userId, game, score }) {
    await db.query(
        'INSERT INTO scores (user_id, game, score) VALUES ($1, $2, $3)',
        [userId, game, score]
    );
}