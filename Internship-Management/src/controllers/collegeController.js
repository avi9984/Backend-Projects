const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const isValid = function (value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === "string" && value.trim().length == 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const createCollage = async function (req, res) {
  try {
    const requestBody = req.body;

    const { name, fullName, logoLink } = requestBody;
    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({status: false, msg: "Invalid request.Please provide college details"});
    }

    if (!isValid(name)) {
      return res.status(400).send({ status: false, msg: "Please provide college name" });
    }

    if (!isValid(fullName)) {
      return res.status(400).send({ status: false, msg: "Please provide college fullName" });
    }

    if (!isValid(logoLink)) {
      return res.status(400).send({ status: false, msg: "Please provide college logoLink" });
    }

    const collegeExist = await collegeModel.findOne({name: name});
    if (collegeExist)
      return res.status(400).send({ status: false, msg: "college already exists"});

    const newCollege = await collegeModel.create(requestBody);
    res.status(201).send({status: true,msg: "College Successfully Created",data: newCollege});

  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

const getCollegeDetails = async function (req, res) {
  try {
    let query = req.query;
    if (!isValidRequestBody(query)) {
      return res.status(400).send({ status: false, msg: "Provide a query collegeName" });
    }
    if (Object.keys(query).length > 1)
      return res.status(400).send({status: false,msg: "Invalid Request. collegeName is available",
      });
    let collegeName = query.collegeName;

    let collegeData = await collegeModel.findOne({name: collegeName});

    if (Object.keys(collegeData).length === 0)
      return res.status(404).send({ status: false, msg: "College details not found" });

    let collegeDataId = collegeData._id.toString();

    let internForCollege = await internModel.find({collegeId: collegeDataId});
    if (Object.keys(internForCollege).length === 0)
      return res.status(404).send({status: false, msg: `Intern details not found for ${collegeName}`});

    let resultData = {};
    resultData["name"] = collegeData.name;
    resultData["fullName"] = collegeData.fullName;
    resultData["logoLink"] = collegeData.logoLink;
    resultData["interest"] = internForCollege;

    res.status(200).send({ status: true, data: resultData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createCollage, getCollegeDetails };
