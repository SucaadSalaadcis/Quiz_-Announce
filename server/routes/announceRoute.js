import express from 'express';
import { announcementController } from '../controllers/announceController.js';

const router = express.Router();

router.get('/announcements', announcementController.getAllAnnouncements);
router.get("/announcements/:id", announcementController.getById);
router.post("/announcements", announcementController.createAnnouncement);
router.put("/announcements/:id", announcementController.updateAnnouncement);
router.delete("/announcements/:id", announcementController.deleteAnnouncement);

export default router;
