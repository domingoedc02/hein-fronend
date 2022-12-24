import { Fragment, useContext, useEffect, useState } from "react"
import { Col, Container,  Row, Form, Button, Table } from "react-bootstrap"


import UserContext from "../UserContext"
import './../Css-File/Admin.css'
import Swal from "sweetalert2";




export default function Admin(){
    const errorImg = "https://www.kindpng.com/picc/m/129-1299096_no-cloud-icon-png-free-download-no-internet.png"

    const [pName, setPName] = useState("")
    const [pDesc, setPDesc] = useState("")
    const [pBrand, setPBrand] = useState("")
    const [pPrice, setPPrice] = useState("")
    const [pCategory, setPCategory] = useState("")
    const [pBranch, setPBranch] = useState("")
    const [pSaleStat, setPSaleSat] = useState({
        statusOfSale: false,
        discount: null
    })
    const [pDiscount, setPDiscount] = useState("")
    const [fileName, setFileName] = useState();
    const [isDisable, setIsDisable] = useState(true)
    const [imageURL, setImageURL] = useState("")
    

    // const {user} = useContext(UserContext)

    const [allProducts, setAllProducts] = useState([])
    const [inActiveProducts, setInActiveProducts] = useState([])
    const [productID, setProductID] = useState("")
    const [createButton, setCreateButton] = useState(true)
    

    //Update Products
    const [updates , setUpdates ] = useState({})
    const [updateName, setUpdateName] = useState("")
    const [updateDesc, setUpdateDesc] = useState("")
    const [updateBrand, setUpdateBrand] = useState("")
    const [updatePrice, setUpdatePrice] = useState("")
    const [updateCategory, setUpdateCategory] = useState("")
    const [updateBranch, setUpdateBranch] = useState("")
    // const [updateFileName, setUpdateFileName] = useState();
    const [updateSaleStat, setUpdateSaleSat] = useState({
        updateStatusOfSale: false,
        updateDiscount: null
    })
    const [updateDiscount, setUpdateDiscount] = useState("")
    const [updateIsDisable, setUpdateIsDisable] = useState(true)
    const [updateImageURL, setUpdateImageURL] = useState("")


    

    useEffect(() => {
        if(pBranch === "sale" || updateBranch === "sale"){
            setIsDisable(false)
            setPSaleSat({
                statusOfSale: true,
                discount: pDiscount
            })
            setUpdateSaleSat({
                updateStatusOfSale: true,
                updateDiscount: updateDiscount
            })
        }
        else{
            setIsDisable(true)
            setPSaleSat({
                statusOfSale: false,
                discount: null
            })
        }
    },[ pBranch, pDiscount, updateBranch, updateDiscount])
    useEffect(() =>{
        if(pName !== "" && pDesc !== "" && pPrice !== "" && fileName !== "" && pCategory !== "" &&
            pBranch !== "" && pBrand !== "" ){
                //Convert to imagelink
                const formData = new FormData();
                formData.append('file', fileName)
                formData.append('upload_preset', 'h5iebdtn')

                fetch('https://api.cloudinary.com/v1_1/dj3fnzbzl/image/upload',{
                    method:"POST",
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.secure_url)
                    

                        setUpdateImageURL(data.secure_url)

                        setImageURL(data.secure_url)
                })
                setCreateButton(false)
            }
            else{
                setCreateButton(true)
            }
    }, [pName, pBranch, pBrand, pCategory, pDesc, pPrice, fileName])

    function createProduct(e){
        e.preventDefault()



        fetch("https://hein-server.herokuapp.com/product/create-product",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: pName,
                description: pDesc,
                price: pPrice,
                category: pCategory,
                brand: pBrand,
                branchType: pBranch,
                img: imageURL,
                onSale: pSaleStat
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
                
            }
        })
        .catch(error => console.log(error))

        setPName("")
        setPPrice("")
        setPDesc("")
        setPDiscount("")

    }
    
    useEffect(() => {
        fetch('https://hein-server.herokuapp.com/product/active-products', {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setAllProducts(data)
        })

        fetch('https://hein-server.herokuapp.com/product/inactive-products', {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setInActiveProducts(data)
        })
        
    },[])

    useEffect(() => {
        if(productID !== ""){
            searchProduct()
        }
    }, [productID])


//     useEffect(() => {
//         // console.log(updateFileName)
//         if( updateFileName !== "" ){
//              const formData = new FormData()
//             formData.append('file', updateFileName)
//                 formData.append('upload_preset', 'h5iebdtn')

//                 fetch('https://api.cloudinary.com/v1_1/dj3fnzbzl/image/upload',{
//                     method:"POST",
//                     body: formData,
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data.secure_url)
                    
                    
//                     setUpdateImageURL(data.secure_url)
        
           
//     })
// }        
//     }, [])

    const searchProduct = async () => {
        console.log(productID)
       if(productID !== ""){
            await fetch('https://hein-server.herokuapp.com/product/get-product', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: productID
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // setSearchedProduct(data)
            setUpdates(data)
            setUpdateImageURL(data.img)
            setUpdateName(data.name)
            setUpdatePrice(data.price)
            setUpdateDesc(data.description)
            setUpdateBranch(data.branchType)
            setUpdateBrand(data.brand)
            setUpdateCategory(data.category)
            if(data.onSale.statusOfSale === false){
                setUpdateIsDisable(true)
            }else{
                setUpdateDiscount(data.onSale.discount)
                setUpdateIsDisable(false)
            }
            
            

        })
       }


    }
    

    const updateProductButton = (e) => {
        e.preventDefault()
        


        if(productID !== "" && updateName !== "" && updateDesc !== "" && updatePrice !== "" && updateBrand !== "" && updateCategory !== "" && updateBranch !== "" && updateImageURL !== "" ){
            fetch('https://hein-server.herokuapp.com/product/update-product', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: productID,
                name: updateName,
                description: updateDesc,
                price: updatePrice,
                brand: updateBrand,
                category: updateCategory,
                branchType: updateBranch,
                onSale : updateSaleStat
            })
        })
        .then(response => response.json())
            // if(data === updates){
                Swal.fire({
                    title: "Update Successfully",
                    icon: "success",
                    timer: 2000
                })
        } else{
             Swal.fire({
                    title: "Update Failed",
                    icon: "error",
                    text: "There's no one to updated",
                    timer: 2000
                })
        }
            // } else {
            //    
            // }

    }

    //Archive Button
    const archiveButton = () => {

        if(productID !== ""){
            fetch("https://hein-server.herokuapp.com/product/archive-products",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: productID
            })
        })
        .then(response => response.json())

            Swal.fire({
                    title: "Archive Successfully",
                    icon: "success",
                    timer: 2000
            })
        }
    }
    const activateButton = () => {

        if(productID !== ""){
            fetch("https://hein-server.herokuapp.com/product/activate-products",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: productID
            })
        })
        .then(response => response.json())
        Swal.fire({
                    title: "Activate Successfully",
                    icon: "success",
                    timer: 2000
            })
        }
    }
    const deleteButton = () => {

        if(productID !== ""){
            fetch("https://hein-server.herokuapp.com/product/delete-products",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: productID
            })
        })
        .then(response => response.json())
        Swal.fire({
                    title: "Delete Successfully",
                    icon: "success",
                    timer: 2000
            })
        }
    }

    useEffect(() => {
        deleteButton()
        archiveButton()
        activateButton()
    }, [])

    return(
        <Fragment>
            <Container fluid>
                <Row>
                    <Col lg={2} md={2} sm={2} className="col-nav">
                        <nav id="navbar-example3" className="navbar navbar-light bg-light">
                            <nav className="nav nav-pills flex-column">
                                <a className="nav-link navs" href="#create-product">Create Product</a>
                                <nav className="nav nav-pills flex-column ">
                                <a className="nav-link ml-3 my-1 navs" href="#Active-Products">Active Products</a>
                                <a className="nav-link ml-3 my-1 navs" href="#Archived-Products">Archived Products</a>
                                </nav>
                                <a className="nav-lin navsk" href="#Update-Product">Update Product</a>
                                <a className="nav-link navs" href="#item-3">Item 3</a>
                                <nav className="nav nav-pills flex-column ">
                                <a className="nav-link ml-3 my-1 navs" href="#item-3-1">Item 3-1</a>
                                <a className="nav-link ml-3 my-1 navs" href="#item-3-2">Item 3-2</a>
                                </nav>
                            </nav>
                        </nav>
                    </Col>
                    <Col lg={8} md={8} >
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div data-spy="scroll" data-target="#navbar-example3" data-offset="0" className="d-block mx-auto">
                                    <h2 className="text-center mt-4">ADMIN DASHBOARD</h2>
                                    <div className="border-bottom mt-3"></div>
                                    
                                        
                                        <Row>
                                            <h3 id="create-product" className="text-center mt-5">Create Product</h3>
                                            <p className="d-block mx-auto text-center w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quas nulla beatae, dolorem sapiente excepturi eos id nisi pariatur quos maiores ipsa, aspernatur recusandae optio libero maxime modi perferendis sequi quam quae unde. Voluptas autem ab sunt nemo est non vel, temporibus accusamus modi molestias ut alias quia iusto earum quos, architecto</p>
                                            <Col lg={6} md={6} sm={10} className="createForm">
                                                
                                                 <Form onSubmit={(e) => createProduct(e)}>
                                                    <Form.Group className="mb-3" controlId="name">
                                                        <Form.Label>Product Name</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Enter Product Name" 
                                                            value={pName}
                                                            onChange={(e) =>  setPName(e.target.value)}
                                                            />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="description">
                                                        <Form.Label>Description</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Enter Description" 
                                                            value={pDesc}
                                                            onChange={(e) => setPDesc(e.target.value)}
                                                            />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="name">
                                                        <Form.Label>Price</Form.Label>
                                                        <Form.Control 
                                                            type="number" 
                                                            placeholder="Enter Price" 
                                                            value={pPrice}
                                                            onChange={(e) => setPPrice(e.target.value)}
                                                            />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Upload Image:   </Form.Label>
                                                            <input type="file"
                                                            id="avatar" name="avatar"
                                                            accept="image/png, image/jpeg" 
                                                            onChange={(e) => setFileName(e.target.files[0])}>
                                                            </input>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Brand</Form.Label>
                                                        <Form.Select id="disabledSelect" onChange={(e) => setPBrand(e.target.value)}>
                                                            <option value=""></option>
                                                            <option value="Prada">Prada</option>
                                                            <option value="Balenciaga">Balenciaga</option>
                                                            <option value="Versace">Versace</option>
                                                            <option value="Ralph Lauren">Ralph Lauren</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Category</Form.Label>
                                                        <Form.Select id="disabledSelects" onChange={(e) => setPCategory(e.target.value)}>   
                                                            <option value=""></option>
                                                            <option value="T-shirt">T-shirt</option>
                                                            <option value="Hoodie">Hoodie</option>
                                                            <option value="Pants">Pants</option>
                                                            <option value="Jacket">Jacket</option>
                                                            <option value="Bag">Bag</option>
                                                            <option value="Shoes">Shoes</option>
                                                            <option value="Accessories">Accessories</option>
                                                            <option value="Perfume">Perfume</option>

                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Type</Form.Label>
                                                        <Form.Select id="disabledSelect" onChange={(e) => setPBranch(e.target.value)}>
                                                            <option value=""> </option>
                                                            <option value="sale" >Sale</option>
                                                            <option value="new" >New</option>
                                                            <option value="default">Default</option>
                                                        </Form.Select>
                                                        
                                                    </Form.Group> 
                                                    <Form.Group className="mb-3" controlId="name">
                                                        <Form.Label>Discount</Form.Label>
                                                        <Form.Control 
                                                            type="number" 
                                                            placeholder="Discount %" 
                                                            value={pDiscount}
                                                            onChange={(e) => setPDiscount(e.target.value)}
                                                            disabled={isDisable}
                                                            />
                                                    </Form.Group>
                                                      

                                                    
                                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                        <Form.Check type="checkbox" label="Check me out" />
                                                    </Form.Group>
                                                    <Button variant="primary" type="submit" disabled={createButton}>
                                                        Submit
                                                    </Button>
                                                </Form>
                                            </Col>
                                        </Row>
                                       
                                    <h3 id="Active-Products" className="text-center mt-5 mb-4">Active Products</h3>
                                    <Table striped bordered hover size="sm" responsive  >
                                        <thead>
                                            <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Brand</th>
                                            <th>Category</th>
                                            <th>Type</th>
                                            <th>Button</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {allProducts.map(items => {
                                                
                                                return (
                                                    <Fragment key={items._id}>
                                                        <tr >
                                                            <td className="tables"><img className="table-img" src={items.img} alt={errorImg}/></td>
                                                            <td className="tables">{items.name}</td>
                                                            <td className="tables-desc">{items.description}</td>
                                                            <td className="tables">{"Php "+items.price}</td>
                                                            <td className="tables">{items.brand}</td>
                                                            <td className="tables">{items.category}</td>
                                                            <td className="tables">{(items.branchType === "sale") ? <>{items.branchType +"\n"+ items.onSale.discount + "%"}</>:<>{items.branchType}</>}</td>
                                                            <td className="tables">
                                                                {<Fragment>
                                                                    
                                                                    <Button href="#Update-Product"  onClick={(e) => {setProductID(items._id); searchProduct();}}>Update</Button> 
                                                                    <Button className="archiveButton" onClick={(e) => {setProductID(items._id); archiveButton();}}>Archive</Button>   
                                                                </Fragment>}
                                                            </td>
                                                            
                                                        </tr>
                                                    </Fragment>
                                                    
                                                    )
                                            })}
                                            
                                        </tbody>
                                    </Table>
                                    <h3 id="Archived-Products" className="text-center mt-5 mb-4">Archived Products</h3>
                                    <Table striped bordered hover size="sm" responsive >
                                        <thead>
                                            <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Brand</th>
                                            <th>Category</th>
                                            <th>Type</th>
                                            <th>Button</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {inActiveProducts.map(items => {
                                                
                                                return (
                                                    <Fragment key={items._id}>
                                                        <tr  >
                                                            <td className="tables"><img className="table-img" src={items.img} alt="https://www.kindpng.com/picc/m/129-1299096_no-cloud-icon-png-free-download-no-internet.png"/></td>
                                                            <td className="tables">{items.name}</td>
                                                            <td className="tables-desc">{items.description}</td>
                                                            <td className="tables">{"Php "+items.price}</td>
                                                            <td className="tables">{items.brand}</td>
                                                            <td className="tables">{items.category}</td>
                                                            <td className="tables">{(items.branchType === "sale") ? <>{items.branchType +"\n"+ items.onSale.discount + "%"}</>:<>{items.branchType}</>}</td>
                                                            <td className="tables">
                                                                {<Fragment>
                                                                    <Button className="deleteButton" onClick={(e) => {setProductID(items._id); deleteButton();}}>Delete</Button> 
                                                                    <Button className="activateButton" onClick={(e) => {setProductID(items._id); activateButton();}}>Activate</Button>   
                                                                </Fragment>}
                                                            </td>
                                                            
                                                        </tr>
                                                    </Fragment>
                                                    
                                                    )
                                            })}
                                            
                                        </tbody>
                                    </Table>
                                    <h3 id="Update-Product" className="mt-5 mb-4 text-center">Update Product</h3>
                                    <p className="d-bloxk mx-auto text-center mb-4">Check the text box you want to update</p>
                                    <Row className="border py-3">
                                        <Col lg={4} md={6} sm={12} xs={12}>
                                            <img className="updateImage d-block mx-auto" src={updateImageURL} alt={errorImg}/>
                                        </Col>
                                        <Col lg={8} md={6} sm={12} xs={12}>
                                            <Form className="updateForm" onSubmit={(e) => updateProductButton(e)}>
                                                <Form.Group className="mb-1" controlId="name">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" placeholder="" value={updateName} onChange={(e) => setUpdateName(e.target.value)}/>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control as="textarea" rows={3} value={updateDesc} onChange={(e) => setUpdateDesc(e.target.value)}/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="name">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control type="number" placeholder="name@example.com" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)}/>
                                                </Form.Group>
                                                {/* <Form.Group>
                                                        <Form.Label>Upload Image:   </Form.Label>
                                                            <input type="file"
                                                            id="avatar" name="avatar"
                                                            accept="image/png, image/jpeg" 
                                                            onChange={(e) => setUpdateFileName(e.target.files[0])}>
                                                            </input>
                                                    </Form.Group> */}
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Brand</Form.Label>
                                                        <Form.Select id="disabledSelect" value={updateBrand} onChange={(e) => setUpdateBrand(e.target.value)}>
                                                            <option value=""></option>
                                                            <option value="Prada">Prada</option>
                                                            <option value="Balenciage">Balenciaga</option>
                                                            <option value="Versace">Versace</option>
                                                            <option value="Ralph Lauren">Ralph Lauren</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Category</Form.Label>
                                                        <Form.Select id="disabledSelects" value={updateCategory} onChange={(e) => setUpdateCategory(e.target.value)}>
                                                            <option value=""></option>
                                                            <option value="T-shirt">T-shirt</option>
                                                            <option value="Hoodie">Hoodie</option>
                                                            <option value="Pants">Pants</option>
                                                            <option value="Jacket">Jacket</option>
                                                            <option value="Bag">Bag</option>
                                                            <option value="Shoes">Shoes</option>
                                                            <option value="Accessories">Accessories</option>
                                                            <option value="Perfume">Perfume</option>

                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Type</Form.Label>
                                                        <Form.Select id="disabledSelect" value={updateBranch} onChange={(e) => setUpdateBranch(e.target.value)}>
                                                            <option value=""> </option>
                                                            <option value="sale" >Sale</option>
                                                            <option value="new" >New</option>
                                                            <option value="default">Default</option>
                                                        </Form.Select>
                                                        
                                                    </Form.Group> 
                                                    <Form.Group className="mb-3" controlId="name">
                                                        <Form.Label>Discount</Form.Label>
                                                        <Form.Control 
                                                            type="number" 
                                                            placeholder="Discount %" 
                                                            value={updateDiscount}
                                                            onChange={(e) => setUpdateDiscount(e.target.value)}
                                                            
                                                            />
                                                    </Form.Group>
                                                    <Button className="d-block mx-auto w-100" type="submit">Update</Button>
                                                

                                            </Form>
                                        </Col>

                                    </Row>
                                    <h5 id="item-3-2">Item 3-2</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quas nulla beatae, dolorem sapiente excepturi eos id nisi pariatur quos maiores ipsa, aspernatur recusandae optio libero maxime modi perferendis sequi quam quae unde. Voluptas autem ab sunt nemo est non vel, temporibus accusamus modi molestias ut alias quia iusto earum quos, architecto inventore eveniet placeat, repellendus exercitationem explicabo aperiam? Soluta, hic mollitia. Illo earum maiores exercitationem quas ratione, minima molestiae omnis sit pariatur repellendus nulla aperiam deleniti magni molestias? Vitae ut eaque eveniet, neque dicta consectetur veritatis atque debitis at fuga quas unde? Veritatis recusandae aut officia quod excepturi magnam nisi nemo reiciendis, saepe itaque ea natus fugiat vel quasi vero doloremque rem asperiores numquam. Repellat minus impedit deserunt libero officia suscipit, iste quas minima nulla ex tempore hic quae id officiis nihil omnis. Quasi vero nihil eligendi. Pariatur libero reprehenderit nemo at qui optio praesentium assumenda odit aut consectetur veniam, tenetur explicabo cupiditate itaque ipsa eveniet. Cumque sint minima repudiandae veritatis et error optio, libero dolor voluptatem omnis, ut cum ipsam rerum reprehenderit excepturi facilis aperiam itaque aspernatur repellendus atque est. Harum temporibus perferendis, magnam hic assumenda veniam consequuntur accusantium inventore, quas blanditiis ut? Non quae distinctio minima odit?</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            

            
            
        </Fragment>
        
    )


}