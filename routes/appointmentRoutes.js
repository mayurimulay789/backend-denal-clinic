// routes/appointmentRoutes.js
import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js'; // Ensure the .js extension is included

const router = express.Router();

router.get('/', appointmentController.getAppointments);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

// Route for checking time slot availability
router.get('/check-availability', appointmentController.checkTimeSlotAvailability);

// Route for notifying the admin
router.post('/notify', appointmentController.notifyAdmin);

export default router;
