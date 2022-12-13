import React from 'react';
import { useState, useEffect,useRef } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink, Link, redirect } from "react-router-dom";
import logo from './logo.svg';
import styles from './App.module.css';
import { Row, Accordion,Card,Navbar,Nav,Container,Form,Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';
import { toNamespacedPath } from 'path';


interface Quote {

  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: string;
  dateAdded: string;
  dateModified: string;

}

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ alignContent: 'center' }}>
        <Nav className="me-auto" style={{ alignContent: 'center' }}>
          <NavLink to="" style={{ textDecoration: 'none', color: 'grey', paddingRight: 30 }}>Home</NavLink>
          <NavLink to="contact" style={{ textDecoration: 'none', color: 'grey' }}>Contact me</NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

const Components = () => {
  const [quote, setQuote] = useState<Quote>();
  useEffect(() => {
    const fetchFunction = async () => {
      let result = await fetch("https://api.quotable.io/random");
      let json: Quote = await result.json();

      setQuote(json);
    }
    fetchFunction();
  }, []);
  return (
    <Container>
      <div >
        <Outlet />
      </div>
      <h1 style={{ textAlign: 'center', paddingBottom: 50 }}>My Portfolio</h1>
      <h2 style={{ textAlign: 'center' }}>About Me</h2>
      <div style={{ textAlign: 'center', paddingBottom: 100, fontWeight: 'bold', fontSize: 20 }}>
        Greetings, my name is Hovsep Smbatian and welcome to my portfolio!!
        i'm a second year student for graduate programming from a school called "AP",
        My portfolio is here to show the different components i have created during my lessons in webframeworks if you wish to interact with any of em feel free to do so by clicking the button on each box </div>
      <h2 style={{ textAlign: 'center', paddingBottom: 100 }}>My components</h2>
      <Row className='justify-content-center'>

        <Card style={{ width: '18rem', marginRight: 20 }}>
          <Card.Img variant="top" src={require('./images/ColorSelect.jpg')} />
          <Card.Body>
            <Card.Title>Color Select</Card.Title>
            <Card.Text>
              A colorselect that shows the color based on which one you selected, it can also show multiple colors when selecting multiple.
            </Card.Text>
            <NavLink to={"page1"}>Show me!</NavLink>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', marginRight: 20 }}>
          <Card.Img variant="top" src={require('./images/filter.jpg')} />
          <Card.Body>
            <Card.Title>Filter</Card.Title>
            <Card.Text>
              A list of objects that can be filtered by name and sorted based on name, age and year
            </Card.Text>
            <Link to={"page2"}>Show me!</Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={require('./images/Shoppinglist.jpg')} />
          <Card.Body>
            <Card.Title>Shopping list</Card.Title>
            <Card.Text>
              A list where you can add and remove items.
            </Card.Text>
            <NavLink to={"page3"}>Show me!</NavLink>
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
      <Outlet />
    </div>


  );
}

//home
const Home = () => {
  return (
    <div>
      <Navigation />
      <Components />
    </div>

  )
}

//contact me page
const Contact = ()=>{
  const [to_name,setTo_name]= useState("");
  const [from_name,setFrom_name]= useState("");
  const [message,setMessage]= useState("");

  const sendEmail = () => {
    const emailcontent ={
      to_name: to_name,
      from_name: from_name,
      message: message 
    }
    console.log(emailcontent)
    emailjs.send('service_p0op7ef', 'template_15dug9e', emailcontent, 'J5AUx_7WyIfgui1Gj')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      
  };
  return(
    <div>
    <Navigation/>
    <Container >
    <form onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="to_name" onChange={(e)=>setTo_name(e.target.value)}/>
      <label>Email</label>
      <input type="email" name="from_name" onChange={(e)=>setFrom_name(e.target.value)}/>
      <label>Message</label>
      <textarea name="message" onChange={(e)=>setMessage(e.target.value)}/>
      <input type="submit" value="Send" />
    </form>
  </Container>
  </div>
  )
  
}

//page 1
const Page1 = () => {

  let colors = ["red", "blue", "yellow", "black", "green", "orange", "purple", "white"]
  const [selectedcolors, setselectedcolors] = useState<string[]>([""])
  const [showncolors, setshowncolors] = useState<string[]>([""])

  const handlechange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    let selected: string[] = []
    for (let option of event.target.selectedOptions) {
      selected.push(option.value)
    }
    setselectedcolors(selected)
  }
  return (
    <div>
      <select multiple value={selectedcolors} onChange={handlechange}>{colors.map((color) => <option>{color}</option>)}</select>
      <button onClick={() => { setshowncolors([...selectedcolors]) }}>show</button>
      <div className={styles.flex}>
        {showncolors.map((obj) => <div style={{ backgroundColor: obj, height: 200, flex: 1 }} />)}
      </div>
    </div>
  )
}

//page 2
interface student {
  name: string,
  age: number,
  year: number
}

const Page2 = () => {
  const [search, setsearch] = useState<string>("")
  const [sorting, setsorting] = useState("")
  let students: student[] = [
    { name: "jeff", age: 20, year: 4 },
    { name: "bezos", age: 21, year: 3 },
    { name: "jonathan", age: 19, year: 2 },
    { name: "zoa", age: 22, year: 1 },
    { name: "heisenberg", age: 30, year: 4 },
  ]

  students.sort((a, b) => {
    if (sorting == "name") {
      return a.name.localeCompare(b.name)
    } else if (sorting == "age") {
      return a.age - b.age
    } else {
      return a.year - b.year
    }
  })

  const handlechange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setsearch(event.target.value)
  }

  return (
    <div>
      <input onChange={handlechange} placeholder='search'></input>
      <table>
        <thead>
          <th style={{ fontWeight: sorting == "name" ? "bold" : "normal" }} onClick={() => setsorting("name")}>name</th>
          <th style={{ fontWeight: sorting == "age" ? "bold" : "normal" }} onClick={() => setsorting("age")}>age</th>
          <th style={{ fontWeight: sorting == "year" ? "bold" : "normal" }} onClick={() => setsorting("year")}>year</th>
        </thead>
        <tbody>

          {students.filter((student) => student.name.startsWith(search)).map((student) => <tr><td>{student.name}</td><td>{student.age}</td><td>{student.year}</td></tr>)}
        </tbody>
      </table>
      <ul>
      </ul>
    </div>
  )
}

//page 3
interface item{
  name:string,
  quantity:number
}
const Page3 = () => {
  const [shoplist,setshoplist] = useState<item[]>([])
  const [names,setname]= useState<string>("")
  const [quantities,setquantity]= useState<number>(0)
  const [success,setsuccess]= useState("")
  const [error,seterror]= useState("")

const additem=()=>{
  if (quantities<1) {
    
    seterror("quantity has to be higher than 0")
    setsuccess("")
  }
  else{
    setshoplist([...shoplist,{name:names,quantity:quantities}]);
    setsuccess("item has been added")
    seterror("")
  }
  
}

const removeitem=(i:number)=>{
  let items = shoplist.filter((obj,index)=>index!==i)
  setshoplist(items)
  setsuccess("item has been removed")
}


  return(
    <div>
      {success&& <div className={styles.success}>{success}</div>}
      {error&& <div className={styles.error}>{error}</div>}


      <div className={styles.shoppinglist}>
        <label>Name:</label>
        <input type="text" placeholder='Name' value={names} onChange={(event)=>setname(event.target.value)}></input>
        <label>Quantity:</label>
        <input type="number" placeholder='Quantity' value={quantities} onChange={(event)=>setquantity(parseInt(event.target.value))}></input>
        </div>
      <button onClick={additem}>add</button>
      <table >
        <thead>
          <th>name</th>
          <th>quantity</th>
        <th></th>
        </thead>
        <tbody>
        {shoplist.map((obj,index)=><tr><td>{obj.name}</td> <td>{obj.quantity}</td> <td><button onClick={()=>removeitem(index)}>remove</button></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}



const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "page1",
          element: <Page1 />
        },
        {
          path: "page2",
          element: <Page2 />
        },
        {
          path: "page3",
          element: <Page3 />
        },
        {
          path: "contact",
          element: <Contact />
        }
      ]
    }
  ]);
  return (

    <RouterProvider router={router} />

  );
}

export default App;




































const PersonalInfo = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 5 }}>My portfolio</h1>
      <Container fluid="xxl" style={{ paddingBottom: 10 }}>
        <h2 style={{ paddingBottom: 5 }}>Personal info</h2>
        <ul style={{ listStyleType: 'none' }}>
          <li style={{ fontSize: 20 }}><text><text style={{ fontWeight: 'bold' }}>Name: </text>Hovsep Smbatian</text></li>
          <li style={{ fontSize: 20 }}><text><text style={{ fontWeight: 'bold' }}>address: </text>Ringlaan 6, Berchem, 2600</text></li>
          <li style={{ fontSize: 20 }}><text><text style={{ fontWeight: 'bold' }}>E-mail: </text>hovsep.smbatian@gmail.com</text></li>
          <li style={{ fontSize: 20 }}><text style={{ fontWeight: 'bold' }}>LinkedIn: </text><a href='https://www.linkedin.com/in/hovsep-smbatian-9438b9222/'>https://www.linkedin.com/in/hovsep-smbatian-9438b9222/</a></li>
        </ul>
        <hr style={{ backgroundColor: 'black', height: 5 }}></hr>
      </Container>
    </div>
  )
}

const Education = () => {
  return (
    <Container fluid="xxl" style={{ paddingBottom: 10 }}>
      <h2 style={{ paddingBottom: 5 }}>Education</h2>
      <ul style={{ listStyleType: 'none' }}>
        <li style={{ display: 'flex', fontSize: 20 }}>AP hogeschool <div style={{ flex: 1, textAlign: 'right' }}>Sep 2022-Today</div></li>
        <li style={{ color: 'grey' }}>Graduate Programming</li>
        <li style={{ display: 'flex', fontSize: 20 }}>AP hogeschool <div style={{ flex: 1, textAlign: 'right' }}>Sep 2017-2022</div></li>
        <li style={{ color: 'grey' }}>Bachelor in IT</li>
        <li style={{ display: 'flex', fontSize: 20 }}>Stedelijk Lyceum Meir<div style={{ flex: 1, textAlign: 'right' }}>Sep 2009-2016</div></li>
        <li style={{ color: 'grey' }}>Degree in goldsmithing</li>
      </ul>
      <hr style={{ backgroundColor: 'black', height: 5 }}></hr>
    </Container>
  )
}
