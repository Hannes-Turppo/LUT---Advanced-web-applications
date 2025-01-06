import { Request, Response, Router } from 'express';
import { User, IUser } from '../models/User';

const router: Router = Router();


////////////////////////////////////////////////////////////////// Router functionality

// get currently existing todos
router.get('/todos/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const userData: IUser | null = await User.findOne({ name: id });
        if (!userData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(userData);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

// Add new todo
router.post('/add', async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const userData: IUser | null = await User.findOne({ name: req.body.userName });
        if (userData) {
            userData.todos.push({todo: req.body.todoInput});
            await userData.save();

        } else {
            const newUser: IUser = new User({
                name: req.body.userName, 
                todos: [{todo: req.body.todoInput}]
            });
            await newUser.save();
        }
        res.send(`Todo added successfully for user ${req.body.userName}.`);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

router.delete('/delete', async (req: Request, res: Response) => {
    const userName = req.body.userName;
    try {
        const userData: IUser | null = await User.findOne({ name: userName });
        if (!userData) {
            res.status(404).json('User not found');
            return;
        } else {
            await User.deleteOne({name: userName});
            res.send(`User deleted successfully.`);
        }
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

router.delete("/update", async (req: Request, res: Response) => {
    const userName = req.body.userName;
    const todoID = req.body.todoID;
    console.log(req.body);

    try {
        let userData: IUser | null = await User.findOne({ name: userName });
        if (!userData) {
            res.status(404).json('User not found');
            return;
        } else {
            userData.todos = userData.todos.filter(todo => todo._id != todoID);

            console.log(userData);
            await userData.save();
            res.send(`Todo deleted successfully for user ${userName}.`);
        }
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }

});

export default router;
