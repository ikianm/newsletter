import { NextRequest } from "next/server";
import monk from "monk";

interface Email {
    email: string
};

const db = monk(String(process.env.MONGODB_URI));

export async function POST(req: NextRequest) {
    const { email }: Email = await req.json();
    try {
        const emailsCollection = db.get("emails");
        const emails = await emailsCollection.insert({ email });
        db.close();
        return new Response(JSON.stringify({ email }), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ message: 'error' }), { status: 500 });
    }
}