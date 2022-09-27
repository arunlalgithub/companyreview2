import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
//app.use(express.static(path.join(__dirname, '..', 'uploads'))); 

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const port = 'http://localhost:5000';

    const logout = async (dispatch) => {
        try {
            await axios.get('http://localhost:5000/logout')
            localStorage.clear();
            //dispatch({ type : type.USER_LOGOUT })
        } catch (error) {
            console.log(error)
        }

        navigate('/')
    }

    return (
        <div>

            <nav className="navbar" style={{ hieght: "10px", boxShadow: '10px 10px 30px 5px #F5F5F5' }}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#" style={{ borderRadius: "50%" }}>
                            <img src={process.env.PUBLIC_URL + "/navleft.png"} alt="img" style={{ width: "180px", height: "40px", border: "4px solid transparent", borderRadius: "90px" }} />
                        </a>
                    </div>

                    {/* <ul className="nav navbar-nav">
                        <li  style={{marginTop : "20px" }}>                      
                        Review <b style={{color: "#8000ff" }}>&</b><b>Rate</b></li>
                    </ul> */}
                    <ul class="nav navbar-nav navbar-right">
                        <li className="h2 text-secondary mt-40 pt-10">
                            {/* <img src="./logout.jpg" onClick={logout} alt="Image not found" style={{ width:"90px", height:"50px"}}/> */}
                            <Link onClick={logout} to="/" style={{ marginTop: "4px", fontStyle: "initial", fontSize: "15px" }}> <u>logout</u> </Link>
                        </li>
                        <li style={{}}>
                            <img alt="img not found" className="navimg2" src={`${port}${JSON.parse(auth).profilepic}`} />
                        </li>

                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Nav
