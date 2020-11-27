
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from "../../action";
import axios from "axios";
import { Button, Modal } from 'react-bootstrap'
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
// components

// const delete_item = async (id) => {
//   let callAPI = "http://127.0.0.1:8000/api/auth/profile_ID/" + id.toString()
//   console.log(callAPI)
//   try {
//     const data = await axios.delete(
//       callAPI
//     );

//   }
//   catch (e) {
//     console.log(e)
//   }
// }
// function handleDelete(id) {

//   Swal.fire({
//       title: "muon xoa thiet ha?",
//       text: "thiet hong dzo?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "oke toi luon",
//       cancelButtonText: "Hủy"
//   })
//       .then(result => {
//           if (result.isConfirmed) {
//               adminService.deleteCustomer(id)
//                   .then(res => {
//                       props.refetchData()
//                       toast.success("Xong roofi nha em yeu")
//                   })
//           }
//       })
// }
export default function CardTable(props) {

  const delete_item =  async (id) => {

    Swal.fire({
        title: "muon xoa thiet ha?",
        text: "thiet hong dzo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "oke toi luon",
        cancelButtonText: "Hủy"
    })
        .then(result => {
            if (result.isConfirmed) {
              let callAPI = "http://127.0.0.1:8000/api/auth/profile_ID/" + id.toString()
              try {
                const data = axios({
                  method: "DELETE",
                  url: callAPI
                }).then(res=>{
                  props.refetchData()
                  console.log("co vao day")
                  toast.success("Xong roofi nha em yeu")
                })
                
              }
              catch (e) {
                console.log(e)
              }
              
            }
        })
}
  const [edit, setedit] = useState({
    id:'',
    username:'',
    firstname:'',
    lastname:'',
    email:'',
    phonenum:'',
    address:''
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { color, column, data } = props;
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 t-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold t-lg " +
                  (color === "light" ? "t-gray-800" : "t-white")
                }
              >
                Profile Tables
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {column.map(cot => (<th key={cot}
                  className={
                    "px-6 align-middle border border-solid py-3 t-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold t-left " +
                    (color === "light"
                      ? "bg-gray-100 t-gray-600 border-gray-200"
                      : "bg-blue-800 t-blue-300 border-blue-700")
                  }>
                  {cot}
                </th>))}
                <th className={
                  "px-6 align-middle border border-solid py-3 t-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold t-left " +
                  (color === "light"
                    ? "bg-gray-100 t-gray-600 border-gray-200"
                    : "bg-blue-800 t-blue-300 border-blue-700")
                }>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(dt => (
                <tr key={dt.id}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                    {dt.id}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                    {dt.user}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                    <div className="flex">
                      {dt.fistname}
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                    <div className="flex">
                      {dt.lastname}
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                    <div className="flex">
                      {dt.phonenum}
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                    <div className="flex">
                      {dt.address}
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                    <div className="flex">
                      {dt.email}
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">




                    <button type="button" className="btn btn-danger" onClick={() => delete_item(dt.id)} >DELETE</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
  column: [],
  data: []
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  column: PropTypes.array,
  data: PropTypes.array
};
