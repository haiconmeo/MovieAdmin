import React, { useEffect, useState, useCallback } from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import Axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { profile } from "reducers/profile";
const Tables = () => {
  function list_table(listProfile) {
    var result = [];
    var i;
    for (i = 0; i < listProfile.length; i++) {
      var id = listProfile[i].id;
      var username = listProfile[i].user.username;
      var fistname = listProfile[i].fistname;
      var lastname = listProfile[i].lastname;
      var phonenum = listProfile[i].phonenum;
      var address = listProfile[i].address;
      var email = listProfile[i].user.email;
      var l = {
        "id": listProfile[i].id,
        "user": username,
        "fistname": fistname,
        "lastname": lastname,
        "phonenum": phonenum,
        "address": address,
        "email": email

      };
      // console.log(l)
      result.push(l);
    }
    return (result)
  }
  const getend_id = async () => {
    let callAPI = "http://django-api.eba-jmjspmms.ap-southeast-1.elasticbeanstalk.com/api/profile_list_end"

    try {
      const data = await Axios.get(
        callAPI
      );

      setend(data.data.id);
    }
    catch (e) {
      console.log(e)
    }
  }
  function end_id() {
    var x = end;
    setindex(end-1)

      getlistProfile(x);
    }

    function start_id() {
      setindex(1 )

      getlistProfile(1);
      
    }
  var listtable;
  const [listProfile, setlistProfile] = useState([])
  const [index, setindex] = useState(1)
  const [end, setend] = useState()
  const getlistProfile = async (index) => {

    let next= index.toString()
    console.log("dmm",next)
    let callAPI= "http://django-api.eba-jmjspmms.ap-southeast-1.elasticbeanstalk.com/api/auth/profile/"+next
    console.log("jfnskjad",callAPI)
    try {
      const data = await Axios.get(
        callAPI
      );
      // console.log(typeof(data.data));
      setlistProfile(list_table(data.data));
    }
    catch (e) {
      console.log(e)
    }
  }
  function pre_id(){
    if (index==1){
      console.log(index)
      getlistProfile(index);
    }
    else{
      var x = index-1;
      setindex(x)
      getlistProfile(x);
    }
    
    // setindex(x)
    // getlistProfile(index)
  }
  function next_id(){
    console.log(index)
    var x= index+1;
    setindex(x)
    console.log(index)
    getlistProfile(x)
  }
  useEffect(() => {
    getend_id()
    getlistProfile(index)

  }, []);


  const [columns, setColumns]= useState([
    "Id",
    "User Name",
    "First Name",
    "Last Name",
    "Phone number",
    "Address" ,
    "Email"])
const refetchData= useCallback(()=>getlistProfile(index),[getlistProfile, index])
  return (
    <>
    
      <div className="flex flex-wrap mt-4">
      
        <div className="w-full mb-12 px-4">
          <CardTable column = {columns} data= {listProfile} refetchData={refetchData}/>
          <div>
          <button type="button" style={{ marginRight: "5px" }} className="btn btn-secondary" onClick={start_id}>&laquo;</button>
                <button type="button" style={{ marginRight: "5px" }} className="btn btn-secondary" onClick={pre_id}>Pre</button>
                <button type="button" className="btn btn-secondary" style={{ marginRight: "5px" }} onClick={next_id}>Next</button>
                <button type="button" style={{ marginRight: "5px" }} className="btn btn-secondary" onClick={end_id}>&raquo;</button>
          
          </div>
          
        </div>

      </div>
    </>
  );
}
export default Tables;
