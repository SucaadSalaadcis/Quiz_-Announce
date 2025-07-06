import announceModel from '../models/announceModel.js';

// get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announces = await announceModel.find();
    res.status(200).json({
      count: announces.length,
      data: announces,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get one anouncement by id 
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const anounce = await announceModel.findById(id);
    res.send({
      anounce
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
};


// create a new announcement
const createAnnouncement = async (req, res) => {
  try {
    const { name, title, avatar, message } = req.body;
    // checking if required fields is same as model
    if (!req.body.name || !req.body.title || !req.body.avatar || !req.body.message) {
      return res.status(400).send({
        message: "Send all required fields : name, title,avatar, message"
      });
    } // end if

    const newAnnouncement = {
      name: name,
      title: title,
      avatar: avatar,
      message: message,
    }

    const announce = await announceModel.create(newAnnouncement);
    return res.status(201).send(announce);


  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message })
  }
};

// update announcement
const updateAnnouncement = async (req, res) => {
  try {
    // checking if required fields is same as model
    if (!req.body.name || !req.body.title || !req.body.avatar || !req.body.message) {
      return res.status(400).send({
        message: "Send all required fields : name, title,avatar, message"
      });
    } 

    const { id } = req.params;
    const result = await announceModel.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({
        message: "Announcement not found"
      });
    } else {
      return res.status(200).send({
        message: "Announcement updated successfully..."
      });
    }


  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message })
  }
};

// delete announcement
const deleteAnnouncement = async (req, res) => {
  try {

    const { id } = req.params;
    const result = await announceModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({
        message: "Announcement not found"
      });
    } else {
      return res.status(200).send({
        message: "Announcement deleted successfully..."
      });
    }


  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message })
  }
};


export const announcementController = { getAllAnnouncements, getById, createAnnouncement, updateAnnouncement, deleteAnnouncement };
