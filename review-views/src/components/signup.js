import React from "react";
import axios from "axios"
import * as Yup from 'yup';
import { TextField } from "./TextField";
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from 'formik';
axios.defaults.withCredentials = true

const Signup = () => {
  const navigate = useNavigate();
  const [profilepic, setProfilePic] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [show, setShow] = useState(false);

  //for hide signup  menu, if already 
  // useEffect(() =>{
  //     const auth = localStorage.getItem('user');
  //     if(auth){
  //         navigate('/')
  //     }
  // }) 

  const setimgfile = (e) => {
    setProfilePic(e.target.files[0])
    console.log(' set file :', e.target.files[0])
  }
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const PHONE_NO_REGEX = /^[0-9\- ]{8,14}$/
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validate = Yup.object({
    name: Yup.string()
      //.max(15, 'Must be 3 character or less')
      .required('Name Is Required'),

    email: Yup.string()
      .email('Email Is Invalid')
      .required('Email Is Required'),

    password: Yup.string()
      .min(6, 'Password Must Be Atleast 6 Charachter')
      .required('Password Is Required'),

    phone: Yup.string().required("Enter Mobile Number")
      .matches(phoneRegExp, 'Mobile Number Is Not Valid')
      .min(10, "To Short")
      .max(10, "To Long"),

    city: Yup.string()
      .required('City Is Required'),

    state: Yup.string()
      .required(' State Is Required'),
  })

  return (
    <div className="login signuppg" style={{}}>
      <section className="vh-20">
        <div className="container py-1 h-10">
          <div className="row d-flex align-items-center  h-10">
            <div className="col-lg-6 col-md-2 col-xl-1 leftside" style={{}}>
              <h6>Welcome</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <img src="./group.png" className="" alt="Image" />
            </div>
            <div className="col-lg-6 col-md-3 col-xl-1 rightside" style={{ marginTop: "40px", marginBottom: "30px" }}>
              <div className="rightform">
                {/* <img src="./graffersidlogob.png" alt="Image not found" style={{ width: "300px", height: "70px", borderRadius: "50px", marginBottom: "40px",boxShadow: '4px 3px 7px 10px lightblue' }} /> */}
                <img src="./loginimg1.png" className="lftimg" alt="Image" />
                <img src="./loginimg2.png" className="rgtimg" alt="Image" />
                <h5> Sign Up</h5>

                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    city: '',
                    state: '',
                  }}
                  validationSchema={validate}
                  onSubmit={async values => {
                    console.log('Values Formik', values)
                    const { name, email, password, phone, city, state } = values
                    var formData = new FormData();
                    formData.append("name", name);
                    formData.append("email", email);
                    formData.append("password", password);
                    formData.append("phone", phone);
                    formData.append("city", city);
                    formData.append("state", state);
                    formData.append("profilepic", profilepic);

                    const config = {
                      headers: {
                        "Content-Type": "multipart/form-data"
                      }
                    }

                    const result = await axios.post("http://localhost:5000/signup", formData, config, {
                      withCredentials: true
                    })
                      .then(data => {
                        if (data.error) {
                          //M.toast({html : data.error, classes: "#c62828 red darken-3"})
                        } else {
                          //M.toast({html : data.message, classes: "#43a047 green darken-1"})
                          navigate("/")
                        }
                      }).catch(err => {
                        console.log(err)
                      })

                  }}
                >
                  {formik => (
                    <div>
                      <Form encType="multipart/form-data" style={{ marginTop: "10px" }}>
                        <TextField placeholder="Enter Name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} defaultChecked={true} />
                        <TextField placeholder="Enter Name" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} defaultChecked={true} />
                        {
                          show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            Email already present
                          </Alert> : ""
                        }
                        <TextField placeholder="Enter Password" name="password" type="text" onChange={formik.handleChange} value={formik.values.password} defaultChecked={true} />
                        <TextField placeholder="Enter Mobile No" name="phone" type="text" onChange={formik.handleChange} value={formik.values.phone} defaultChecked={true} />
                        <TextField placeholder="Enter City" name="city" type="text" onChange={formik.handleChange} value={formik.values.city} defaultChecked={true} />
                        <TextField placeholder="Enter State" name="state" type="test" onChange={formik.handleChange} value={formik.values.state} defaultChecked={true} />
                        <TextField placeholder="Select Profile Pic" type="file" onChange={setimgfile} name='profilepic' required />

                        <button className="btn btn-dark mt-3" type="submit">
                          Sign Up
                        </button>
                      </Form>
                    </div>
                  )}
                </Formik>

                <hr />
                <p> I already have an account: <Link to="/">Login</Link> </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup