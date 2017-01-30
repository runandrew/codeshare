'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const InterviewProblem = db.define('interviewProblems', {
  interviewerRating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  candidateRating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  status: Sequelize.ENUM('planned', 'used', 'not used', 'reviewed')
});

module.exports = InterviewProblem;
