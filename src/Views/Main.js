import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

function Main() {
  const [todoList, setTodoList] = useState([]);
  const [description, setDescription] = useState("");
  const [todoName, setTodoName] = useState("");
  const [colorTheme, setColorTheme] = useState(1)




  const ToDo = ({ name, description, onRemove, uuid }) => {
    const handleCheckboxChange = () => {
      onRemove(uuid);
    };

    return (
        <>
        <Fade bottom>
        <Container className="ToDo_Container">
            <Row className="ToDo_Row">
                <Col md={3} className="ToDo_Name_Col">
                <Form>
                    <Form.Group className="mb-1 mt-1" controlId="formBasicEmail">
                    <Form.Label> {name} </Form.Label>
                    </Form.Group>
                </Form>
                </Col>
            </Row>
            <Row className="ToDo_Row">
                <Col md={3} className="ToDo_Col">
                <Form>
                    <Form.Group className="mb-1 mt-1" controlId="formBasicEmail">
                    <Form.Label> {description} </Form.Label>
                    </Form.Group>
                </Form>
                </Col>
                <Col md={{ span: 3, offset: 6 }} className="Input_Col mb-1 mt-1" id="Add_Button_Col">
                <Form.Check
                    inline
                    className="checkBox"
                    name="group1"
                    type="checkbox"
                    label="Completed"
                    id={`inline-checkbox-1`}
                    onChange={handleCheckboxChange}
                />
                </Col>
            </Row>
      </Container>
      </Fade>
      </>
    );
  };

  const handleThemeChange = () =>{
    if(colorTheme+1 == 5){
        setColorTheme(1)
    }
    else{
        setColorTheme(colorTheme+1)
    }
  }

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleButtonClick = () => {
    const newUuid = uuid();
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      { uuid: newUuid, name: todoName, description: description },
    ]);
  };

  const removeTodo = (uuid) => {
    setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.uuid !== uuid));
  };

  useEffect(() => {
    console.log("todo list currently:", todoList);
  }, [todoList]);

  useEffect(() => {
    var r = document.querySelector(':root');
    switch(colorTheme){
        case 1:
            r.style.setProperty('--main-bg-color','#2C3333') //top
            r.style.setProperty('--main-text-color','#CBE4DE') //bottom
            r.style.setProperty('--main-todo-bg-color','#0E8388') // up 1 from bot
            r.style.setProperty('--main-button-color','#2E4F4F') // down 1 from top
            break;
        case 2:
            r.style.setProperty('--main-bg-color','#F6F1E9')
            r.style.setProperty('--main-text-color','#4F200D')
            r.style.setProperty('--main-todo-bg-color','#FF8400')
            r.style.setProperty('--main-button-color','#FFD93D')
            break;
        case 3:
            r.style.setProperty('--main-bg-color','#EB455F') //top
            r.style.setProperty('--main-text-color','#2B3467') //bottom
            r.style.setProperty('--main-todo-bg-color','#BAD7E9') // up 1 from bot
            r.style.setProperty('--main-button-color','#FCFFE7') // down 1 from top
            break;
        case 4:
            r.style.setProperty('--main-bg-color','#AA77FF')
            r.style.setProperty('--main-text-color','#62CDFF')
            r.style.setProperty('--main-todo-bg-color','#97DEFF')
            r.style.setProperty('--main-button-color','#C9EEFF')
            break;
    }
  }, [colorTheme]);

  return (
    <Container className="mainContainer">
      <Row className="Title_Row">
        <Col className="Title_Col" md={{span:4, offset:4}} xs={{span:4}}>
          TO-DO
        </Col>
        <Col md={{span:2, offset:2}} xs={{span:2, offset:4}}>
            <Button id="Change_Color_Button" onClick={handleThemeChange}>
                Change Color    
            </Button>
        </Col>
      </Row>
      <Row className="Input_Row">
        <Col md={3} className="Input_Col">
          <Form onSubmit={(e) => {e.preventDefault();handleButtonClick();}}>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label>Name of To-Do</Form.Label>
              <Form.Control type="text" placeholder="Do This" onChange={handleNameChange}/>
            </Form.Group>
          </Form>
        </Col>
        <Col md={3} className="Input_Col">
          <Form onSubmit={e => { e.preventDefault(); handleButtonClick();}}>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label>Description of To-Do</Form.Label>
              <Form.Control type="text" placeholder="I will..." onChange={handleDescriptionChange}  />
            </Form.Group>
          </Form>
        </Col>
        <Col md={{ span: 2, offset: 4 }} className="Input_Col mb-3 mt-3" id="Add_Button_Col">
          <Button type="submit" id="Add_Button" onClick={handleButtonClick}>
            Add
          </Button>
        </Col>
      </Row>
      {todoList.map((todo) => (
          <ToDo
          key={todo.uuid}
          uuid={todo.uuid}
          name={todo.name}
          description={todo.description}
          onRemove={removeTodo}
          />
          ))}
    </Container>
  );
}

export default Main;