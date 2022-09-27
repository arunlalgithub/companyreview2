import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import { TextField } from "./TextField";
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Formik, Form, ErrorMessage } from 'formik';
axios.defaults.withCredentials = true


const Login = () => {

    const navigate = useNavigate()
    const { token } = useParams()
    console.log('***toekn :', token)

    const validate = Yup.object({
        password: Yup.string().required("Enter Password")
    })

    return (
        <div className="login" style={{}}>
            <section className="vh-60">
                <div className="container py-1 h-70">
                    <div className="row d-flex align-items-center  h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4">
                        <img src="https://about.me/cdn-cgi/image/q=80,dpr=1,f=auto,fit=cover,w=1200,h=630,gravity=auto/https://assets.about.me/background/users/g/r/a/graffersid_1595412391_311.jpg"
                                      className="img-fluid" alt="Phone image" style={{ width: "500px", height: "550px" }} />
                            {/* <img src="./graffer1.png" alt=".." style={{ width: "500px", height: "550px" }} /> */}
                        </div>

                        <div className="col-md-7 col-lg-5 col-xl-7 ">
                            <img src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png" alt=".." style={{ width: "300px", height: "19    0px", borderRadius: "50px", marginBottom: "40px" }} />

                            <Formik
                                initialValues={{
                                    password: '',
                                }}

                                validationSchema={validate}
                                onSubmit={async values => {
                                    console.log('Values Formik', values)
                                    const { password } = values

                                    var obj = {
                                        password,
                                        token
                                    }

                                    const config = {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }

                                    const result = await axios.post("http://localhost:5000/new-password", obj, config,{
                                        withCredentials : true
                                    })
                                        .then(data => {
                                            console.log(data)
                                            if (data.error) {
                                                //M.toast({html : data.error, classes: "#c62828 red darken-3"})
                                            } else {
                                                alert("Password Updated Succesfully!!!")
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
                                    <div style={{ width: "400px", paddingTop: "20px" }}>
                                        <Form>

                                            <TextField label="Enter New Password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} defaultChecked={true} />
                                            <br />
                                            <button className="btn btn-dark mt-3" type="submit" style={{ marginTop: "5px", marginLeft: "70px", width: "140px", height: "40px", backgroundColor: "#3fe8e0", fontSize: "15px", fontWeight: "", borderRadius: "50px" }}>
                                                Update Password
                                            </button>
                                            <br />  <br />
                                        </Form>
                                    </div>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
