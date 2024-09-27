// controllers/appointmentController.js
import Appointment from '../models/Appointment.js';

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching appointments' });
  }
};

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Notify admin after saving the appointment
    console.log(`Admin notified: New appointment for ${appointment.fullname} on ${appointment.date} at ${appointment.time}`);

    res.status(201).json({ msg: 'Appointment added successfully!' });
  } catch (error) {
    res.status(400).json({ msg: 'Error adding appointment', error });
  }
};

// Update an existing appointment
export const updateAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: 'Appointment updated successfully!' });
  } catch (error) {
    res.status(400).json({ msg: 'Error updating appointment', error });
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Appointment deleted successfully!' });
  } catch (error) {
    res.status(400).json({ msg: 'Error deleting appointment', error });
  }
};

// Check availability of time slots for a specific date
export const checkTimeSlotAvailability = async (req, res) => {
  const { date } = req.query;

  // Pre-defined time slots (can be fetched from DB or customized)
  const slots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: false },
  ];

  try {
    // You can add logic to fetch actual slot availability from the database
    res.json({ slots });
  } catch (error) {
    res.status(500).json({ msg: 'Error checking time slots' });
  }
};

// Notify admin of a new appointment (mock logic)
// controllers/appointmentController.js
export const notifyAdmin = (req, res) => {
  try {
    console.log('Admin notified:', req.body.message);  // Log the message to the console
    res.status(200).json({ msg: 'Admin notified!' });
  } catch (error) {
    res.status(500).json({ msg: 'Error notifying admin', error });
  }
};

