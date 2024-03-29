import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink, Link, redirect } from "react-router-dom";
import styles from './App.module.css';
import { Row, Accordion, Card, Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';
import ColorSelect from './Components/ColorSelect'
import Intervals from './Components/Intervals'
import LocalStorage from './Components/LocalStorage'
import Pokemon from './Components/Pokemon'
import ShoppingList from './Components/ShoppingList'
import TicTacToe from './Components/TicTacToe'
import ToDo from './Components/ToDo'
import Filter from './Components/Filter'


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
interface Joke {
  id: string,
  joke: string,
  status: number
}
interface CatFact {
  fact: string
  length: number,

}
interface weather {
  current: {
    last_updated: string,
    temp_c: Number,
    temp_f: Number
  }
}


const nightMode = (theme: string) => {
  return { backgroundColor: theme === "black" ? "black" : "white" }
}


const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ alignContent: 'center' }}>
        <Nav className="me-auto" style={{ alignContent: 'center' }}>
          <NavLink to="/" className={styles.navlink} style={{ paddingRight: 30 }}>Home</NavLink>
          <NavLink to="contact" className={styles.navlink} style={{ fontWeight: 'bold' }}>Contact me</NavLink>
        </Nav>

      </Container>
    </Navbar>
  )
}

const Components = ({ theme }: { theme: string }) => {
  const [quote, setQuote] = useState<Quote>();
  const [joke, setJoke] = useState("");
  const [catFact, setCatfact] = useState<CatFact>();
  const [weather, setWeather] = useState<weather>();
  const [count, setcount] = useState<number>(0)


  const loadJoke = async () => {
    let response = await fetch("https://icanhazdadjoke.com/", {
      headers: { "Accept": "application/json" }
    });
    let joke: Joke = await response.json();
    setJoke(joke.joke);
  }

  useEffect(() => {
    const fetchFunction = async () => {
      let result = await fetch("https://api.quotable.io/random");
      let json: Quote = await result.json();
      setQuote(json);
    }
    fetchFunction();
  }, []);

  useEffect(() => {
    (async () => {
      let response = await fetch(`https://catfact.ninja/fact`);
      let data = await response.json();
      console.log(data)
      setCatfact(data)
    })();

  }, []);

  useEffect(() => {
    (async () => {
      let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8d21542a2f2f4c14b14135505221812&q=Belgium`);
      let data = await response.json();
      console.log(data)
      setWeather(data)
    })();

  }, []);
  return (
    <div style={{ backgroundColor: theme }}>
      <Container >
        <div >
          <Outlet />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ paddingBottom: 50, color: theme === "white" ? "black" : "white" }} >My Portfolio</h1>

          <h2 style={{ color: theme === "white" ? "black" : "white" }}>About Me</h2>
          <div className={styles.abouttext} style={{ color: theme === "white" ? "black" : "white" }}>
            Greetings, my name is Hovsep Smbatian and welcome to my portfolio!!
            i'm a second year student for graduate programming from a school called "AP",
            My portfolio is here to show the different components i have created during my lessons in webframeworks if you wish to interact with any of em feel free to do so by clicking the button on each box.
            I have also prepared some API demonstrations at the bottom of the page to show off my skills using API's</div>
          <h2 style={{ paddingBottom: 50, color: theme === "white" ? "black" : "white" }}>My components</h2>
        </div>
        <Row className='justify-content-center'>

          <Card style={{ width: '18rem', marginRight: 20, marginBottom: 20 }}>
            <Card.Img variant="top" src={require('./images/ColorSelect.jpg')} />
            <Card.Body>
              <Card.Title>Color Select</Card.Title>
              <Card.Text>
                A colorselect that shows the color based on which one you selected, it can also show multiple colors when selecting multiple.
              </Card.Text>
              <NavLink to={"page1"}>Show me! (no dark mode)</NavLink>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem', marginRight: 20, marginBottom: 20 }}>
            <Card.Img variant="top" src={require('./images/filter.jpg')} />
            <Card.Body>
              <Card.Title>Filter</Card.Title>
              <Card.Text>
                A list of objects that can be filtered by name and sorted based on name, age and year
              </Card.Text>
              <Link to={"page2"}>Show me! (no dark mode)</Link>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem', marginRight: 20, marginBottom: 20 }}>
            <Card.Img variant="top" src={require('./images/Shoppinglist.jpg')} />
            <Card.Body>
              <Card.Title>Shopping list</Card.Title>
              <Card.Text>
                A list where you can add and remove items.
              </Card.Text>
              <NavLink to={"page3"}>Show me! (no dark mode)</NavLink>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem', marginRight: 20, marginBottom: 20 }}>
            <Card.Img variant="top" src={require('./images/interval.jpg')} />
            <Card.Body>
              <Card.Title>Intervals</Card.Title>
              <Card.Text>
                A component that creates random values at specific intervals.
              </Card.Text>
              <NavLink to={"page4"}>Show me! (no dark mode)</NavLink>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem', marginRight: 20 }}>
            <Card.Img variant="top" src={require('./images/LocalStorage.jpg')} />
            <Card.Body>
              <Card.Title>LocalStorage</Card.Title>
              <Card.Text>
                A component that locally save data so it stays the same when used again.
              </Card.Text>
              <NavLink to={"page5"}>Show me! (no dark mode)</NavLink>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem', marginRight: 20 }}>
            <Card.Img style={{ maxHeight: 200, maxWidth: 200 }} variant="top" src={require('./images/Pokemon.jpg')} />
            <Card.Body>
              <Card.Title>Pokemon</Card.Title>
              <Card.Text>
                A list that calls from a API where you can search pokemon by name or set the limit on how big the list can be
              </Card.Text>
              <NavLink to={"page6"}>Show me! (no dark mode)</NavLink>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem', marginRight: 20 }}>
            <Card.Img variant="top" src={require('./images/ToDo.jpg')} />
            <Card.Body>
              <Card.Title>ToDo</Card.Title>
              <Card.Text>
                A simple ToDo list
              </Card.Text>
              <NavLink to={"page7"}>Show me! (no dark mode)</NavLink>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', marginRight: 20 }}>
            <Card.Img style={{ maxHeight: 200, maxWidth: 200 }} variant="top" src={require('./images/TicTacToe.jpg')} />
            <Card.Body>
              <Card.Title>TicTacToe</Card.Title>
              <Card.Text>
                A component where you can play a game of TicTacToe
              </Card.Text>
              <NavLink to={"page8"}>Show me! (no dark mode)</NavLink>
            </Card.Body>
          </Card>
        </Row>
        <h2 style={{ paddingTop: 25, paddingBottom: 25, color: theme === "white" ? "black" : "white" }}>API demonstrations</h2>
        <Accordion alwaysOpen>
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
          <Accordion.Item eventKey="1">
            <Accordion.Header >Jokes</Accordion.Header>
            <Accordion.Body>
              <div>
                <ul>
                  {joke&&<li>
                    {joke}
                  </li>}
                </ul>
                <button onClick={loadJoke}>New joke</button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header >Random cat fact</Accordion.Header>
            <Accordion.Body>
              <div>
                <ul>
                  <li>
                    {catFact?.fact}
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header >Current weather in Belgium</Accordion.Header>
            <Accordion.Body>
              <div>
                <ul>
                  <li>Last updated: {weather?.current.last_updated}</li>
                  <li>Celcius: {weather?.current.temp_c.toString()}C</li>
                  <li>Fahrenheit: {weather?.current.temp_f.toString()}F</li>
                </ul>

              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
}

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>


  );
}

//contact me page
const Contact = ({ theme }: { theme: string }) => {
  const [to_name, setTo_name] = useState("");
  const [from_name, setFrom_name] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const emailcontent = {
      to_name: to_name,
      from_name: from_name,
      message: message
    }
    console.log(emailcontent)
    emailjs.send('service_p0op7ef', 'template_15dug9e', emailcontent, 'J5AUx_7WyIfgui1Gj')
      .then((result: any) => {
        console.log(result.text);
      }, (error: any) => {
        console.log(error.text);
      });

  };
  return (
    <div>
      <div style={{ paddingTop: 20, backgroundColor: theme, height: '100vh' }}>
        <Container >
          <div style={{ textAlign: 'center' }}>
          </div>
          <h2 style={{ textAlign: 'center', color: theme === "white" ? "black" : "white" }}>Feel free to contact me here</h2>
          <Form onSubmit={sendEmail}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: theme === "white" ? "black" : "white" }}>Title</Form.Label>
              <Form.Control name='to_name' type="text" placeholder="Enter title" onChange={(e) => setTo_name(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: theme === "white" ? "black" : "white" }}>Email</Form.Label>
              <Form.Control name='from_name' type="email" placeholder="Enter email" onChange={(e) => setFrom_name(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: theme === "white" ? "black" : "white" }}>Message</Form.Label>
              <Form.Control name='message' type="text" placeholder="Enter message" onChange={(e) => setMessage(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  )
}



//page 1
const Page1 = () => {
  return (
    <>
      <Navigation />
      <ColorSelect />
    </>
  )

}

//page 2


const Page2 = () => {
  return (
    <>
      <Navigation />
      <Filter />
    </>
  )
}

//page 3

const Page3 = () => {
  return (
    <>
      <Navigation />
      <ShoppingList />
    </>
  )
}

//page4
const Page4 = () => {
  return (
    <>
      <Navigation />
      <Intervals />
    </>
  )

}

//page5
const Page5 = () => {
  return (
    <>
      <Navigation />
      <LocalStorage />
    </>
  )
}

//page6
const Page6 = () => {
  return (
    <>
      <Navigation />
      <Pokemon />
    </>
  )
}

//page7
const Page7 = () => {
  return (
    <>
      <Navigation />
      <ToDo />
    </>
  )
}

//page8
const Page8 = () => {
  return (
    <>
      <Navigation />
      <TicTacToe />
    </>
  )
}

const App = () => {
  const [theme, setTheme] = useState("white");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <div>
            <Navigation />
            <div style={{ backgroundColor: theme, textAlign: 'center', paddingTop: 20 }}>
              <Button variant="dark" onClick={() => { setTheme(theme => theme === "white" ? "black" : "white") }}> Night mode</Button>
            </div>
            <Components theme={theme} />
          </div>
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
          path: "page4",
          element: <Page4 />
        },
        {
          path: "page5",
          element: <Page5 />
        },
        {
          path: "page6",
          element: <Page6 />
        },
        {
          path: "page7",
          element: <Page7 />
        },
        {
          path: "page8",
          element: <Page8 />
        },
        {
          path: "contact",
          element: <div>
            <Navigation />
            <div style={{ backgroundColor: theme, textAlign: 'center', paddingTop: 20 }}>
              <Button variant="dark" onClick={() => { setTheme(theme => theme === "white" ? "black" : "white") }}> Night mode</Button>
            </div>
            <Contact theme={theme} />

          </div>
        }
      ]
    }
  ]);
  return (

    <RouterProvider router={router} />

  );
}

export default App;
