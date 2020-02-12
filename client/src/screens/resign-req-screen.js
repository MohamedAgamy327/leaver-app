// to do -> redirect after Submit
import React, { Component } from 'react';
import {
  Container, Form, Row, Col,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageUploaderComponent } from '../components';

const API = '/api/';
const SEARCH = 'users/search'
const SUBMIT = 'resignations/'

export class ResignReqScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffId: '',
      returnedHeadset: '',
      returnedKeys: '',
      returnedOhda: '',
      ohdaType: '',
      lastWorkDay: '',
      nationalId: '',
      nationalIdImg: null,
      annualsGranted: '',
      annualsTaken: '',
      noShow: '',
      lostHours: '',
      daysToTake: '',
      sapStaffId: '',
      name: '',
      managerName: '',
      ntAccount: '',
      department: '',
      costCenter: '',
      jobTitle: '',
      hiringDate: '',
      mobile: '',
      iex: '',
    };
  }

  onSearch = (e) => {
    e.preventDefault();
    fetch(API + SEARCH, {
      body: JSON.stringify({ staffId: this.state.staffId }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    })
      .then((response) => {
        if (response.status === 200) {

          return (response.json());
        } else {
          toast.error("User not found");
          return undefined;
        }
      })
      .then((data) => {
        if (data) {
          this.setState({ staffId: data.staffId });
          this.setState({ sapStaffId: data.staffId });
          this.setState({ name: data.name });
          this.setState({ managerName: data.managerName });
          this.setState({ ntAccount: data.ntAccount });
          this.setState({ department: data.department });
          this.setState({ costCenter: data.costCenter });
          this.setState({ jobTitle: data.jobTitle });
          this.setState({ hiringDate: data.hiringDate });
          this.setState({ mobile: "+" + data.mobile });
        }
      })
  }

  onSubmit = (e) => {
    e.preventDefault();
    fetch(API + SUBMIT, {
      body: JSON.stringify({
        staffId: this.state.staffId,
        managerName: this.state.managerName,
        name: this.state.name,
        status: "new",
        phase1: {
          status: "done",
          returnedHeadset: this.state.returnedHeadset,
          returnedKeys: this.state.returnedKeys,
          returnedOhda: this.state.returnedOhda,
          ohdaType: this.state.ohdaType,
          lastWorkDay: this.state.lastWorkDay,
          nationalId: this.state.nationalId,
          nationalIdImg: this.state.nationalIdImg,
          annualsGranted: this.state.annualsGranted,
          annualsTaken: this.state.annualsTaken,
          noShow: this.state.noShow,
          lostHours: this.state.lostHours,
          daysToTake: this.state.daysToTake,
          iex: this.state.iex
        },
        phase2: {
          status: "new",
        },
        phase3: {
          status: "new",
        },
        phase4: {
          status: "new",
        },
        phase5: {
          status: "new",
        },
        phase6: {
          status: "new",
        },
        phase7: {
          status: "new",
        }
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Resignation Request Recieved");
        }
        else if (response.status === 503) {
          toast.error("Error in db");
        }
        else {
          toast.error("Resigation already exists");
          return undefined;
        }
      })
  }

  handleChange = e => {
    if (e.target.type === 'select-one') {
      if (e.target.value === 'yes') {
        this.setState({ [e.target.name]: 'true' });
      }
      else if (e.target.value === 'no') {
        this.setState({ [e.target.name]: 'false' });
      }
      else{
        this.setState({ [e.target.name]: 'N/A' });
      }
    }
    else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  imageUploaderHandler = (file) => {
    this.setState({
      nationalIdImg: {
        fileName: file.name,
        dataURL: file.dataURL,
        type: file.type,
        size: file.size
      }
    })
  }

  render() {
    return (
      <Container >
        <br />
        <h3>Resignation Request</h3>
        <br />
        <ToastContainer />
        <Form >
          <Form.Group >
            <Form.Group className="p-2 border border-danger">
              <Row >
                <Col><Form.Label>Staff ID</Form.Label></Col>
                <Col><Form.Control
                  name="staffId"
                  id="id"
                  placeholder="12345"
                  className="form-control"
                  onChange={this.handleChange}
                /></Col>
                <Col>
                  <Button type="button" variant="danger" onClick={this.onSearch}>Search</Button>
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Col><Form.Label className="col-form-label">SAP Staff ID</Form.Label></Col>
              <Col ><Form.Control plaintext readOnly value={this.state.sapStaffId} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Employee Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.name} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Manager Name</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.managerName} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>NT Account</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.ntAccount} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Department</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.department} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Care Center</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.costCenter} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Job Title</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.jobTitle} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Hiring Date</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.hiringDate} /></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col><Form.Label>Mobile Number</Form.Label></Col>
              <Col><Form.Control plaintext readOnly value={this.state.mobile} /></Col>
              <Col></Col>
            </Row>
          </Form.Group>
          <Form.Group className="p-2 border border-danger" >
            <Row>
              <Col><Form.Label>Returned Headset</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedHeadset" onChange={this.handleChange} defaultValue={{ label: "N/A", value: 'N/A' }} >
                  <option>N/A</option>
                  <option>Yes</option>
                  <option>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>Returned Keys</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedKeys" onChange={this.handleChange}>
                  <option>N/A</option>
                  <option>Yes</option>
                  <option>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>Returned 3ohda</Form.Label></Col>
              <Col>
                <Form.Control as="select" name="returnedOhda" onChange={this.handleChange} required>
                  <option>N/A</option>
                  <option>Yes</option>
                  <option>No</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col><Form.Label>3ohda Type</Form.Label></Col>
              <Col><Form.Control as="textarea" rows="1" name="ohdaType" onChange={this.handleChange} required /></Col>
            </Row>
          </Form.Group>
          <Form.Group className="p-2 border border-danger">
            <Row>
              <Col><Form.Label>Leave Balance</Form.Label></Col>
              <Col></Col>
              <Col><Form.Label>IEX</Form.Label></Col>
              <Col><Form.Control as="textarea" rows="1" name="iex" onChange={this.handleChange} required /></Col>
            </Row>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Annuals Granted</th>
                  <th scope="col">Annuals Taken</th>
                  <th scope="col">No Show</th>
                  <th scope="col">Lost Hours</th>
                  <th scope="col">In Lieu days to take</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><Form.Control as="textarea" rows="1" name="annualsGranted" onChange={this.handleChange} required /></th>
                  <td><Form.Control as="textarea" rows="1" name="annualsTaken" onChange={this.handleChange} required /></td>
                  <td><Form.Control as="textarea" rows="1" name="noShow" onChange={this.handleChange} required /></td>
                  <td><Form.Control as="textarea" rows="1" name="lostHours" onChange={this.handleChange} required /></td>
                  <td><Form.Control as="textarea" rows="1" name="daysToTake" onChange={this.handleChange} required /></td>
                </tr>
              </tbody>
            </table>
          </Form.Group>
          <Form.Group className="p-2 border border-danger">
            <Row>
              <Col><Form.Label>Last Working Day</Form.Label></Col>
              {/* <Col><Form.Control rows="1" required/></Col> */}
              <Col> <input type="date" id="last" name="lastWorkDay"
                min="2018-01-01" max="2026-12-31" onChange={this.handleChange} required></input></Col>
            </Row>
            <Row>
              <Col><Form.Label>National ID Number</Form.Label></Col>
              <Col><Form.Control required as="textarea" rows="1" name="nationalId" onChange={this.handleChange} /></Col>
            </Row>
          </Form.Group>
          <Form.Group className="p-2 border border-danger">
            <Row>
              <Col><Form.Label>Copy of National ID</Form.Label></Col>
              <Col>
                <ImageUploaderComponent fileAddHandler={this.imageUploaderHandler} />
              </Col>
            </Row>
          </Form.Group>
          <br />
          <Button type="submit" variant="danger" size="lg" onClick={this.onSubmit} block>Submit</Button>
        </Form>
      </Container>
    );
  }
}
