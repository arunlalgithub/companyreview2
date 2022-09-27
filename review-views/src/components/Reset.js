import React from "react";
import axios from "axios"
import * as Yup from 'yup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { TextField } from "./TextField";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik, Form, ErrorMessage } from 'formik';
import M from 'materialize-css'
axios.defaults.withCredentials = true

const Reset = () => {

    const navigate = useNavigate()
    const validate = Yup.object({
        email: Yup.string().email().required("Enter Email"),
    })

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
                            <img src="./loginimg2.png" className="rgtimg" alt="Image" />
                    
                            <Formik
                                initialValues={{
                                    email: ''
                                }}

                                validationSchema={validate}
                                onSubmit={async values => {
                                    console.log('Values Formik', values)
                                    const { email } = values
                                    console.log(email)
                                    var obj = {
                                        email
                                    }
                                    const config = {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }

                                    const result = await axios.post("http://localhost:5000/reset-password", obj, config,{
                                        withCredentials : true
                                    })
                                        .then(data => {
                                            console.log(data)
                                            if (data.error) {
                                                //M.toast({html : data.error, classes: "#c62828 red darken-3"})
                                            } else {
                                                alert("check your email")
                                                //M.toast({html : data.message, classes: "#43a047 green darken-1"})
                                                navigate("/")
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                        })
                                }
                                }
                            >
                                {formik => (
                                    <div style={{ width: "300px", paddingTop: "20px", marginTop : "90px", marginLeft : "35px" }}>
                                        <Form>
                                            <TextField  placeholder="Please Enter Email Id" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} defaultChecked={true} /> <br />
                                            <button className="btn btn-dark mt-3" type="submit" >
                                                    Reset Password
                                                </button>
                                            <br />
                                        </Form>
                                         <br/><br/>
                                        <p style={{}}>"The email with further instructions was sent to the submitted email address. If you don’t receive a message in 5 minutes, check the junk folder. 
                                            If you are still experiencing any problems, contact support at hr@graffersid.com" </p>
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

export default Reset 
