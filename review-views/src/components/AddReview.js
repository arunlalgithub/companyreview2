import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { FaStar } from "react-icons/fa";
import Rating from '@mui/material/Rating';
import { MultilineInput } from 'react-input-multiline';
axios.defaults.withCredentials = true
//import pic1 from "";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"

};

const AddReview = () => {

  const [comment, setComment] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  let location = useLocation();
  let { id } = useParams();
  const company_id = id

  //let company_id = data.state.id
  const user_id = JSON.parse(localStorage.getItem('user'))._id;

  //   useEffect(() => {
  //     let company_id = data.state.id
  //     const userId = JSON.parse(localStorage.getItem('user'))._id;
  //     console.log("company_id :", company_id)
  //     console.log("userId :", userId)
  //     }, [])

  const addCompanyReview = async () => {
    console.warn(comment)
    if (!comment) {
      setError(true)
      return false
    }

    const noOfStars = currentValue
    var obj = {
      user_id,
      company_id,
      comment,
      noOfStars
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const result = axios.post("http://localhost:5000/addreview", obj, config,{
      withCredentials : true
    }).catch((err) => console.log(err))
    //result = await result.json()s
    navigate(`/companydetail/${company_id}`)
    console.warn(result)
  }

  return (
    <div className="login" style={{}}>
    <section className="vh-20">
      <div className="container py-1 h-10">
        <div className="row d-flex align-items-center  h-10">
          <div className="col-lg-6 col-md-2 col-xl-1 leftside" style={{}}>
            <h6>Welcome</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <img src={process.env.PUBLIC_URL + "/group.png"} className="" alt="Image" />
          </div>
          <div className="col-lg-6 col-md-3 col-xl-1 rightside" >
            <div className="rightform">
              {/* <img src="./graffersidlogob.png" alt="Image not found" style={{ width: "300px", height: "70px", borderRadius: "50px", marginBottom: "40px",boxShadow: '4px 3px 7px 10px lightblue' }} /> */}
              <img src={process.env.PUBLIC_URL + "/loginimg1.png"} className="lftimg" alt="Image" />
              <img src={process.env.PUBLIC_URL + "/loginimg2.png"} className="rgtimg" alt="Image" /> 
                
                <p style={{ marginLeft: 'auto', marginRight: '10px', marginTop: '60px' }}> Add Company Review And Ratings </p> <br />
                <div className="form-outline mb-4" style={{}}>
                  <textarea class="form-control rounded-0" onChange={(e) => setComment(e.target.value)} rows="7" required />

                  <p style={{ marginLeft: 'auto', marginRight: '210px', marginTop: '10px' }}> Company Ratings </p>
                  <div style={styles.stars}>
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          size={24}
                          onClick={() => handleClick(index + 1)}
                          onMouseOver={() => handleMouseOver(index + 1)}
                          onMouseLeave={handleMouseLeave}
                          color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                          style={{
                            marginRight: 10,
                            cursor: "pointer"
                          }}
                        />
                      )
                    })}
                  </div>
                </div><br />
                <div className="d-flex justify-content-around align-items-center mb-4">
                </div>
                <button className="btn btn-dark mt-3" onClick={addCompanyReview} type="submit">
                  Add Review
                </button>
                <br /><br />
                <p style={{ marginTop: '10px', textAlign: 'left' }}><Link to="/companylist"> Back </Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

const styles = {
  stars: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "5px",
  }

};

export default AddReview
