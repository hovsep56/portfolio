import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink, Link, redirect } from "react-router-dom";
import logo from './logo.svg';
import styles from './App.module.css';
import { Row, Accordion, Card, Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';
import { toNamespacedPath } from 'path';
import { ColorRing } from 'react-loader-spinner'
import { decode } from 'html-entities';

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


const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ alignContent: 'center' }}>
        <Nav className="me-auto" style={{ alignContent: 'center' }}>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'grey', paddingRight: 30 }}>Home</NavLink>
          <NavLink to="contact" style={{ textDecoration: 'none', color: 'grey' }}>Contact me</NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

const Components = () => {
  const [quote, setQuote] = useState<Quote>();
  const [joke, setJoke] = useState("");

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

  /*useEffect(() => {
    const fetchFunction = async () => {
      let result = await fetch("https://newsapi.org/v2/everything?q=apple&from=2022-12-14&to=2022-12-14&sortBy=popularity&apiKey=d4ffad5006aa4becb7253765145b053e");
      //let json: Quote = await result.json();

      console.log(result)
    }
    fetchFunction();
  }, []);*/

  return (
    <Container >
      <div >
        <Outlet />
      </div>
      <h1 style={{ textAlign: 'center', paddingBottom: 50 }}>My Portfolio</h1>
      <h2 style={{ textAlign: 'center' }}>About Me</h2>
      <div style={{ textAlign: 'center', paddingBottom: 80, fontWeight: 'bold', fontSize: 20 }}>
        Greetings, my name is Hovsep Smbatian and welcome to my portfolio!!
        i'm a second year student for graduate programming from a school called "AP",
        My portfolio is here to show the different components i have created during my lessons in webframeworks if you wish to interact with any of em feel free to do so by clicking the button on each box.
         I have also prepared some API demonstrations at the bottom of the page to show off my skills using API's</div>
      <h2 style={{ textAlign: 'center', paddingBottom: 50 }}>My components</h2>
      <Row className='justify-content-center'>

        <Card style={{ width: '18rem', marginRight: 20,marginBottom:20 }}>
          <Card.Img variant="top" src={require('./images/ColorSelect.jpg')} />
          <Card.Body>
            <Card.Title>Color Select</Card.Title>
            <Card.Text>
              A colorselect that shows the color based on which one you selected, it can also show multiple colors when selecting multiple.
            </Card.Text>
            <NavLink to={"page1"}>Show me!</NavLink>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', marginRight: 20,marginBottom:20 }}>
          <Card.Img variant="top" src={require('./images/filter.jpg')} />
          <Card.Body>
            <Card.Title>Filter</Card.Title>
            <Card.Text>
              A list of objects that can be filtered by name and sorted based on name, age and year
            </Card.Text>
            <Link to={"page2"}>Show me!</Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', marginRight: 20,marginBottom:20 }}>
          <Card.Img variant="top" src={require('./images/Shoppinglist.jpg')} />
          <Card.Body>
            <Card.Title>Shopping list</Card.Title>
            <Card.Text>
              A list where you can add and remove items.
            </Card.Text>
            <NavLink to={"page3"}>Show me!</NavLink>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', marginRight: 20,marginBottom:20 }}>
          <Card.Img variant="top" src={require('./images/interval.jpg')} />
          <Card.Body>
            <Card.Title>Intervals</Card.Title>
            <Card.Text>
              A component that creates random values at specific intervals.
            </Card.Text>
            <NavLink to={"page4"}>Show me!</NavLink>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', marginRight: 20 }}>
          <Card.Img variant="top" src={require('./images/LocalStorage.jpg')} />
          <Card.Body>
            <Card.Title>LocalStorage</Card.Title>
            <Card.Text>
              A component that locally save data so it stays the same when used again.
            </Card.Text>
            <NavLink to={"page5"}>Show me!</NavLink>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', marginRight: 20 }}>
          <Card.Img style={{maxHeight:200,maxWidth:200}} variant="top" src={require('./images/Pokemon.jpg')} />
          <Card.Body>
            <Card.Title>Pokemon</Card.Title>
            <Card.Text>
              A list that calls from a API where you can search pokemon by name or set the limit on how big the list can be
            </Card.Text>
            <NavLink to={"page6"}>Show me!</NavLink>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', marginRight: 20 }}>
          <Card.Img variant="top" src={require('./images/ToDo.jpg')} />
          <Card.Body>
            <Card.Title>ToDo</Card.Title>
            <Card.Text>
              A simple ToDo list
            </Card.Text>
            <NavLink to={"page7"}>Show me!</NavLink>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', marginRight: 20 }}>
          <Card.Img style={{maxHeight:200,maxWidth:200}} variant="top" src={require('./images/TicTacToe.jpg')} />
          <Card.Body>
            <Card.Title>TicTacToe</Card.Title>
            <Card.Text>
              A component where you can play a game of TicTacToe
            </Card.Text>
            <NavLink to={"page8"}>Show me!</NavLink>
          </Card.Body>
        </Card>
      </Row>
      <h2 style={{paddingTop:25,paddingBottom:25}}>API demonstrations</h2>
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
            <div>{joke}</div>
            <button onClick={loadJoke}>New joke</button>
            </div>
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
const Contact = () => {
  const [to_name, setTo_name] = useState("");
  const [from_name, setFrom_name] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    const emailcontent = {
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
  return (
    <div>
      <Navigation />
      <Container >
        <form onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="to_name" onChange={(e) => setTo_name(e.target.value)} />
          <label>Email</label>
          <input type="email" name="from_name" onChange={(e) => setFrom_name(e.target.value)} />
          <label>Message</label>
          <textarea name="message" onChange={(e) => setMessage(e.target.value)} />
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
      <Navigation/>
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
      <Navigation/>
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
interface item {
  name: string,
  quantity: number
}
const Page3 = () => {
  const [shoplist, setshoplist] = useState<item[]>([])
  const [names, setname] = useState<string>("")
  const [quantities, setquantity] = useState<number>(0)
  const [success, setsuccess] = useState("")
  const [error, seterror] = useState("")

  const additem = () => {
    if (quantities < 1) {

      seterror("quantity has to be higher than 0")
      setsuccess("")
    }
    else {
      setshoplist([...shoplist, { name: names, quantity: quantities }]);
      setsuccess("item has been added")
      seterror("")
    }

  }
  const removeitem = (i: number) => {
    let items = shoplist.filter((obj, index) => index !== i)
    setshoplist(items)
    setsuccess("item has been removed")
  }


  return (
    <div>
      <Navigation/>
      {success && <div className={styles.success}>{success}</div>}
      {error && <div className={styles.error}>{error}</div>}


      <div className={styles.shoppinglist}>
        <label>Name:</label>
        <input type="text" placeholder='Name' value={names} onChange={(event) => setname(event.target.value)}></input>
        <label>Quantity:</label>
        <input type="number" placeholder='Quantity' value={quantities} onChange={(event) => setquantity(parseInt(event.target.value))}></input>
      </div>
      <button onClick={additem}>add</button>
      <table >
        <thead>
          <th>name</th>
          <th>quantity</th>
          <th></th>
        </thead>
        <tbody>
          {shoplist.map((obj, index) => <tr><td>{obj.name}</td> <td>{obj.quantity}</td> <td><button onClick={() => removeitem(index)}>remove</button></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

//page4
const Page4 = () => {
  const Timer = () => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
      let handle = setInterval(() => {
        setTimer(number => number + 1);
      }, 1000);
      return () => { clearInterval(handle); }
    }, []);

    return (
      <div>{timer}</div>
    );
  }

  const CurrentTime = () => {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
      let handle = setInterval(() => {
        setDate(new Date());
      }, 1000);
      return () => { clearInterval(handle); }
    }, []);
    return (
      <div>Current time: <b>{date.toLocaleTimeString()}</b></div>
    )
  }

  interface RandomValueProps {
    min: number;
    max: number;
  }

  const RandomValue = ({ min, max }: RandomValueProps) => {
    const [randomValue, setRandomValue] = useState(0);
    useEffect(() => {
      let handle = setInterval(() => {
        setRandomValue(Math.floor(Math.random() * (max - min)) + min);
      }, 2000);
      return () => { clearInterval(handle); }
    }, []);

    return (
      <div>Random value between {min} and {max}: {randomValue}</div>
    )
  }

  return (
    <>
      <Navigation/>
      <Timer />
      <CurrentTime />
      <RandomValue min={1} max={100} />
      <RandomValue min={100} max={200} />
    </>
  )

}
//page5
interface Joke {
  id: string,
  joke: string,
  status: number
}

const Page5 = () => {

  const [joke, setJoke] = useState("");
  const [favoriteJoke, setFavoriteJoke] = useState(localStorage.getItem("favoriteJoke") || "");

  const loadJoke = async () => {
    let response = await fetch("https://icanhazdadjoke.com/", {
      headers: { "Accept": "application/json" }
    });
    let joke: Joke = await response.json();
    setJoke(joke.joke);
  }

  const loadLocalStorage = async () => {
    let joke = localStorage.getItem("favorites");
    if (joke) {
      setJoke(joke);
    }
  }

  useEffect(() => {
    loadJoke();
    loadLocalStorage();
  }, []);

  const setFavorite = () => {
    setFavoriteJoke(joke);
    localStorage.setItem("favoriteJoke", joke);
  }

  return (
    <div>
      <Navigation/>
      <div className={styles.card}>
        <b>Random joke:</b>
        <div>{joke}</div>
        <div>
          <button onClick={setFavorite}>Set as favorite</button>
          <button onClick={loadJoke}>New joke</button>
        </div>
      </div>
      {favoriteJoke && (
        <div className={styles.card}>
          <b>Favorite joke:</b>
          <div>{favoriteJoke}</div>
        </div>
      )}
    </div>
  );
}
//page6
interface Pokedex {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

interface Result {
  name: string;
  url: string;
}
interface PokedexProps {
  limit: number
}

const Page6 = () => {
  const LoadingIndicator = () => {
    return (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    )
  }

  const Pokedex = ({ limit }: PokedexProps) => {
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("");

    useEffect(() => {
      (async () => {
        setLoading(true);
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        let data: Pokedex = await response.json();
        console.log(data);
        setResults(data.results);
        setLoading(false);
      })();

    }, [limit]);

    if (loading) {
      return <div><LoadingIndicator /></div>
    }

    return (
      <>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
        {results.filter(result => result.name.startsWith(filter)).map((result, index) => (
          <div key={index}>{result.name}</div>
        ))}
      </>
    )
  }
  const [limit, setLimit] = useState(10);
  const [selectedLimit, setSelectedLimit] = useState(10);

  return (
    <>
      <Navigation/>
      <Pokedex limit={selectedLimit} />
      <input type="number" onChange={(e) => setLimit(parseInt(e.target.value))} value={limit} /><button onClick={() => setSelectedLimit(limit)}>Set Limit</button>

    </>
  )

}

//page7
interface TodoItem {
  name: string;
  completed: boolean;
}

interface AddTodoProps {
  addTodo: (todo: string) => void;
}
interface TodoListProps {
  todos: TodoItem[];
  markCompleted: (index: number, completed: boolean) => void;
}
interface TodoListItemProps {
  todo: TodoItem,
  markCompleted: (completed: boolean) => void;
}

const Page7 = () => {
  const AddTodo = ({ addTodo }: AddTodoProps) => {
    const [todo, setTodo] = useState("");

    const handleClick = () => {
      addTodo(todo);
      setTodo("");
    }

    return (
      <div>
        <input id="todo" type="text" value={todo} onChange={(event) => setTodo(event.target.value)} />
        <button onClick={handleClick}>Add</button>
      </div>
    );
  }

  const TodoList = ({ todos, markCompleted }: TodoListProps) => {
    return (
      <div>
        {todos.map((todo, index) => (
          <TodoListItem key={index} todo={todo} markCompleted={(completed) => markCompleted(index, completed)} />
        ))}
      </div>
    )
  }

  const TodoListItem = ({ todo, markCompleted }: TodoListItemProps) => {
    return (
      <div>
        <input type="checkbox" checked={todo.completed} onChange={(event) => markCompleted(event.target.checked)} />
        <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.name}</span>
      </div>
    )
  }
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (todo: string) => {
    setTodos([...todos, { name: todo, completed: false }]);
  };

  const markCompleted = (index: number, completed: boolean) => {
    setTodos(todos.map((todo, i) => i === index ? { ...todo, completed: completed } : todo));
  };
  return (
    <div>
      <Navigation/>
      <AddTodo addTodo={addTodo} />
      <TodoList markCompleted={markCompleted} todos={todos} />

    </div>
  )
}

//page8
const Page8 = () => {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [player, setPlayer] = useState('X');

  const play = (index: number) => {
    if (board[index] === '') {
      board[index] = player;
      setBoard(board);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const getWinner = () => {
    let winPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];

    for (let positions of winPositions) {
      if (board[positions[0]] == board[positions[1]] && board[positions[1]] == board[positions[2]]) {
        return board[positions[0]]
      }
    }
  }

  return (
    <div>
      <Navigation/>
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '50px 50px 50px',
        gridTemplateColumns: '50px 50px 50px',
      }}
    >
      {board.map((element, index) =>
        <div
          key={index}
          onClick={() => play(index)}
          style={{
            border: '1px solid black',
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          {element}
        </div>
      )}
      {getWinner() && <p style={{ gridColumnStart: 1, gridColumnEnd: "span 3" }}>{getWinner()} WINS!</p>}
    </div>
    </div>
  );
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