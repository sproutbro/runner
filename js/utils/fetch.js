export async function fetchScore(score) {
    try {
        const response = await fetch("/game/api/scores", {
            method: 'POST',
            body: JSON.stringify({ score }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}