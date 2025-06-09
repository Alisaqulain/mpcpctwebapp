import clientPromise from '../../../lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('testdb'); // Replace with your database name
        await db.command({ ping: 1 }); // Simple ping to test connection
        return Response.json({ message: 'MongoDB connection successful' });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return Response.json({ error: 'MongoDB connection failed' }, { status: 500 });
    }
}