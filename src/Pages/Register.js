import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";







export default function Register(){

    document.title = "HEiN | Register"

    const [firstName , setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [invalidUserName, setInvalidUserName] = useState("")
    const [invalidEmail, setInvalidEmail] = useState("")
    const [registered, setRegistered] = useState(false)


    const[isDisable, setIsDisable] = useState(true)
    
    

    useEffect( () => {
        fetch("https://hein-server.domingoec.net/users/get-users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }    
            })
                .then(response => response.json())
		        .then(data => {
                    let invalidUsers = data.map(user => {
                        return user.userName
                    }) 
                    let invalidEmails = data.map(user => {
                        
                        return user.email
                        
                    }) 
                    setInvalidUserName(invalidUsers[invalidUsers.indexOf(userName)])
                    setInvalidEmail(invalidEmails[invalidEmails.indexOf(email)])
            })
        if(firstName !== "" && lastName !== "" && userName !== "" && email !== "" && password !== "" && (password === confirmPass) 
            && (invalidEmail === undefined && invalidUserName === undefined) ** (password <= 8)){

               

                    setIsDisable(false)
                
                
        } else{
            setIsDisable(true)
        }
    }, [firstName, lastName, userName, email, password, confirmPass, invalidUserName, invalidEmail])

    function userValid(){
        if(userName === ""){
            return 'none'
        }
        else if(invalidUserName === undefined){
            return 'is-valid'
        }
        else{
            return 'is-invalid'
        }
    }
    function emailValid(){
        if(email === ""){
            return 'none'
        }
        else if(invalidEmail === undefined){
            return 'is-valid'
        }
        else{
            return 'is-invalid'
        }
    }
    function userValidMessage(){
        
        if(userValid() === 'is-invalid'){
            return (
                <div className="invalid-feedback">Sorry, this username is already taken. Please try another.</div>
            )
        }
        
    }
    function emailValidMessage(){
        
        if(emailValid() === 'is-invalid'){
            return (
                <div className="invalid-feedback">Sorry, this email is already taken. Please try another.</div>
            )
        }
    }
    function passValid(){
        if(password.length === 0){
            return 'none'
        }
        else if(password.length >= 8){
            return 'is-valid'
        }
        else{
            return 'is-invalid'
        }
    }
    function passValidMessage(){
        if(password.length <= 8){
            return (
                <div className="invalid-feedback">Your Password is too weak!</div>
            )
        }
    }
    function confirmPassValid(){
        if(password.length === 0){
            return 'none'
        }
        else if(password === confirmPass){
            return 'is-valid'
        }
    }

    function Register(e){
        e.preventDefault()

        fetch("https://hein-server.domingoec.net/users/registration", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data !== null){
                Swal.fire({
                    title: "Registerd Successful!",
                    icon: "success",
                    text: "Please log in"
                })
                setRegistered(true)
                
            }
        })
    }
    


    return(
        (registered === true) ?
            <Redirect to={"/login"} />
        :
            <Container>
                <Row>
                    <Col lg={5} className="mx-auto mt-4">
                        <Form >
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="First Name"
                                                value={firstName}
                                                onChange={ (e) => setFirstName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control 
                                                
                                                type="text"
                                                placeholder="Last Name"
                                                value={lastName}
                                                onChange={ (e) => setLastName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                            className={userValid()}
                                            type="text" 
                                            placeholder="Enter Username" 
                                            value={userName}
                                            onChange={ (e) => setUserName(e.target.value)}
                                            />
                                        {userValidMessage()}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                            className={emailValid()}
                                            type="email" 
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={ (e) => setEmail(e.target.value)} 
                                            />
                                            {emailValidMessage()}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            className={passValid()}
                                            type="password" 
                                            placeholder="Password" 
                                            value={password}
                                            onChange={ (e) => setPassword(e.target.value)}
                                            />
                                            {passValidMessage()}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="confirm-password">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control 
                                            className={confirmPassValid()}
                                            type="password" 
                                            placeholder="Password"
                                            value={confirmPass}
                                            onChange={ (e) => setConfirmPass(e.target.value)} 
                                            />
                                    </Form.Group>
                                    
                                </Row>
                            
                            </Container>
                            <Button variant="primary" type="submit" className="d-block mx-auto mt-4" disabled={isDisable} onClick={(e) => Register(e)}>
                                        Submit
                                    </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
    )
}