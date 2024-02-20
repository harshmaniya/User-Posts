import React, { useEffect, useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import Button from "./Button";

function FormView() {

  const [formData, setFromData] = useState([])


  const handleDelete = (data) => {
    const oldData = JSON.parse(localStorage.getItem('formData')) || [];
    const updatedData = oldData.filter((old) => old.id !== data.id);
    console.log(updatedData);
    setFromData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
  }

  useEffect(() => {
    setFromData(JSON.parse(localStorage.getItem("formData")));
  }, [])

  if (formData.length > 0) {
    return (
      <div className='container'>
        <Link to="form">
          <Button
            type="button"
            className="btn btn-primary m-3"
            label="Form"
          />
        </Link>

        {/* <Outlet/> */}

        <table className="table mx-auto my-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">RollNo</th>
              <th scope="col">Select</th>
              <th scope="col">Gender</th>
              <th scope="col">Subjects</th>
              <th scope="col">File</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData?.map((data, index) => (
              <tr key={data.id}>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.RollNo}</td>
                <td>{data.Select}</td>
                <td>{data.Gender}</td>
                <td>{data.Subject}</td>
                <td>{data.file && <img
                  src={data.file.base64URL}
                  alt="Profile"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />}</td>
                <td>
                  <Link to={`edit/${data.id}`} className="btn btn-outline-primary">Edit</Link>

                  <button type="button" className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${index}`}>Delete</button>
                  <div
                    className="modal fade"
                    id={`exampleModal${index}`}
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Confirm Deletion
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          Are you sure you want to delete the selected item?
                        </div>
                        <div className="modal-footer">
                          <button
                            type='button'
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(e) => handleDelete(data)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <h3>record is not available</h3>
    )
  }
}

export default FormView
