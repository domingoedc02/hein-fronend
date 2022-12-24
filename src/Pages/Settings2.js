import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import UserContext from "../UserContext";
import '../Css-File/Settings.css'
import Swal from "sweetalert2";





export default function Settings2(){
    const {user} = useContext(UserContext)
    const [verifyPassword, setVerifyPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [updatePassword, setUpdatePassword] = useState("")
    const [warningMessage, setWarwningMessage] = useState(false)
    const [warningMessage2, setWarwningMessage2] = useState(false)
    const [isDisable, setIsDisable] = useState(false)


    useEffect(() => {
        if(updatePassword !== verifyPassword){
            setWarwningMessage(true)
        } else{
            setWarwningMessage(false)
        }
        if(updatePassword.length < 8){
            setWarwningMessage2(true)
        } else{
            setWarwningMessage2(false)
        }
        if(updatePassword === verifyPassword && updatePassword.length > 8){
            setIsDisable(false)
        } else{
            setIsDisable(true)
        }
    }, [verifyPassword, updatePassword])


    function WarningMessage(){
        return <Form.Text className="warn">New password and confirm password dosn't match<br/></Form.Text>
    }
    function WarningMessage2(){
        return <Form.Text className="warn">Password at least 8 letters</Form.Text>
    }


    const UpdatePassword =() => {
        console.log(user.id)
        if(currentPassword === user.password){
            
            fetch('https://hein-server.herokuapp.com/users/update-user', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: user.id,
                password: updatePassword
            })
        })
        .then(response => response.json())
            // if(data === updates){
                Swal.fire({
                    title: "Change Password Successfully",
                    icon: "success",
                    timer: 2000
                })
                setTimeout(function() {
                    window.location.href = "http://localhost:3000/home"
                }, 1000);
                
        } else{
             Swal.fire({
                    title: "Failed",
                    icon: "error",
                    text: "Worng current password. Please try again",
                    timer: 2000
                })
        }
    }


    return(
        <>
            <Container >
                <Row>
                    <Col lg="3" md="2" sm="2" xs="4">
                        <Button className="button" href={"http://localhost:3000/settings/personal-info/"+user.id}>Personal Info</Button>
                        <Button className="button" href={"http://localhost:3000/settings/change-password/"+user.id}>Change Password</Button>
                        
                    </Col >
                    {/* Personal Info */}
                    <Col lg="9" md="10" sm="10" xs="8" style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
                        <h1 className="mt-3" style={{textAlign: "center"}}>Change Password</h1>
                        <Form className="form">
                            <Form.Group className="mb-3">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" placeholder={"Current Password"} onChange={(e) => setCurrentPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder={"New Password"} onChange={(e) => setUpdatePassword(e.target.value)}  />
                                {warningMessage ? WarningMessage() : <></>}
                                {warningMessage2 ? WarningMessage2() : <></>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder={"Confirm Password"} onChange={(e) => setVerifyPassword(e.target.value)} />
                                {warningMessage ? WarningMessage() : <></>}
                            </Form.Group>
                            <Button className="changePassBtn" disabled={isDisable} onClick={() => UpdatePassword()}>Change Password</Button>
                        </Form>
                        
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}