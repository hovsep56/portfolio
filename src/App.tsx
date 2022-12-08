import React from 'react';
import { useState,useEffect } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink,Link, redirect } from "react-router-dom";
import logo from './logo.svg';
import styles from './App.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { Row,Accordion} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NONAME } from 'dns';
import { blob } from 'stream/consumers';


interface Quote{
  
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: string;
  dateAdded: string;
  dateModified: string;
    
}

const Navigation=()=>{
  return (
    <Navbar bg="dark" variant="dark">
    <Container style={{alignContent:'center'}}>
      <Nav className="me-auto" style={{alignContent: 'center'}}>
        <Link to="" style={{textDecoration: 'none',color:'grey',paddingRight:30}}>Home</Link>
        <Link to="" style={{textDecoration: 'none',color:'grey'}}>Contact me</Link>
      </Nav>
    </Container>
    </Navbar>
  )
}

const Components=()=> {
  const [quote, setQuote] = useState<Quote>();
  useEffect(() => {
    const fetchFunction = async() => {
        let result = await fetch("https://api.quotable.io/random");
        let json : Quote = await result.json(); 

        setQuote(json);
    }
    fetchFunction();
},[]);
  return (
    <Container>
      <div >
        <Outlet/>
      </div>
      <h1 style={{textAlign: 'center',paddingBottom:50}}>My Portfolio</h1>
      <h2 style={{textAlign: 'center'}}>About Me</h2>
      <div style={{textAlign: 'center',paddingBottom:100,fontWeight:'bold',fontSize:20}}>
        Greetings, my name is Hovsep Smbatian and welcome to my portfolio!!
        i'm a second year student for graduate programming from a school called "AP", 
        My portfolio is here to show the different components i have created during my lessons in webframeworks if you wish to interact with any of em feel free to do so by clicking the button on each box </div>
      <h2 style={{textAlign: 'center',paddingBottom:100}}>My components</h2>
      <Row className='justify-content-center'>

      <Card style={{ width: '18rem',marginRight:20}}>
      <Card.Img variant="top" src={require('./images/ColorSelect.jpg')} />
      <Card.Body>
        <Card.Title>Color Select</Card.Title>
        <Card.Text>
          A colorselect that shows the color based on which one you selected, it can also show multiple colors when selecting multiple.
        </Card.Text>
        <Link to={"page1"}>Show me!</Link>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem',marginRight:20 }}>
      <Card.Img variant="top" src={require('./images/ColorSelect.jpg')} />
      <Card.Body>
        <Card.Title>Color Select</Card.Title>
        <Card.Text>
          A colorselect that shows the color based on which one you selected, it can also show multiple colors when selecting multiple.
        </Card.Text>
        <Link to={"page1"}>Show me!</Link>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={require('./images/ColorSelect.jpg')} />
      <Card.Body>
        <Card.Title>Color Select</Card.Title>
        <Card.Text>
          A colorselect that shows the color based on which one you selected, it can also show multiple colors when selecting multiple.
        </Card.Text>
        <Link to={"page1"}>Show me!</Link>
      </Card.Body>
    </Card>

      </Row>
    <Accordion defaultActiveKey={['0']} alwaysOpen>
    <Accordion.Item eventKey="0">
        <Accordion.Header >Random Quote</Accordion.Header>
        <Accordion.Body>
        {quote && (
                <ul>
                    <li>Author: {quote.author}</li>
                    <li>Quote: {quote.content}</li>
                </ul>
            )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Container>
  );
}

const Root = () => {
  return (
    <div>
      <Outlet/>
    </div>
              

  );
}

const Home=()=>{
  return(
    <div>
      <Navigation/>
      <Components/>
    </div>
    
  )
}

const Page1=()=>{

  <Outlet/>
    let colors = ["red","blue","yellow","black","green","orange","purple","white"]
    const [selectedcolors,setselectedcolors] = useState<string[]>([""])
    const [showncolors,setshowncolors]=useState<string[]>([""])
  
  
  
    const handlechange: React.ChangeEventHandler<HTMLSelectElement>=(event)=>{
      let selected:string[]=[]
      for (let option of event.target.selectedOptions) {
        selected.push(option.value)
      }
      setselectedcolors(selected)
    }
  
    return(
    <div>
      <select multiple value={selectedcolors} onChange={handlechange}>{colors.map((color)=><option>{color}</option>)}</select>
      <button onClick={()=>{setshowncolors([...selectedcolors])}}>show</button>
      <div className={styles.flex}>
        {showncolors.map((obj)=><div style={{backgroundColor:obj,height:200,flex:1}}/>)}
      </div>
    </div>
    )
  
}
const Page2 =()=>{
  let colors = ["red","blue","yellow","black","green","orange","purple","white"]
  const [selectedcolors,setselectedcolors] = useState<string[]>([""])
  const [showncolors,setshowncolors]=useState<string[]>([""])



  const handlechange: React.ChangeEventHandler<HTMLSelectElement>=(event)=>{
    let selected:string[]=[]
    for (let option of event.target.selectedOptions) {
      selected.push(option.value)
    }
    setselectedcolors(selected)
  }

  return(
  <div>
    <select multiple value={selectedcolors} onChange={handlechange}>{colors.map((color)=><option>{color}</option>)}</select>
    <button onClick={()=>{setshowncolors([...selectedcolors])}}>show</button>
    <div className={styles.flex}>
      {showncolors.map((obj)=><div style={{backgroundColor:obj,height:200,flex:1}}/>)}
    </div>
  </div>
  )

}


const App=()=> {
  const router = createBrowserRouter([
    {
        path: "/",
        element:<Root/>,
        children: [
            {
              path: "",
              element: <Home/>
            },
            {
                path: "page1",
                element: <Page1/>
            },
            {
                path: "page2",
                element: <Page2/>
            }
        ]
    }
]);
  return (
    
      <RouterProvider router={router}/>
    
  );
}

export default App;




































const PersonalInfo = () =>{
  return(
    <div>
      <h1 style={{textAlign:'center',paddingBottom:10,borderBottomColor:'black',borderBottomWidth: 5}}>My portfolio</h1>
      <Container fluid = "xxl" style={{paddingBottom:10}}>
        <h2 style={{paddingBottom: 5}}>Personal info</h2>
        <ul style={{listStyleType: 'none'}}>
          <li style={{fontSize:20}}><text><text style={{fontWeight:'bold'}}>Name: </text>Hovsep Smbatian</text></li>
          <li style={{fontSize:20}}><text><text style={{fontWeight:'bold'}}>address: </text>Ringlaan 6, Berchem, 2600</text></li>
          <li style={{fontSize:20}}><text><text style={{fontWeight:'bold'}}>E-mail: </text>hovsep.smbatian@gmail.com</text></li>
          <li style={{fontSize:20}}><text style={{fontWeight:'bold'}}>LinkedIn: </text><a href='https://www.linkedin.com/in/hovsep-smbatian-9438b9222/'>https://www.linkedin.com/in/hovsep-smbatian-9438b9222/</a></li>
        </ul>
        <hr style={{backgroundColor: 'black', height: 5}}></hr>
      </Container>
    </div>
  )
}

const Education=()=>{
  return(
    <Container fluid = "xxl" style={{paddingBottom:10}}>
      <h2 style={{paddingBottom: 5}}>Education</h2>
      <ul style={{listStyleType: 'none'}}>
        <li style={{display:'flex', fontSize:20}}>AP hogeschool <div style={{flex: 1,textAlign:'right'}}>Sep 2022-Today</div></li>
        <li style={{color: 'grey'}}>Graduate Programming</li>
        <li style={{display:'flex', fontSize:20}}>AP hogeschool <div style={{flex: 1,textAlign:'right'}}>Sep 2017-2022</div></li>
        <li style={{color: 'grey'}}>Bachelor in IT</li>
        <li style={{display:'flex', fontSize:20}}>Stedelijk Lyceum Meir<div style={{flex: 1,textAlign:'right'}}>Sep 2009-2016</div></li>
        <li style={{color: 'grey'}}>Degree in goldsmithing</li>
      </ul>
      <hr style={{backgroundColor: 'black', height: 5}}></hr>
    </Container>
  )
}
