// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  message: { type: String, default: '' },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
