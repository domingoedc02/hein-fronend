import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Logout from "../Pages/Logout";
import { useContext } from "react";
import UserContext from "../UserContext";
import Admin from "../Pages/Admin";
import ProductsView from "./ProductsView";
import Cart from "./Cart";
import ErrorPage from "../Pages/ErrorPage";
import Transaction from "../Pages/Transaction";


export default function Routes(){

    const {user} = useContext(UserContext)
    const {branding} = useContext(UserContext)

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

    return(
        <BrowserRouter>
            <AppNavbar/>
                <Container fluid className="">
                    <Switch>
                        
                        <Route exact path="/" component={Home} 
                            
                        />
                        <Route exact path={'/transaction-details'} component={Transaction}/>
                        <Route exact path={`/cart`} component={Cart}/>
                        <Route exact path={`/balenciaga/${branding.category}`} component={ProductsView} />
                        <Route exact path={`/prada/${branding.category}`} component={ProductsView} />
                        <Route exact path={`/ralph-lauren/${branding.category}`} component={ProductsView} />
                        <Route exact path={`/versace/${branding.category}`} component={ProductsView} />
                        <Route exact path="/register" component={Register} >
                            {userLogIn ? <Redirect to="/"/> : <Register/>}
                        </Route>
                        <Route exact path="/login" component={Login} >
                            {userLogIn ? <Redirect to="/"/> : <Login/>}
                        </Route>
                        <Route exact path="/logout" component={Logout}/>
                        <Route exact path="/admin-dashboard" component={Admin}>
                            {(user.isAdmin !== true) ?<Redirect to="/"/> : <Admin/>}
                        </Route>
                        <Route component={ErrorPage}/>
                    </Switch>
                </Container>
        </BrowserRouter>
    )
}