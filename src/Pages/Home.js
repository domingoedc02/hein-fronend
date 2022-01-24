
import { Fragment} from "react"
// import { Button } from "react-bootstrap";
import CategoryHome from "../Components/CategoryHome"

import Highlights from "../Components/Highlights"

import ProductsView from "../Components/ProductsView"




export default function Home(){

    document.title = "HEiN | Home"

    // const [imageFile, setImageFile] = useState("");
    // console.log(imageFile)
    // function submit(e){
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('file',imageFile)
    //     formData.append('upload_preset', 'h5iebdtn')

    //     fetch('https://api.cloudinary.com/v1_1/dj3fnzbzl/image/upload',{
    //         method:"POST",
    //         body: formData,
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data.secure_url)
    //     })
    // }

    // function tryL(){
    //     return (
    //         <Fragment>
    //             <label htmlFor="avatar">Choose a profile picture:</label>

    //             <input type="file"
    //                 id="avatar" name="avatar"
    //                 accept="image/png, image/jpeg" 
    //                 onChange={(e) => setImageFile(e.target.files[0])}></input>
    //                 <Button onClick={(e) => submit(e)}>hello</Button>
    //         </Fragment>
    //     )
    // }

    return(
        <Fragment >
            <Highlights/>
            <CategoryHome/>
            <ProductsView/>
        </Fragment>
    )
}