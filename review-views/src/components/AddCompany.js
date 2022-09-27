import React from "react";
import axios from "axios"
import * as Yup from 'yup';
import { FaStar } from "react-icons/fa";
import { TextField } from "./TextField";
import { unregister } from "./interceptor";
import Rating from '@mui/material/Rating';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from 'formik';
axios.defaults.withCredentials = true

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"

};

const AddCompany = () => {
  const navigate = useNavigate()
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

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

  const [cmplogo, setCmpLogo] = useState("");

  const validate = Yup.object({
    cname: Yup.string()
      // .max(15, 'Must be 15 character or less')
      .required('Company Name Is Required'),

    caddress: Yup.string()
      //.max(150, 'Must be 50 character or less')
      .required('Company Address Is Required'),

    city: Yup.string()
      //.max(50, 'Must be 50 character or less')
      .required('Company City Is Required'),

    cdate: Yup
      .date('Date Is Invalid')
      .required('Date Is Required'),

  })

  const setimgfile = (e) => {
    setCmpLogo(e.target.files[0])
    console.log(' set file :', e.target.files[0])
  }

  return (
    <div className="login" style={{}}>
      <section className="vh-20">
        <div className="container py-1 h-10">
          <div className="row d-flex align-items-center  h-10">
            <div className="col-lg-6 col-md-2 col-xl-1 leftside" style={{}}>
              <h6>Welcome</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <img src="./group.png" className="" alt="Image" />
            </div>
            <div className="col-lg-6 col-md-3 col-xl-1 rightside" >
              <div className="rightform">
                {/* <img src="./graffersidlogob.png" alt="Image not found" style={{ width: "300px", height: "70px", borderRadius: "50px", marginBottom: "40px",boxShadow: '4px 3px 7px 10px lightblue' }} /> */}
                <img src="./loginimg1.png" className="lftimg" alt="Image" />
                <img src="./loginimg2.png" className="rgtimg" alt="Image" /> <br /> <br />
                <p className="msg"> Add Company Details </p>
                <br />

                <Formik
                  initialValues={{
                    cname: '',
                    caddress: '',
                    city: '',
                    cdate: '',
                    // clogo: '',

                  }}
                  validationSchema={validate}
                  onSubmit={values => {
                    console.log('Values Formik', values)
                    const cname = values.cname
                    const caddress = values.caddress
                    const city = values.city
                    const cdate = values.cdate

                    const userId = JSON.parse(localStorage.getItem('user'))._id;
                    const role = JSON.parse(localStorage.getItem('user')).role;
                    console.log('***********', role)
                    var formData = new FormData();
                    formData.append("cname", values.cname);
                    formData.append("caddress", values.caddress);
                    formData.append("city", values.city);
                    formData.append("cdate", values.cdate);
                    formData.append("userId", userId);
                    formData.append("cmplogo", cmplogo);
                    formData.append("noOfStars", currentValue);
                    formData.append("role", role);
                    const config = {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        //authentication: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                      }
                    }

                
                    const result = axios.post("http://localhost:5000/addcompany", formData, config, {
                      withCredentials : true
                  }).catch(err => console.log(err))
                    console.log("Result :", result)
                    //result = result.json()
                    navigate("/companylist")
                    console.warn(result)
                  }}
                >
                  {formik => (
                    <div>
                      <Form>
                        <TextField  placeholder="Company Name" name="cname" type="text" onChange={formik.handleChange} value={formik.values.cname} />
                        <TextField placeholder="Company Address" name="caddress" type="text" onChange={formik.handleChange} value={formik.values.caddress} />
                        <TextField placeholder="Company City" name="city" type="text" onChange={formik.handleChange} value={formik.values.city} />
                        <TextField placeholder="Founded Date" name="cdate" type="Date" onChange={formik.handleChange} value={formik.values.cdate} />
                        <TextField placeholder="Company Picture" type="file" onChange={setimgfile} name='cmplogo' required />

                        <p style={{ marginLeft : 'auto', marginRight: '210px' }}> Company Ratings </p>
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
                        <button className="btn btn-dark mt-3" type="submit">
                          Register
                        </button>
                      </Form>
                      
                      <p style={{ marginTop : '10px', textAlign : 'left'}}><Link to="/companylist"> Back </Link></p>
                    </div>
                  )}
                </Formik>
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
  },
};

export default AddCompany
