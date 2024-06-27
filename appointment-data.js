const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// Route to display form
router.get('/appointments', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'appointments.html'));
});

// Route to fetch all appointments
router.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Route to fetch a single appointment by ID
router.get('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch appointment' });
    }
});

// Route to handle form submission
router.post('/api/appointments', async (req, res) => {
    try {
        const { username, phoneNumber, email } = req.body;
        const appointment = await Appointment.create({ username, phoneNumber, email });
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// Route to update an appointment
router.put('/api/appointments/:id', async (req, res) => {
    try {
        const { username, phoneNumber, email } = req.body;
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        appointment.username = username;
        appointment.phoneNumber = phoneNumber;
        appointment.email = email;
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update appointment' });
    }
});

// Route to delete an appointment
router.delete('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        await appointment.destroy();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

module.exports = router;
