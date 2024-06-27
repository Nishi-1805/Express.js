const db = require('../util/database');

module.exports = class Contact {
    constructor(name, email, phone, date, time) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.date = date;
        this.time = time;
    }

    async save(cb) {
        try {
            const result = await db.execute(
                'INSERT INTO contact (name, email, phone, date, time) VALUES (?, ?, ?, ?, ?)',
                [this.name, this.email, this.phone, this.date, this.time]
            );
            cb(null, result);
        } catch (err) {
            console.error('Error saving contact:', err);
            cb(err);
        }
    }
};
