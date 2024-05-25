// queryDB.js

const mongoose = require('mongoose');
const Log = require('../models/log');
const Report = require('../models/report');

// Function to fetch all logs from the database
const getAllLogs = async () => {
  try {
    const logs = await Log.find();
    return logs;
  } catch (error) {
    console.error('Error fetching logs:', error);
    return null;
  }
};

// Function to fetch all reports from the database
const getAllReports = async () => {
  try {
    const reports = await Report.find();
    return reports;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return null;
  }
};

// Function to add a new log to the database
const addLog = async (logData) => {
  try {
    const newLog = new Log(logData);
    await newLog.save();
    return newLog;
  } catch (error) {
    console.error('Error adding log:', error);
    return null;
  }
};

// Function to add a new report to the database
const addReport = async (reportData) => {
  try {
    const newReport = new Report(reportData);
    await newReport.save();
    return newReport;
  } catch (error) {
    console.error('Error adding report:', error);
    return null;
  }
};

module.exports = {
  getAllLogs,
  getAllReports,
  addLog,
  addReport,
};