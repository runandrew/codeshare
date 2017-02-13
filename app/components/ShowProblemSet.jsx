import React from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, DropDownMenu, MenuItem, Divider, GridTile, GridList, Subheader, TextField} from 'material-ui';
import {setProblemStatus, setInterviewerRating} from 'APP/app/reducers/interviewProblems';

// fetchProblems(interviewID)
const PROBLEM_SET_HEIGHT = '25vh';

// ------------------- DUMB COMPONENTS ------------------------ //
// Display a single interview problem and it's solutions
const Problem = (props) => {
  console.log('in Problem, props are ', props);
  const prob = props.problems[props.currentProblem];
  return (
    <Card>
      <CardHeader
        style={{textAlign: 'center'}}
        title={prob.name}
      />
      <CardText >
        <p><b>Description</b></p>
        <p>{prob.description}</p>
        <p><b>Solution(s)</b></p>
        {prob.solutions.map((s, i) =>
          <div key={i} style ={{overflow: 'auto'}}>
            <p>Solution {i + 1 }</p>
            <pre>{s.code}</pre>
            <p>BigO: {s.bigO}</p>
          </div>
        )}
      </CardText>
    </Card>
  );
};

// Display a table listing of the problems in the interview problem set
export const ProblemSet = (props) => {
  // let narrowColumn = {width: '5em', fontSize: '12pt', paddingTop: '6px', paddingBottom: '6px', height: '24px'};
  let narrowColumn = {width: '5em'};
  // let medColumn = {width: '8em', fontSize: '12pt', paddingTop: '6px', paddingBottom: '6px', height: '24px'};
  let medColumn = {width: '8em'};
  // let allColumn = {fontSize: '12pt', paddingTop: '6px', paddingBottom: '6px', height: '24px'};
  let allColumn = {};
  // let allRow = {height: '24px'};
  let allRow = {};
  return (
    <Card>
        <CardHeader
          style={{textAlign: 'center'}}
          title="Interview Problem Set"
        />
        <CardText >
          <Table className='problem-list'
            height={props.height}
            fixedHeader={true}
            selectable={true}
            multiSelectable={false}
            onRowSelection={props.onRowSelection}
          >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow style={allRow}>
                <TableHeaderColumn className="row-order" style={narrowColumn}>
                  Order
                </TableHeaderColumn>
                <TableHeaderColumn className="row-name" style={allColumn}>Name</TableHeaderColumn>
                <TableHeaderColumn className="row-difficulty" style={medColumn}>Difficulty</TableHeaderColumn>
                <TableHeaderColumn className="row-status" style={allColumn}>Status</TableHeaderColumn>
                <TableHeaderColumn className="row-rating" style={allColumn}>Rating</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox = {false} showRowHover={true}
            >
              {props.problems.map((p, i) =>
                <TableRow key={i} value={p} selected={i === props.currentProblem} style={allRow}>
                  <TableRowColumn className="row-order" style={narrowColumn}>{i + 1}</TableRowColumn>
                  <TableRowColumn className="row-name" style={allColumn}>{p.name}</TableRowColumn>
                  <TableRowColumn className="row-difficulty" style={medColumn}>{p.difficulty}</TableRowColumn>
                  <TableRowColumn className="row-status" style={allColumn}>
                    <DropDownMenu value={p.interviewProblems.status} onChange={props.onStatusChange}style={{fontSize: '13px'}}>
                      <MenuItem value={'planned'} primaryText="Planned" />
                      <MenuItem value={'used'} primaryText="Completed" />
                      <MenuItem value={'not used'} primaryText="Skipped" />
                    </DropDownMenu>
                  </TableRowColumn>
                  <TableRowColumn className="row-rating" style={allColumn}>
                    <DropDownMenu value={p.interviewProblems.interviewerRating} onChange={props.onRatingChange} style={{fontSize: '13px'}}>
                      <MenuItem value={null} primaryText="Not Rated" />
                      <MenuItem value={0} primaryText="0" />
                      <MenuItem value={1} primaryText="1" />
                      <MenuItem value={2} primaryText="2" />
                      <MenuItem value={3} primaryText="3" />
                      <MenuItem value={4} primaryText="4" />
                      <MenuItem value={5} primaryText="5" />
                    </DropDownMenu>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardText>
      </Card>
  );
};

// --------------- Display Problem CONTAINER COMPONENT -------------- //
// Displays the interview problem listing and the details of the
// selected problem.
export class ProblemContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {currentProblem: 0};
    this.onRowSelection = this.onRowSelection.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
  }

  onRowSelection (keys) {
    if (keys.length === 0) return;
    console.log('changing selected row: ', keys);
    let num = keys.pop();
    this.setState({currentProblem: num});
  }

  onStatusChange (event, index, status) {
    console.log('current state is: ', this.state);
    let i = this.state.currentProblem;
    console.log('In onStatusChange,  index: ', i);
    let problemId = this.props.interviewProblems[i].interviewProblems.problem_id;
    let interviewId = this.props.interviewProblems[i].interviewProblems.interview_id;
    console.log(`In onStatusChange, status: ${status} problemId: ${problemId} interviewId: ${interviewId}`);
    this.props.setProblemStatus(interviewId, problemId, i, status);
  }

  onRatingChange (event, index, rating) {
    console.log('In onRatingChange, this.state is ', this.state);
    let i = this.state.currentProblem;
    console.log('currentProblem is ', i);
    let problemId = this.props.interviewProblems[i].interviewProblems.problem_id;
    let interviewId = this.props.interviewProblems[i].interviewProblems.interview_id;
    console.log(`In onRatingChange, rating: ${rating} problemId: ${problemId} interviewId: ${interviewId}`);
    this.props.setInterviewerRating(interviewId, problemId, i, +rating);
  }


  render () {
    let problems = this.props.interviewProblems;
    let num = (this.state.currentProblem) ? this.state.currentProblem : 0;
    let show = (problems.length !== 0);
    return (
     <div style = {{borderLeft: 'solid lightgrey medium', boxShadow: '5px 5px grey'}}>
        <div>
          <ProblemSet problems={problems}
          height={PROBLEM_SET_HEIGHT}
          onRowSelection={this.onRowSelection}
          onStatusChange={this.onStatusChange}
          onRatingChange={this.onRatingChange}
          currentProblem={this.currentProblem}
          />
        </div>
        <div>
          {show && <Problem problems={problems} currentProblem={num} />}
        </div>
      </div>
    );
  }
}

// -----------------    CONNECT CONTAINER     ------------------ //

const mapStateToProps = (state) => {
  return {
    interviewProblems: state.interview.interviewProblems.toJS()
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setProblemStatus: (interviewId, problemId, i, status) => {
      dispatch(setProblemStatus(interviewId, problemId, i, status));
    },
    setInterviewerRating: (interviewId, problemId, i, rating) => {
      dispatch(setInterviewerRating(interviewId, problemId, i, rating));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemContainer);