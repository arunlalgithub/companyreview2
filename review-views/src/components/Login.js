import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { TextField } from "./TextField";
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Formik, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.withCredentials = true

const Login = () => {

    const navigate = useNavigate()

    // //to stop user login for direct url
    // useEffect(() => {
    //   const auth = localStorage.getItem('user')
    //   if (auth) {
    //     navigate("/")
    //   }
    // },[]);

    //const { Formik } = formik;

    const validate = Yup.object({
        email: Yup.string().email().required("Enter Email"),
        password: Yup.string().required("Enter Password")
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
                                <h5> Login</h5>
                                <p>Hello! Please enter your details for login</p> <br/>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                    }}

                                    validationSchema={validate}
                                    onSubmit={async values => {
                                        console.log('Values Formik', values)
                                        const { email, password } = values

                                        var obj = {
                                            email,
                                            password
                                        }
                                        var formData = new FormData();
                                        formData.append("email", email);
                                        formData.append("password", password);

                                        const config = {
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        }

                                        const result = await axios.post("http://localhost:5000/login", obj, config, {
                                            withCredentials : true
                                        }).catch(err => console.log(err))
                                        // result = await result.json();
                                        //if (result.data.auth) {
                                        if (result) {
                                            const notify = () => toast("Wow so easy!");
                                            localStorage.setItem("user", JSON.stringify(result.data.user))
                                            // localStorage.setItem("token", JSON.stringify(result.data.auth))
                                            navigate("/companylist")
                                        } else {
                                            alert("Please enter correct details")
                                        }
                                    }
                                    }
                                >

                                    {formik => (
                                        <div>
                                            <Form>
                                                <TextField label="" name="email" placeholder="Email" type="text" onChange={formik.handleChange} value={formik.values.email} defaultChecked={true} />
                                                <TextField label=" " name="password" placeholder="Password" type="password" onChange={formik.handleChange} value={formik.values.password} defaultChecked={true} />
                                                <br />
                                                <li> <Link to="/reset" style={{ margin: "0px", padding: "0px", fontStyle: "normal" }}> Forgot Password </Link></li>
                                                <br></br>
                                                <button className="btn btn-dark mt-3" type="submit" >
                                                    Login
                                                </button>
                                                <br /> <br />
                                                
                                                
                                                <p style={{ fontStyle: "normal" }}>  I don't have an account on Review & Rate  </p>

                                                <Link to="/signup"> Register Now </Link>

                                            </Form>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>

    )
}

export default Login
