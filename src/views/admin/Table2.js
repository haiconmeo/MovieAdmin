import React, { useEffect, useState, useCallback } from "react";

// components

import CardTable2 from "components/Cards/CardTable2.js";
import Axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { profile } from "reducers/profile";
import axios from "axios";
import { Button, Modal } from 'react-bootstrap'
import { toast } from "react-toastify";
const Tables2 = () => {
  function list_table(listProfile) {
    var result = [];
    var i;
    for (i = 0; i < listProfile.length; i++) {
      var id = listProfile[i].id;
      var Movie = listProfile[i].Movie;
      var Year = listProfile[i].Year;
      var Content = listProfile[i].Content;
      var image = listProfile[i].Image;
      var deleted = listProfile[i].deleted;

      var l = {
        "id": id,
        "Movie": Movie,
        "Year": Year,
        "Content": Content,
        "Image": image,
        "deleted": deleted


      };
      // console.log(l)
      result.push(l);
    }
    return (result)
  }
  const [newmovie, setnewmovie] = useState({
    Movie: '',
    Year: '',
    Content: '',


  });
  const [image, setimage] = useState()
  function handleChange(e) {

    const { name, value } = e.target;
    setnewmovie(newmovie => ({ ...newmovie, [name]: value }));
    console.log(newmovie)
  }
  async function handleSubmit(e) {
    console.log("kjhgfds");
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("Image", image);
      formData.append("Movie", newmovie['Movie']);
      formData.append("Content", newmovie['Content']);
      formData.append("Year", newmovie['Year']);
      // I just removed the curly brackets from formData
      const response = await axios.post("http://django-api.eba-jmjspmms.ap-southeast-1.elasticbeanstalk.com/api/new_movie", formData);

      toast.success("update thanh cong")

    } catch (err) {
      console.error(err.message);
    }
  }

  var listtable;
  const [listProfile, setlistProfile] = useState([])
  const [index, setindex] = useState(1)
  const [end, setend] = useState()
  const getend_id = async () => {
    let callAPI = "//django-api.eba-jmjspmms.ap-southeast-1.elasticbeanstalk.com/api/Movie_list_end"

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
  const getlistProfile = async (index) => {

    let next = index.toString()
    console.log("dmm", next)
    let callAPI = "//django-api.eba-jmjspmms.ap-southeast-1.elasticbeanstalk.com/api/movie/" + next
    console.log("jfnskjad", callAPI)
    try {
      const data = await Axios.get(
        callAPI
      );

      setlistProfile(list_table(data.data));
    }
    catch (e) {
      console.log(e)
    }


  }
  function pre_id() {
    if (index == 1) {
      console.log(index)
      getlistProfile(index);
    }
    else {
      var x = index - 1;
      setindex(x)
      getlistProfile(x);
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
    
      function next_id() {
        console.log(index)
        var x = index + 1;
        setindex(x)
        console.log(index)
        getlistProfile(x)
      }
      useEffect(() => {
        getend_id()
        getlistProfile(index)

      }, []);


      const [columns, setColumns] = useState([
        "id",
        "Movie",
        "Year",
        "image",
      ])
      const refetchData = useCallback(() => getlistProfile(index), [getlistProfile, index])
      return (
        <>
          <div className="flex flex-wrap mt-4">
            <div className="relative mb-1 px-4">
              <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalLong">Create Movie</button>
              <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form name="form" >
                        <div className="form-group">
                          <label >Movie</label>
                          <input type="text" className="form-control" name="Movie" value={newmovie['Movie']} onChange={handleChange} />

                        </div>
                        <div className="form-group">
                          <label >Year</label>
                          <input type="text" className="form-control" name="Year" value={newmovie['Year']} onChange={handleChange} />

                        </div>
                        <div className="form-group">
                          <label >Content</label>
                          <input type="text" className="form-control" name="Content" value={newmovie['Content']} onChange={handleChange} />

                        </div>
                        <div className="form-group">
                          <label >image</label>
                          <input type="file" className="form-control" name="Image" onChange={(e) => setimage(e.target.files[0])}
                          />

                        </div>


                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={handleSubmit}>Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mb-12 px-4">

              <CardTable2 column={columns} data={listProfile} refetchData={refetchData} />
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
    export default Tables2;
