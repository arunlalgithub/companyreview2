import React from "react";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import axios from 'axios'
axios.defaults.withCredentials = true

const CompanyList = () => {

    const [company, setcompany] = useState("")
    const [value, setValue] = React.useState(1);
    const port = 'http://localhost:5000';

    useEffect(() => {
        getCompany();
    }, [])

    const auth = localStorage.getItem('user');
    console.log('UserRole ', JSON.parse(auth).role)

    var formData = new FormData();
    formData.append("userRole", JSON.parse(auth).role);
    console.log('*** Role :', JSON.parse(auth).role)
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //   const result = axios.post("http://localhost:5000/addreview",formData, config, {
    //       withCredentials  : true
    //   });


    const getCompany = async () => {

        const res = axios.get("http://localhost:5000/companies", formData, config, {
            withCredentials: true
        })
            .then((response) => {
                const data = response.data
                const result = data.sort((a, b) => a.cname.localeCompare(b.cname))
                setcompany(result)
            })
            .catch((err) => console.log(err))

    }


    const searchHandle = async (event) => {
        console.warn(event.target.value);
        console.log(event.target.value)
        let key = event.target.value;
        if (key) {
            // let result = await fetch(`http://localhost:5000/search/${key}`, {
            //     // headers: {
            //     //     authentication: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            //     // }
            // });
            const result = axios.get(`http://localhost:5000/search/${key}`, {
                withCredentials: true
            }).then((response) => {
                const data = response.data
                const result = data.sort((a, b) => a.cname.localeCompare(b.cname))
                if (result) {
                    setcompany(result)
                }
                else {
                    getCompany();
                }
            })
                .catch((err) => console.log(err))
        }
    }


    const sortDescending = async () => {
        //  debugger
        if (value === 1) {
            setValue(0)
            const res = axios.get("http://localhost:5000/companies", {
                withCredentials: true
            }).then((response) => {
                const data = response.data
                const result = data.sort((a, b) => b.cname.localeCompare(a.cname))
                setcompany(result)
            }).catch((err) => console.log(err))
        } else {
            console.log('else :', value);
            setValue(1)
            getCompany()
        }
    }

    return (
        <>
            <Nav />
            <hr style={{ paddingTop: "0px" }} />
            <div className="container h-80">

                <div className="">
                    <div className="">
                        <p className="" style={{ marginLeft: "120px", fontSize: "10px", width: "60px" }}> Select City</p>
                        <p style={{ float: 'right', position: 'relativ', fontSize: "15px", width: "160px", paddingRight: '150px' }}> sort</p>
                        <img src={process.env.PUBLIC_URL + "/sort.png"} onClick={sortDescending} alt="img" style={{ marginTop: '20px', float: 'right', position: 'relative', margin: '20px -23px 15px' }} />
                        <input className="search-product-box" type="text" placeholder="Enter city name" onChange={searchHandle} />

                        <Link className="btn btn-dark cmplistbtn navbar-right" style={{ marginRight: "38px" }} role="button" aria-pressed="true" to="/addcompany">
                            + Add Company
                        </Link>

                    </div>  <hr />
                </div>
                <p style={{ marginLeft: "120px", fontSize: "10px" }}> Result Found: {company.length}</p>
                {
                    // <div className="article-container" style={{ border: "2px solid black", margin: "190px", marginTop: "12px" ,backgroundColor: "white" }}>

                    company.length > 0 ? company.map((item, index) =>  
                         
                   
                        <Link to={`/companydetail/${item._id}`}>
                            <div className="companylist" style={{
                                marginLeft: "120px", marginBottom: "10px", width: "900px",
                                display: "flex", alignItems: "center", background: '#FFFFFF', boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.1)', borderRadius: 'border-radius: 10px'
                            }}>
                                <div className="article" style={{ paddingLeft: "7px", marginTop: "0px" }}>
                                    <img alt="img not found" className="cmpimg" src={`${port}${item.cmplogo}`} />
                                </div>

                                <div className="article article2" style={{ marginTop: "3px", paddingLeft: "11px", color: "black" }}>
                                    <p className="elemstyle" style={{ fontSize: "10px" }}>  Founded {item.cdate} {item.id}</p>
                                    <h3 className="elemstyle" style={{ fontWeight: "bold" }}> {item.cname} </h3>
                                    <p className="elemstyle" style={{ fontSize: "10px" }}> {item.caddress} </p>
                                    <p className="elemstyle" style={{ textDecoration: 'none' }}>

                                        {item.noOfStars}  <Rating
                                            value={item.noOfStars}
                                            max={5}
                                            onChange={(value) => console.log(`Rated with value ${value}`)} readOnly
                                        /> &nbsp;&nbsp;&nbsp;  {item.commentlength} Reviewes
                                    </p>

                                </div>

                                <div style={{}} className="arrowimg">
                                    <img src="./next.png" alt="img" style={{ textAlign: 'right', opacity: '0.6' }} />
                                </div>

                            </div>   

                        </Link>
                        
                    ) : <h5> No Comapny Found </h5> 
                }
            </div>
            <br /> <br /> <br /> <br />
        </>
    )
}

export default CompanyList


