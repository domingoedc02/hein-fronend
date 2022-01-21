import { useContext } from "react"
import UserContext from "../UserContext"





export default function Brands(){

    const {branding} = useContext(UserContext)

    
    return <h1>{branding.category}</h1>



}