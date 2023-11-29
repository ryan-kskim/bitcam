import React, { useState } from "react";
import { Label, Input, Button, Table, Modal, Select } from "semantic-ui-react";
import Calendar from "rc-calendar";
import DatePicker from "rc-calendar/lib/Picker";
import axios from "axios";
import moment from "moment";

import 'rc-calendar/assets/index.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  const [no, setNo] = useState(""); // 직번
  const [emps, setEmps] = useState(null); // 전체 직원 데이터
  const [open, setOpen] = useState(false); // 등록, 수정 팝업 여부
  const [modalCU, setModalCU] = useState(false); // 등록: false, 수정: true
  const [empData, setEmpData] = useState(null); // 개별 직원 데이터
  const [deptID, setDeptID] = useState(''); // 부서코드
  const [hireDate, setHireDate] = useState(moment()); // 입사일
  
  const deptCode = [
    {key: '1', value: '10', text: 'Administration'},
    {key: '2', value: '20', text: 'Marketing'},
    {key: '3', value: '30', text: 'Purchasing'},
    {key: '4', value: '40', text: 'Human Resources'},
    {key: '5', value: '50', text: 'Shipping'},
    {key: '6', value: '60', text: 'IT'},
    {key: '7', value: '70', text: 'Public Relations'},
    {key: '8', value: '80', text: 'Sales'},
    {key: '9', value: '90', text: 'Executive'},
    {key: '10', value: '100', text: 'Finance'},
    {key: '11', value: '110', text: 'Accounting'},
    {key: '12', value: '120', text: 'Treasury'},
    {key: '13', value: '130', text: 'Corporate Tax'},
    {key: '14', value: '140', text: 'Control And Credit'},
    {key: '15', value: '150', text: 'Shareholder Services'},
    {key: '16', value: '160', text: 'Benefits'},
    {key: '17', value: '170', text: 'Manufacturing'},
    {key: '18', value: '180', text: 'Construction'},
    {key: '19', value: '190', text: 'Contracting'},
    {key: '20', value: '200', text: 'Operations'},
    {key: '21', value: '210', text: 'IT Support'},
    {key: '22', value: '220', text: 'NOC'},
    {key: '23', value: '230', text: 'IT Helpdesk'},
    {key: '24', value: '240', text: 'Government Sales'},
    {key: '25', value: '250', text: 'Retail Sales'},
    {key: '26', value: '260', text: 'Recruiting'},
    {key: '27', value: '270', text: 'Payroll'},
  ];


  // 조회 버튼 클릭
  const retrieveEmp = (id) => {
    // 직원 조회
    axios.get(`/z01a01-example/employees/${id}`)
      .then(function (response) {
        // 성공 핸들링
        console.log('조회 ==> ', response);
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            setEmps(response.data);
          } else if (response.data == null || response.data === "") {
            setEmps(null);
          } else {
            const temp = [];
            temp.push({key: '1', ...response.data});
            setEmps(temp);
          }            
        }
      })
      .catch(function (error) {
        // 에러 핸들링
        console.error(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });
  };


  // 리스트에서 수정, 상단 등록 버튼 클릭
  const regEmp = (cu, data) => {
    setModalCU(cu);
    if (data) {
      setEmpData(data);
    }
    setOpen(true);
  };
  

  // Modal 창에서 등록, 수정 버튼 클릭
  const mergeEmp = () => {
    const createData = {
      employeeId: document.getElementById('employeeId').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      hireDate: document.getElementById('hireDate').value,
      jobId: document.getElementById('jobId').value,
      salary: document.getElementById('salary').value,
      commissionPct: document.getElementById('commissionPct').value,
      managerId: document.getElementById('managerId').value,
      departmentId: deptID,
    }

    const updateData = {
      nameValues: []
    };

    if (modalCU && empData) {
      if (!empData.employeeId || empData.employeeId !== createData.employeeId) {
        updateData.nameValues.push({
          name: 'employeeId',
          value: createData.employeeId,
        });
      }
      if (!empData.firstName || empData.firstName !== createData.firstName) {
        updateData.nameValues.push({
          name: 'firstName',
          value: createData.firstName,
        });
      }
      if (!empData.lastName || empData.lastName !== createData.lastName) {
        updateData.nameValues.push({
          name: 'lastName',
          value: createData.lastName,
        });
      }
      if (!empData.email || empData.email !== createData.email) {
        updateData.nameValues.push({
          name: 'email',
          value: createData.email,
        });
      }
      if (!empData.phoneNumber || empData.phoneNumber !== createData.phoneNumber) {
        updateData.nameValues.push({
          name: 'phoneNumber',
          value: createData.phoneNumber,
        });
      }
      if (!empData.hireDate || empData.hireDate !== createData.hireDate) {
        updateData.nameValues.push({
          name: 'hireDate',
          value: createData.hireDate,
        });
      }
      if (!empData.jobId || empData.jobId !== createData.jobId) {
        updateData.nameValues.push({
          name: 'jobId',
          value: createData.jobId,
        });
      }
      if (!empData.salary || empData.salary !== createData.salary) {
        updateData.nameValues.push({
          name: 'salary',
          value: createData.salary,
        });
      }
      if (!empData.commissionPct || empData.commissionPct !== createData.commissionPct) {
        updateData.nameValues.push({
          name: 'commissionPct',
          value: createData.commissionPct,
        });
      }
      if (!empData.managerId || empData.managerId !== createData.managerId) {
        updateData.nameValues.push({
          name: 'managerId',
          value: createData.managerId,
        });
      }
      if (!empData.departmentId || empData.departmentId !== createData.departmentId) {
        updateData.nameValues.push({
          name: 'departmentId',
          value: createData.departmentId,
        });
      }
    }

    if (!modalCU) {
      createEmp(createData);
    } else {
      if (updateData.nameValues.length > 0) {
        updateEmp(empData.employeeId, updateData);
      }
    }
  };


  // 직원 정보 생성
  const createEmp = (params) => {
    // 직원 생성
    axios.post('/z01a01-example/employees', params)
      .then(function (response) {
        // 성공 핸들링
        console.log('삭제 ==> ', response);
        if (response.status === 200) {
          retrieveEmp(params.employeeId);
        }
      })
      .catch(function (error) {
        // 에러 핸들링
        console.error(error);
        setOpen(false);
      })
      .finally(function () {
        // 항상 실행되는 영역
        setOpen(false);
      });
  };


  // 직원 정보 업데이트
  const updateEmp = (id, params) => {
    // 직원 수정
    axios.put(`/z01a01-example/employees/${id}`, params)
      .then(function (response) {
        // 성공 핸들링
        console.log('삭제 ==> ', response);
        if (response.status === 200) {
          retrieveEmp(id);   
        }
      })
      .catch(function (error) {
        // 에러 핸들링
        console.error(error);
        setOpen(false);
      })
      .finally(function () {
        // 항상 실행되는 영역
        setOpen(false);
      });
  }

  // 리스트에서 삭제 버튼 클릭
  const deleteEmp = (id) => {
    // 직원 삭제
    if (window.confirm('직번 : ' + id + '를 삭제하시겠습니까?')) {
      axios.delete(`/z01a01-example/employees/${id}`)
        .then(function (response) {
          // 성공 핸들링
          console.log('삭제 ==> ', response);
          if (response.status === 200) {
            retrieveEmp(id);   
          }
        })
        .catch(function (error) {
          // 에러 핸들링
          console.error(error);
        })
        .finally(function () {
          // 항상 실행되는 영역
        });
    }
  }

  const deptName = (id) => {
    const name = deptCode.filter( item => item.value === String(id) );
    return name.length > 0 ? name[0].text : '';
  }

  return (
    <div className="container">
      <h1>직원목록</h1>
      <Label>직번</Label>
      <Input
        placeholder="직번을 입력해 주세요."
        name='no'
        value={no}
        onChange={(e) => setNo(e.target.value)}
      />         
      <Button primary onClick={() => retrieveEmp(no)}>조회</Button>
      <Button positive onClick={() => regEmp(false)}>등록</Button>
      <Button negative onClick={() => retrieveEmp('all')}>전체조회</Button>      
      <Table celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell >직번</Table.HeaderCell>
            <Table.HeaderCell>이름</Table.HeaderCell>
            <Table.HeaderCell>성</Table.HeaderCell>
            <Table.HeaderCell>이메일</Table.HeaderCell>
            <Table.HeaderCell>전화번호</Table.HeaderCell>
            <Table.HeaderCell>입사일</Table.HeaderCell>
            <Table.HeaderCell>업무</Table.HeaderCell>
            <Table.HeaderCell>기본월급</Table.HeaderCell>
            <Table.HeaderCell>수당률</Table.HeaderCell>
            <Table.HeaderCell>상위자</Table.HeaderCell>
            <Table.HeaderCell>부서</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            Array.isArray(emps) && emps.length > 0 ?
              emps.map((emp, index) =>
                <Table.Row key={index} textAlign="center">
                  <Table.Cell>{emp.employeeId}</Table.Cell>
                  <Table.Cell>{emp.firstName}</Table.Cell>
                  <Table.Cell>{emp.lastName}</Table.Cell>
                  <Table.Cell>{emp.email}@poscodx.com</Table.Cell>
                  <Table.Cell>{emp.phoneNumber}</Table.Cell>
                  <Table.Cell>{emp.hireDate ? emp.hireDate.substring(0, 10) : ''}</Table.Cell>
                  <Table.Cell>{emp.jobId}</Table.Cell>
                  <Table.Cell textAlign="right">{emp.salary > 0 ? emp.salary.toLocaleString() : emp.salary}</Table.Cell>
                  <Table.Cell textAlign="right">{emp.commissionPct}</Table.Cell>
                  <Table.Cell>{emp.managerId}</Table.Cell>
                  <Table.Cell>{deptName(emp.departmentId)}</Table.Cell>
                  <Table.Cell>
                    <Button positive onClick={() => regEmp(true, emp)}>수정</Button>
                    <Button negative onClick={() => deleteEmp(emp.employeeId)}>삭제</Button>
                  </Table.Cell>
                </Table.Row>
              )
              :
              <Table.Row>
                <Table.Cell textAlign="center" colSpan="12">데이터가 없습니다.</Table.Cell>
              </Table.Row>
          }
        </Table.Body>
      </Table>
      <Modal
        size="tiny"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Modal.Header content={modalCU ? '수정' : '등록'} />
        <Modal.Content>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="right">직번 : </Table.Cell>
                <Table.Cell>
                  <Input required
                    id="employeeId"
                    defaultValue={modalCU ? empData.employeeId : ''}
                    placeholder="직번을 입력해 주세요."
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">이름 : </Table.Cell>
                <Table.Cell>
                  <Input required
                    id="firstName" 
                    defaultValue={modalCU ? empData.firstName : ''} 
                    placeholder="이름을 입력해 주세요."
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">성 : </Table.Cell>
                <Table.Cell>
                  <Input required
                    id="lastName" 
                    defaultValue={modalCU ? empData.lastName : ''} 
                    placeholder="성을 입력해 주세요."
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">이메일 : </Table.Cell>
                <Table.Cell>
                  <Input required
                    id="email"
                    defaultValue={modalCU ? empData.email : ''}
                    placeholder="이메일을 입력해 주세요."
                  />@poscodx.com
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">전화번호 : </Table.Cell>
                <Table.Cell>
                  <Input required
                    id="phoneNumber" 
                    defaultValue={modalCU ? empData.phoneNumber : ''}
                    placeholder="전화번호를 입력해 주세요."
                    style={{width: "250px"}}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">입사일 : </Table.Cell>
                <Table.Cell>
                  <DatePicker
                    value={modalCU ? moment(empData.hireDate) : hireDate}
                    calendar={<Calendar format="YYYY-MM-DD" />}                      
                    onChange={(date) => setHireDate(date)}
                  >
                    {
                      ({value}) => {
                        return (                                
                          <Input required
                            id="hireDate"                              
                            value={value ? moment(value).format('YYYY-MM-DD HH:mm:ss.000') : ''}
                            placeholder="입사일자를 입력해 주세요."
                            icon="calendar alternate outline"
                            style={{width: "250px"}}
                          />
                        )
                      }
                    }
                  </DatePicker>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">업무 : </Table.Cell>
                <Table.Cell>
                  <Input required id="jobId" defaultValue={modalCU ? empData.jobId : ''} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">기본월급 : </Table.Cell>
                <Table.Cell>
                  <Input id="salary" defaultValue={modalCU ? empData.salary : '1000'} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">수당률 : </Table.Cell>
                <Table.Cell>
                  <Input id="commissionPct" defaultValue={modalCU ? empData.commissionPct : '0'} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">상위자 : </Table.Cell>
                <Table.Cell>
                  <Input id="managerId" defaultValue={modalCU ? empData.managerId : ''} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right">부서 : </Table.Cell>
                <Table.Cell>
                  <Select
                    id="departmentId"
                    options={deptCode}
                    defaultValue={modalCU ? String(empData.departmentId) : deptID}
                    onChange={(e, data) => setDeptID(data.value)}                      
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button positive content={modalCU ? '수정' : '등록'} onClick={() => mergeEmp()} />
          <Button negative content="닫기" onClick={() => setOpen(false)} />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default App;
