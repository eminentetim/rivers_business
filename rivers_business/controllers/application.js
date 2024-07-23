const Application = require('../models/application');

exports.createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).send(application);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({});
    res.status(200).send(applications);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).send();
    }
    res.status(200).send(application);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateApplication = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'personalInformation', 'emergencyContact', 'citizenship', 'workExperience', 
    'lbsProgrammeQualification', 'qualifications', 'programmeFinancing', 'attachments'
  ];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).send();
    }

    updates.forEach(update => application[update] = req.body[update]);
    await application.save();
    res.status(200).send(application);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).send();
    }
    res.status(200).send(application);
  } catch (error) {
    res.status(500).send(error);
  }
};

