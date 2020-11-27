import React,{useState} from 'react';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import axios from "axios";
import { Button, Modal } from 'react-bootstrap'
const CardMovieDetail = (props) => {
    const { data } = props
    const [newmovie, setnewmovie] = useState({
        Movie:'',
        Year:'',
        Content:'',
    
    
      });

    const [image, setimage] = useState()
    const [inputs, setInputs]= useState(data)
    function handleChange(e){
      const {name, value}= e.target;
      let newInputs={...inputs};
      newInputs[name]= value;
      setInputs(newInputs)
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
          props.refetchData()
          toast.success("update thanh cong")
          
    } catch (err) {
          console.error(err.message);
    }
      }
    const delete_item = async (id) => {

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
                    let callAPI = "http://127.0.0.1:8000/api/movie_ID/" + id.toString()
                    try {
                        const data = axios({
                            method: "DELETE",
                            url: callAPI
                        }).then(res => {
                            props.refetchData()

                            toast.success("Xong roofi nha em yeu")
                        })

                    }
                    catch (e) {
                        console.log(e)
                    }

                }
            })
    }
    
    return (
        <>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                {data.id}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                {data.Movie}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                <div className="flex">
                    {data.Year}
                </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">
                <div className="flex">
                    {data.Image}
                </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 t-xs whitespace-no-wrap p-4">

                
                <button type="button" className="btn btn-dark mr-3" data-toggle="modal" data-target={"#exampleModalLong"+data.id} >EDIT</button>
                <div className="modal fade" id={"exampleModalLong"+data.id} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Update Movie</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            {data.id}
                                <form name="form" >
                                    <div className="form-group">
                                        <label >Movie</label>
                                        <input type="text" className="form-control" name="Movie" value={inputs.Movie} onChange={handleChange} />

                                    </div>
                                    <div className="form-group">
                                        <label >Year</label>
                                        <input type="text" className="form-control" name="Year" value={inputs.Year} onChange={handleChange} />

                                    </div>
                                    <div className="form-group">
                                        <label >Content</label>
                                        <textarea  type="text" className="form-control" name="Content" value={inputs.Content} onChange={handleChange} />

                                    </div>
                                    <div className="form-group">
                                        <label >image</label>
                                        <img src={inputs.Image} alt = "image"></img>
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
                <button type="button" className="btn btn-danger" onClick={() => delete_item(data.id)} >DELETE</button>
            </td>
        </>
    );
};

export default CardMovieDetail;