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

// Upload fuction
exports.uploadAttachments = async (req, res) => {
  try {
    const application = await Application.findById(req.body.applicationId);
    if (!application) {
      return res.status(404).send('Application not found');
    }

    const degreeCertificate = req.files['degreeCertificate'] ? req.files['degreeCertificate'][0].path : '';
    const curriculumVitae = req.files['curriculumVitae'] ? req.files['curriculumVitae'][0].path : '';
    const evidenceOfAbilityToPay = req.files['evidenceOfAbilityToPay'] ? req.files['evidenceOfAbilityToPay'][0].path : '';
    const oLevelResult = req.files['oLevelResult'] ? req.files['oLevelResult'][0].path : '';
    const nyscExemptionLetter = req.files['nyscExemptionLetter'] ? req.files['nyscExemptionLetter'][0].path : '';
    const photo = req.files['photo'] ? req.files['photo'][0].path : '';
    application.attachments = {
      degreeCertificate,
      curriculumVitae,
      evidenceOfAbilityToPay,
      oLevelResult,
      nyscExemptionLetter,
      photo
    };

    await application.save();
    res.status(201).send('Files uploaded and application updated successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

