import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Logout from "../Pages/Logout";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import Admin from "../Pages/Admin";
import ProductsView from "./ProductsView";
import Cart from "./Cart";
import ErrorPage from "../Pages/ErrorPage";
import Transaction from "../Pages/Transaction";
import Settings from "../Pages/Settings";
import Settings2 from "../Pages/Settings2";
import Footer from "./Footer";


export default function Routes(){

    const {user} = useContext(UserContext)
    const {branding} = useContext(UserContext)
    const [isLogin, setIsLogin] = useState()

        // let path = window.location.pathname
        // let pathSplit = path.split("/")
        // if(pathSplit[1] === "prada" || pathSplit[1] === "versace" || pathSplit[1] === "ralph-lauren" || pathSplit[1] === "balenciaga" ){
        //     setBranding({
        //         brand: pathSplit[1],
        //         category: pathSplit[2]
        //     })
        // }
        // else{
        //     setBranding({
        //         brand: "all",
        //         category: "all"
        //     })
        // }


    let userLogIn = (user.id !== null);
    useEffect(() => {
        if(user.id !== null){
            setIsLogin(true)
        } else{
            setIsLogin(false)
        }
    }, [isLogin, user])

    console.log(branding.category)

    return(
        <BrowserRouter>
            <AppNavbar/>
                <Container fluid className="">
                    <Switch>
                        
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />

                        <Route exact path={'/transaction-details'} component={Transaction}/>
                        <Route exact path={`/cart`} component={Cart}/>
                        <Route exact path={`/balenciaga/${branding.category}`} component={ProductsView} />
                        <Route exact path={`/prada/${branding.category}`} component={ProductsView} />
                        <Route exact path={`/ralph-lauren/${branding.category}`} component={ProductsView} />
                        <Route exact path={`/versace/${branding.category}`} component={ProductsView} />
                        <Route exact path="/register" component={Register} >
                            {isLogin ? <Redirect to="/home"/> : <Register/>}
                        </Route>
                        <Route exact path="/login" component={Login} >
                            {isLogin ? <Redirect to="/home"/> : <Login/>}
                        </Route>
                        <Route exact path="/logout" component={Logout}/>
                        <Route exact path={"/settings/personal-info/"+user.id} component={Settings}/>
                        <Route exact path={"/settings/change-password/"+user.id} component={Settings2}/>
                        <Route exact path="/admin-dashboard" component={Admin}>
                            {(user.isAdmin !== true) ?<Redirect to="/"/> : <Admin/>}
                        </Route>
                        <Route component={ErrorPage}/>
                    </Switch>
                </Container>
                <Footer/>
        </BrowserRouter>
    )
}