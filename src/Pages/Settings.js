import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import UserContext from "../UserContext";
import '../Css-File/Settings.css'
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";





export default function Settings(){
    const {user} = useContext(UserContext)
    const [isDisabled, setIsDisabled] = useState(true)
    const [editBtnView, setEditBtnView] = useState(false)
    const [updateBtnView, setUpdateBtnView] = useState(true)
    const [updateFirstName, setUpdateFirstName] = useState("")
    const [updateLastName, setUpdateLastName] = useState("")
    const [updateEmail, setUpdateEmail] = useState("")
    const [updateUsername, setUpdateUsername] = useState("")
    const [updatePassword, setUpdatePassword] = useState("")
    const [invalidUsername, setInvalidUsername] = useState("")
    const [invalidEmail, setInvalidEmail] = useState("")
    const [emailWarn, setEmailWarn] = useState("valid")
    const [usernameWarn, setUsernameWarn] = useState("valid")
    const [personalInfoBtnShow, setPersonalInfoBtnShow] = useState(true)
    const [changePassBtnShow, setChangePassBtnShow] = useState(false)


    const editButton = () =>{
        setIsDisabled(false)
        setEditBtnView(true)
        setUpdateBtnView(false)
        setUpdateFirstName(user.firstName)
        setUpdateLastName(user.lastName)
        setUpdateUsername(user.username)
        setUpdateEmail(user.email)
        setUpdatePassword(user.password)
    }

    const updateButton = () =>{
        setEditBtnView(false)
        setIsDisabled(true)
        setUpdateBtnView(true)
        UpdateInfo()
    }

    useEffect(() => {
        fetch("https://hein-server.herokuapp.com/users/get-users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }    
            })
                .then(response => response.json())
		        .then(data => {
                    let invalidUser = data.map(temp => {
                        // console.log(user.username !== temp.userName)
                        if(user.username !== temp.userName){
                            return temp.userName
                        } else{
                            return "origin"
                        }
                    })
                    let invalidEmails = data.map(temp => {
                        // console.log(user.username !== temp.userName)
                        if(user.email !== temp.email){
                            return temp.email
                        } else{
                            return "origin"
                        }
                    })
                    console.log(invalidEmails)
                    setInvalidUsername(invalidUser[invalidUser.indexOf(updateUsername)])
                    setInvalidEmail(invalidEmails[invalidEmails.indexOf(updateEmail)])
                    console.log(invalidEmail)
                    
            })
    }, [updateUsername, updateEmail])

    useEffect(() => {
        if(invalidEmail !== undefined){
            setEmailWarn("invalid")
        }
        else{
            setEmailWarn("valid")
        }
        if(invalidUsername !== undefined){
            setUsernameWarn("invalid")
        }
        else{
            setUsernameWarn("valid")
        }
        if(invalidEmail !== undefined || invalidUsername !== undefined){
            setUpdateBtnView(true)
        }
        else{
            setUpdateBtnView(false)
        }
        WarningMessage()
        UserWarnMessage()
    }, [invalidEmail, invalidUsername])

    function WarningMessage(){
        if(emailWarn !== "valid"){
            return <Form.Text className="warn">This email is already exist. Please try again.</Form.Text>
        }
        else{
            <Form.Text></Form.Text>
        } 
    }

    function UserWarnMessage(){
        if(usernameWarn !== "valid"){
            return <Form.Text className="warn">This username is already exist. Please try again.</Form.Text>
        }
        else{
            <Form.Text></Form.Text>
        }
    }

    const UpdateInfo =() => {
        if(updateEmail !== "" && updateFirstName !== "" && updateUsername !== "" && updateLastName !== ""){
            fetch('https://hein-server.herokuapp.com//users/update-user', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: user.id,
                firstName: updateFirstName,
                lastName: updateLastName,
                userName: updateUsername,
                email: updateEmail
            })
        })
        .then(response => response.json())
            // if(data === updates){
                Swal.fire({
                    title: "Update Successfully",
                    icon: "success",
                    timer: 2000
                })
                setTimeout(function() {
                    window.location.href = "http://localhost:3000/"
                }, 1000);
                
        } else{
             Swal.fire({
                    title: "Update Failed",
                    icon: "error",
                    text: "There's no one to updated",
                    timer: 2000
                })
        }
    }

    const personalInfoBtn = () =>{

    }
    const changePassForm = () => {

    }


    return(
        <>
            <Container >
                <Row>
                    <Col lg="3" md="2" sm="2" xs="4">
                        <Button className="button" href={"https://hein.domingoec.com/settings/personal-info/"+user.id}>Personal Info</Button>
                        <Button className="button" href={"https://hein.domingoec.com/settings/change-password/"+user.id}>Change Password</Button>
                        
                    </Col >
                    {/* Personal Info */}
                    <Col lg="9" md="10" sm="10" xs="8" style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
                        <h1 className="mt-3" style={{textAlign: "center"}}>Personal Information</h1>
                        <Form className="form">
                            <Form.Group className="mb-3">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control placeholder={user.firstName} value={updateFirstName} onChange={(e) => setUpdateFirstName(e.target.value)} disabled={isDisabled} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control placeholder={user.lastName} value={updateLastName} onChange={(e) => setUpdateLastName(e.target.value)} disabled={isDisabled} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control placeholder={user.email} value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} disabled={isDisabled} />
                                {WarningMessage()}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder={user.username} value={updateUsername} onChange={(e) => setUpdateUsername(e.target.value)} disabled={isDisabled} />
                                {UserWarnMessage()}
                            </Form.Group>
                            <Button className="editBtn"   onClick={() => editButton()} disabled={editBtnView}>Edit</Button>
                            <Button className="updateBtn" onClick={() => updateButton()} disabled={updateBtnView}>Update</Button>
                        </Form>
                        
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}