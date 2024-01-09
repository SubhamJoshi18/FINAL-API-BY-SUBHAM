const express = require("express");
const fs = require("fs");

const readAble = JSON.parse(
  fs.readFileSync(`${__dirname}/data/mydata/data.json`),
  "utf-8"
);

const getAllData = (req, res) => {
  try {
    res.status(200).json({
      status: "It is Running Successfully",
      date: new Date().getDay(),
      data: {
        readAble,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Error while getting the data from the json",
    });
  }
};

const getdataById = (req, res) => {
  try {
    const ParameterId = parseInt(req.params.id);
    const checkId = readAble.filter((read) => {
      return read.id === ParameterId;
    });
    console.log(checkId);
    res.status(200).json({
      status: "Successfully obtained the id of the given parameter ",
      date: new Date().getDay(),
      data: {
        checkId,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting the id from the json",
    });
  }
};

const createData = (req, res) => {
  try {
    const newId = readAble[readAble.length - 1].id + 1;

    const newData = Object.assign({ id: newId }, req.body);
    readAble.push(newData);
    fs.writeFile(
      `${__dirname}/data/mydata/data.json`,
      JSON.stringify(newData),
      (err) => {
        res.status(200).json({
          status: "Successfully inserted on the Json file",
          date: new Date().getDay(),
          data: {
            newData,
          },
        });
      }
    );
  } catch (err) {
    if (!req.name || !req.status) {
      res.status(400).json({
        message: "Error posting the data in the json",
      });
    }
  }
};

const updateData = (req, res) => {
  try {
    const searchid = parseInt(req.params.id);

    const updatedPatch = Object.assign({ id: searchid }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Successfully patches the json data",
      date: new Date().getDay(),
      data: {
        updatedPatch,
      },
    });
  } catch (err) {
    const search = readAble.find((read) => read.id === id);
    if (!search || req.params.id * 1 > readAble.length) {
      res.status(404).json({
        message: "Error patching or updating the data",
      });
    }
  }
};

const deleteData = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const findIndex = readAble.filter((read) => read.id !== id);
    const deleted = readAble.splice(findIndex, -1);
    res.status(200).json({
      message: "Successfully deleted",
      date: new Date().getDay(),
      data: {
        findIndex,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "Error while deleting the data from json",
    });
  }
};

module.exports = {
  getAllData,
  getdataById,
  createData,
  updateData,
  deleteData,
};
