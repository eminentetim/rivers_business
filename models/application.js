const mongoose = require('mongoose');



const applicationSchema = new mongoose.Schema({

  // course
  
  coursse: {
      programmeTitle: {type: 'string', required: true},
      courseTitle: {type: 'string', required: true},
  },
  // Personal Information
  personalInformation: {
    title: { type: String, required: true },
    first_name: { type: String, required: true },
    middle_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email:{ type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    birthdate: { type: Date, required: true },
    address: { type: String, required: true },
    religion: { type: String, required: true },
    phone: { type: String, required: true },
    physical_challange: { type: String, required: true },
    photo: { type: String, required: true },
  },
  // next of kind
  emergencyContact: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  // Citizenship
  citizenship: {
    nationality: { type: String, required: true },
    countryOfResidency: { type: String, required: true },
    primaryLanguage: { type: String, required: true },
    stateOfOrigin: { type: String, required: true },
  },
  // Work/Business Experience
  workExperience: {
    postQualificationExperienceYears: { type: Number, required: true },
    managerialExperienceYears: { type: Number, required: true },
  },
  // LBS Programme Qualification
  lbsProgrammeQualification: {
    highestQualification: { type: String, required: true },
    classOfDegree: { type: String, required: true },
    factorsMotivatingMBA: { type: String, required: true },
    factorsHinderingMBA: { type: String, required: true },
  },
  // Qualification
  qualifications: [{
    institutionName: { type: String, required: true },
    institutionType: { type: String, required: true },
    certificateAwarded: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  }],
  // Programme Financing
  programmeFinancing: {
    fundingMethod: { type: String, required: true },
  },
  // Attachments
  attachments: {
    degreeCertificate: { type: String, required: true },
    curriculumVitae: { type: String, required: true },
    evidenceOfAbilityToPay: { type: String, required: true },
    oLevelResult: { type: String, required: true },
    nyscExemptionLetter: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
