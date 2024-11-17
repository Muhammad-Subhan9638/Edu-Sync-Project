import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Axios from 'axios';
import UpdatePopup from '../../components/UpdatePopup';
import { Sidebar } from './Sidebar';

const Students = () => {
    const [ListofStudents, setListOfStudent] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const navigate = useNavigate();
    const [editStudent, setEditStudent] = useState({
        _id: "",
        Name: "",
        Email: "",
        Phone: "",
        Age: "",
        Address: "",
        StudentClass: "",
        Password: "",
        cPassword: "",
    });

    useEffect(() => {
        StudentList();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditStudent((prev) => ({ ...prev, [name]: value }));
    };

    const editHandler = (student) => {
        setTrigger(true);
        setEditStudent(student);
    };

    const StudentList = async () => {
        try {
            const { data } = await Axios.get('http://localhost:3001/all-students');
            setListOfStudent(data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteStudent = async (_id) => {
        const confirmDelete = window.confirm("Are you sure to delete this student?");
        if (confirmDelete) {
            try {
                await Axios.delete(`http://localhost:3001/students-delete/${_id}`);
                StudentList();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const UpdateData = async (editStudent) => {
        try {
            const response = await Axios.put("http://localhost:3001/update-student", editStudent);
            if (response.status === 200) {
                alert("Success!");
                StudentList();
                setTrigger(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addNewStudent = () => {
        navigate("/dashboard/student-register");
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid studentFile">
                <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                    <h4 className="text-primary">Students</h4>
                    <button className="btn btn-primary" onClick={addNewStudent}>Add Student</button>
                </div>
                <Table className="table table-striped table-hover">
                    <Thead>
                        <Tr>
                            <Th>Sr No</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Age</Th>
                            <Th>Address</Th>
                            <Th>Student Class</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ListofStudents.map((student, index) => (
                            <Tr key={student._id}>
                                <Td>{index + 1}</Td>
                                <Td>
                                    <img
                                        src={student.Image?.url || '/default-avatar.png'}
                                        alt="Profile"
                                        className="dashboardImg me-2"
                                    />
                                    {student.Name}
                                </Td>
                                <Td>{student.Email}</Td>
                                <Td>{student.Phone}</Td>
                                <Td>{student.Age}</Td>
                                <Td>{student.Address}</Td>
                                <Td>{student.StudentClass}</Td>
                                <Td>
                                    <button className="btn btn-sm btn-info me-2" onClick={() => editHandler(student)}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteStudent(student._id)}>Delete</button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <UpdatePopup trigger={trigger} setTrigger={setTrigger}>
                    <form className="p-3">
                        <h5 className="mb-4">Update Student Info</h5>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Name"
                                value={editStudent.Name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="Email"
                                value={editStudent.Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Address"
                                value={editStudent.Address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="number"
                                className="form-control"
                                name="Phone"
                                value={editStudent.Phone}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => UpdateData(editStudent)}
                        >
                            Update
                        </button>
                    </form>
                </UpdatePopup>
            </div>
        </div>
    );
};

export default Students;
