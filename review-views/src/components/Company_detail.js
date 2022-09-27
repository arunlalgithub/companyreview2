import { React, useCallback } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router";
import Rating from '@mui/material/Rating';
import axios from "axios"
import { useEventCallback, useIsFocusVisible } from "@mui/material";
import Nav from "./Nav";
import moment from 'moment';
axios.defaults.withCredentials = true

const ComapnyDetail = () => {
     const [company, setCompany] = useState({})
     const [comments, setComments] = useState([])
     const [visible, setVisible] = useState(3)
     const port = 'http://localhost:5000';

     const auth = localStorage.getItem('user');
     let { id } = useParams();
     let data = useLocation();
     const len = comments.length
     const showMoreItems = () => {
          setVisible((prevValue) => prevValue + len);
     }

     // var comment ={};
     const getCompany = useCallback(async () => {

          let url = `http://localhost:5000/company/${id}`; //template literals
          axios.request({
               method: 'get',
               url: url,
               withCredentials: true
          }).then((response) => {
               const newresult = response.data
               console.log(newresult)
               console.log('Result comany :', newresult?.company._id)
               setCompany(newresult?.company)
               setComments([...newresult?.comments])
          })
               .catch(err => console.log(err))

     }, [id]) // every time id changed, new book will be loaded

     useEffect(() => {
          getCompany();
     }, [getCompany]) // useEffect will run once and when id changes

     return (
          <>
               <Nav />
               <br /> <br />
               <div style={{ background: '#FFFFFF', boxShadow: '0px 2px 25px rgba(0, 0, 0, 0.1)', width: '1030px', marginLeft: '190px', marginRight: '90px', paddingTop: "10px" }}>
                    <div className="" style={{ border: "1px solid #ECECEC", marginLeft: "10px", marginBottom: "9px", width: "900px", borderRadius: "10px", display: "flex", alignItems: "center" }}>
                         <div className="article" style={{ paddingLeft: "7px", paddingTop: "0px", marginLeft: '25px' }}>
                              <img alt="img not found" className="cmpimg" src={`${port}${company.cmplogo}`} />
                         </div>

                         <div className="article article2" style={{ marginTop: "3px", paddingLeft: "5px", marginLeft: '10px' }}>
                              <p className="elemstyle" style={{ fontSize: "10px" }}>  Founded {company.cdate}</p>
                              <h3 className="elemstyle" style={{ fontWeight: " bolder", }}> {company.cname} </h3>
                              <p className="elemstyle" style={{ fontSize: "10px" }}> {company.caddress} </p>
                              <p className="elemstyle" style={{ fontSize: "10px" }}>
                                   <b style={{ paddingBottom: '60px' }}>{company.noOfStars}</b>  <Rating
                                        value={`${company.noOfStars}`}
                                        max={5}
                                        onChange={(value) => console.log(`Rated with value ${value}`)} readOnly
                                   /> &nbsp;&nbsp;&nbsp;  {len} Reviews
                              </p>
                         </div>

                         <Link className="btn btn-primary btn-sm active navbar-right pr-5" role="button" aria-pressed="true" to={`/addreview/${company._id}`} style={{ marginLeft: "190px", marginRight: "10px", marginTop: "10px", backgroundColor: "#7327de" }}> + Add Review</Link>
                    </div>

                    {
                         comments.length > 0 ? comments.slice(0, visible).map((item, index) =>
                              <div style={{ display: 'flex', marginTop: '30px', alignItems: "center" }}>
                                   <div style={{ width: '5%' }}>
                                        <img alt="img not found" className="detail_navimg"
                                             style={{ width: "50px", height: '50px', borderRadius: '50px', justifyContent: 'center', alignItems: 'initial' }}
                                             src={`${port}${item.user.profilepic}`} />
                                   </div>
                                   <div style={{ width: '80%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                             <div>
                                                  <div style={{ paddingLeft: '30px', fontWeight: " bolder" }}>  {item.user.name}</div>
                                                  <div style={{ paddingLeft: '30px', fontSize: "10px" }}>
                                                       {moment(item.date).format('YYYY-MM-DD HH:MM')}
                                                  </div>

                                             </div>
                                             <div>
                                                  <p className="elemstyle">
                                                       <Rating
                                                            value={item.noOfStars}
                                                            max={5}
                                                            onChange={(value) => console.log(`Rated with value ${value}`)} readOnly
                                                       /> &nbsp;&nbsp;&nbsp;  </p>
                                             </div>
                                        </div>
                                        <div style={{ marginTop: "15px", paddingLeft: '30px', fontSize: "11px" }}>
                                             {item.comment}
                                             {/* <p> Hello...</p>   
                                              <p> {item.user}</p> */}
                                        </div>
                                   </div>


                              </div>

                         ) : <h5> No Comment Found </h5>

                    }

                    <br /> <br />

                    <button type="button" class="btn btn-link" onClick={showMoreItems} style={{ display: "block", marginLeft: "410px", marginRight: "auto", color: 'black', fontSize: '12px', fontWeight: "20px" }}> <b><u> See all</u></b></button>
                    <p style={{ display: "block", marginLeft: "20px", marginRight: "auto", paddingBottom: "90px" }}><Link to="/companylist"><b>Back</b></Link></p>
               </div>
          </>

     )

}

export default ComapnyDetail
