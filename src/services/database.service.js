import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

class DatabaseService {
    constructor () {
        this.dbUsers = this.openUsers();
        this.dbMessages = this.openMessages();
    }

    async openUsers () {
        return await open({
            filename: 'users.db',
            driver: sqlite3.Database
        });
    }

    async openMessages () {
        return await open({
            filename: 'messages.db',
            driver: sqlite3.Database
        });
    }

    insert (user) {
        console.log(`name: ${user.name}`);
        console.log(`username: ${user.username}`);
        console.log(`password: ${user.password}`);
    }
}

export default new DatabaseService();