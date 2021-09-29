import express from "express"
import bcrypt from 'bcryptjs'
import {pushNewUser, getAllUsers} from "./knexdata"

const server = express();
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

const PORT = 3000

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 10);
};

server.post('/registrations', (req, res) => {
    const data: {username: string,
        displayed_name: string,
        password: string
    } = req.body;

    pushNewUser(data.username, data.displayed_name, hashPassword(data.password))
      .then(() => res.json({ error: 0 }))
      .catch(() => res.json({ error: 1 }));
});
  
server.get('/registrations', (req, res) => {
    getAllUsers()
      .then((data) => res.json({ error: 0, data }))
      .catch(() => res.json({ error: 1 }));
});

server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    
})