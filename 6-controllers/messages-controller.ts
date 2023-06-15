import express from 'express';
import { addMessage, getMessageById, getMessagesByDate } from '../5-logic/messages-logic';
import { MessageModel } from '../4-models/MessageModel';

export const messagesRouter = express.Router();



messagesRouter.post('/messages', async (req, res) => {
    try {
        const { content, user, date } : MessageModel = req.body;
        
        if(!content || !user || !date){
           return res.status(400).json("One of the fields is missing")
        }

        const message = await addMessage(content, user, date );
        let id = message.id
        const newMessage: MessageModel = { id, content, user, date }
        res.status(200).send(newMessage);
        
    } catch (e) { 
        console.log(e);
        res.json("Server Error").status(404); 
    
    }
});

messagesRouter.get('/messages', async (req, res) => {
    try {
        const messages = await getMessagesByDate();
        if(messages.length < 1){
            return res.status(404).json("Message Not Found");
        }
        res.json(messages);
        
   } catch (e) {
        console.log(e);
        res.json("Server Error").status(404); 

   }
});
        
messagesRouter.get('/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const message = await getMessageById(id);
        console.log(message);
        
        if(message.length < 1){
            return res.status(404).json("Message Not Found");
        }
        res.json(message);
        
   } catch (e) {
        console.log(e);
        res.json("Server Error").status(404); 

    }
});
        
