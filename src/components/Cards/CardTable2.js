
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from "../../action";
import axios from "axios";
import { Button, Modal } from 'react-bootstrap'
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import CardMovieDetail from "./CardMovieDetail";

export default function CardTable(props) {
  const [newmovie, setnewmovie] = useState({
    Movie:'',
    Year:'',
    Content:'',


  });
  const [image, setimage] = useState()
  function handleChange(e){
    
    const {name,value} = e.target;
    setnewmovie(newmovie=>({...newmovie,[name]:value}));
    console.log(newmovie)
  }
  async  function handleSubmit(e){
    console.log("kjhgfds");
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("Image",image);
      formData.append("Movie", newmovie['Movie']);
      formData.append("Content", newmovie['Content']);
      formData.append("Year", newmovie['Year']);
      // I just removed the curly brackets from formData
      const response = await axios.post("http://127.0.0.1:8000/api/new_movie", formData);
      toast.success("update thanh cong")
      
} catch (err) {
      console.error(err.message);
}
  }

  const { color, column, data } = props;
  
  return (
    <>


      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 t-white")
        }
      >
        <div style={{ placeSelf: "flex-end" }}>

          
        </div>

        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold t-lg " +
                  (color === "light" ? "t-gray-800" : "t-white")
                }
              >
                Movie Tables
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
                  <CardMovieDetail data={dt}/>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>

          
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
