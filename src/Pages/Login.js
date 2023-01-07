import {  useState, useContext } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import './../Css-File/Login.css'

import UserContext from '../UserContext';
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";



export default function Login(){

    document.title = "HEiN | Login"
    
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { user, setUser } = useContext(UserContext);

    function Login(e){
        e.preventDefault()
        
        fetch("https://hein-server.domingoec.net/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            if( data.result !== null){
                // console.log(data.result.userName)
                localStorage.setItem("token", data.token)

                userDetails()
                Swal.fire({
                    title: "Login Successful",
                    icon: "success"
                })
            }
            else{
                Swal.fire({
                    title: "Login Failed",
                    icon: "error",
                    text: "Please try again"
                })
            }
        })
        // console.log(user.id)

    }
    const userDetails = () => {

		//send request to the server
		fetch("https://hein-server.domingoec.net/users/details", {
		})
		.then(response => response.json())
		.then(data => {
			// console.log(data)

			//use setUser() to update the state
            setUser({
            id: data._id,
            isAdmin: data.isAdmin,
            username: data.userName
          })
		})
	}
    return(
        (user.id !== null) ?
            <Redirect to={'/'}/>
        :
            <Container>
                <Row>
                    <Col lg={4} className="column">
                        <Form className="form" onSubmit={ (e) => Login(e)}>
                            <h1 className="text-center">Login</h1>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={email}
                                    onChange={ (e) => setEmail(e.target.value)}
                                    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={ (e) => setPassword(e.target.value)}
                                    />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="d-block mx-auto mt-4">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
    )
}