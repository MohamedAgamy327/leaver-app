import React from "react";
import { Table } from "react-bootstrap";

/////////////////////////////////////////////////////////////////////////
const API = "/api/";
const SEARCH = "resignations/";

/////////////////////////////////////////////////////////////////////////
export class ASTTableScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };

    this.onRowClick = this.onRowClick.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.fetchResignations = this.fetchResignations.bind(this);
  }

  componentDidMount() {
    this.fetchResignations();
  }

  checkStatus(status){
    switch(status){
      case "pending":
        return (
          <td style = {{color: "#BE0002", fontWeight: "bold", textTransform: "uppercase"}}>{status}</td>
        );
      case "done": 
        return (
          <td style = {{color: "#5cb85c", fontWeight: "bold", textTransform: "uppercase"}}>{status}</td>
        );
      default:
        return (
          <td style = {{color: "#34a1fd", fontWeight: "bold", textTransform: "uppercase"}}>{status}</td>
        );
    }
  }

  onRowClick(resignation) {
    this.props.history.push({
      pathname: "/ast-resignation",
      state: { resDetails: resignation }
    });
  }

  fetchResignations() {
    fetch(API + SEARCH)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          requests: data
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { requests } = this.state;
    return (
      <div className="container">
        <center style={{ margin: '25px' }}>
          <header> 
            <hr/>
            <h3>Application Security Team</h3>
            <hr/>
          </header>
          <div>
            <Table bordered hover striped>
              <thead>
                <tr style = {{backgroundColor: "#BE0002"}}>
                  <th className = "text-white">Staff ID</th>
                  <th className = "text-white">Employee Name</th>
                  <th className = "text-white">Manager Name</th>
                  <th className = "text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr
                    onClick={() => this.onRowClick(request)}
                    key={request.staffId}
                  >
                    <td>{request.staffId}</td>
                    <td>{request.name}</td>
                    <td>{request.managerName}</td>
                    {this.checkStatus(request.phase6.status)}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </center>
      </div>
    );
  }
}
