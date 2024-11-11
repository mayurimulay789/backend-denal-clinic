import Appointment from '../models/Appointment.js';

// Check availability
export const checkAvailability = async (req, res) => {
  try {
    const { date, timeSlot } = req.query;

    // Validate if both date and timeSlot are provided
    if (!date || !timeSlot) {
      return res.status(400).json({ message: 'Date and time slot are required.' });
    }

    // Parse the date to a valid Date object
    const appointmentDate = new Date(date);
    
    // Validate if the date is valid
    if (isNaN(appointmentDate)) {
      return res.status(400).json({ message: 'Invalid date format.' });
    }

    // Search for appointments on the same day and time slot
    const appointments = await Appointment.find({
      date: {
        $gte: new Date(appointmentDate.setHours(0, 0, 0, 0)), // Start of the day
        $lt: new Date(appointmentDate.setHours(23, 59, 59, 999)), // End of the day
      },
      timeSlot,
    });

    if (appointments.length > 0) {
      return res.status(200).json({ message: 'Time slot is booked.' });
    }

    return res.status(200).json({ message: 'Time slot is available.' });
  } catch (error) {
    console.error('Error checking availability:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { name, email, date, timeSlot, message } = req.body;

    // Check if date and timeSlot are provided
    if (!name || !email || !date || !timeSlot) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const appointmentDate = new Date(date);

    // Validate if the date is valid
    if (isNaN(appointmentDate)) {
      return res.status(400).json({ message: 'Invalid date format.' });
    }

    // Check if the time slot is available before booking
    const existingAppointments = await Appointment.find({
      date: {
        $gte: new Date(appointmentDate.setHours(0, 0, 0, 0)),
        $lt: new Date(appointmentDate.setHours(23, 59, 59, 999)),
      },
      timeSlot,
    });

    if (existingAppointments.length > 0) {
      return res.status(409).json({ message: 'Time slot is already booked.' });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      name,
      email,
      date: appointmentDate,
      timeSlot,
      message,
    });

    await newAppointment.save();
    return res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    return res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ message: 'Appointment ID is required.' });
    }

    await Appointment.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
