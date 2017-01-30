'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Interview = require('./interview');
const Organization = require('./organization');
const Problem = require('./problem');
const InterviewProblem = require('./interviewProblem');

Interview.belongsTo(User, {as: 'interviewer'});
Interview.belongsTo(User, {as: 'candidate'});
User.belongsTo(Organization);
Problem.belongsTo(Organization);
Problem.belongsToMany(Interview, {through: InterviewProblem});

module.exports = {
  User,
  Interview,
  Organization,
  Problem,
  InterviewProblem
};
