// routes/appointmentRoutes.js
import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/check-availability', appointmentController.checkAvailability);
router.post('/book', appointmentController.bookAppointment);
router.get('/', appointmentController.getAppointments);
router.delete('/:id', appointmentController.deleteAppointment);

export default router;
