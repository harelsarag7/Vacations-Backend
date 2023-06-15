import { execute } from "../2-utils/dal";
import { MessageModel } from "../4-models/MessageModel";

export async function getMessagesByDate(): Promise<MessageModel[]>{
    const query = "SELECT * FROM messages ORDER BY date DESC;";
    const [rows] = await execute<MessageModel[]>(query);
    return rows
}

export async function getMessageById(id: string): Promise<MessageModel[]>{
    const query = "SELECT * FROM messages WHERE id = ?;";
    const [rows] = await execute<MessageModel[]>(query, [+id]);
    return rows
}

export async function addMessage(content: string, user: string , date: string): Promise<MessageModel>{
    const query = `INSERT INTO messages (content, user, date) VALUES (?, ?, ?);`;
    const [rows] = await execute<MessageModel>(query, [content, user, date]);
    return rows
}

