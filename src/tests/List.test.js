import List from '../List.jsx';
import {render,screen} from '@testing-library/react';
import "@testing-library/jest-dom"; //for matchers functions
import userEvent from "@testing-library/user-event";

//test the title of the component
test("test-title",()=>{
    render(<List withLocalStorage={false}/>);
    const title=screen.getByTestId("title");//from testing/react docs
    expect(title).toHaveTextContent("To Do List");//matcher = from jest dom docs
});


//test if btn is existed in DOM
test("test-btn-existence",()=>{
    render(<List withLocalStorage={false} />);
    const addTaskBtn=screen.getByTestId("add-btn");
    expect(addTaskBtn).toBeInTheDocument();
 
});


//test add task functionality
test("add task functionality",()=>{

    render(<List withLocalStorage={false}/>);

    //get the required eles
    const inputFeild=screen.getByTestId("task-input");
    const addBtn=screen.getByTestId("add-btn");

    //trigger the events
    userEvent.type(inputFeild,"Task test case");
    userEvent.click(addBtn);

    //extract the added task div
    const addedTask=screen.getByTestId("task-0")

    //comparison
    expect(addedTask).toBeInTheDocument();
});

 

//delete task functionality
test("delete task functionality",()=>{

     render(<List withLocalStorage={false}/>);
     

     //perform add task operation
     const addBtn=screen.getByTestId("add-btn");
     const inputFeild=screen.getByTestId("task-input");
     userEvent.type(inputFeild,"Task1 added");
     userEvent.click(addBtn);
     //so from here Task1 added will be shown within tasks div of List
    const addedTask=screen.getByTestId("task-0");

    //perform delete task operation
    //get the required elems
    const delBtn=screen.getByTestId("del-btn-0");
    userEvent.click(delBtn);

    expect(addedTask).not.toBeInTheDocument();
});


// i fetch the tasks by their data-testid not by their content(screen.getByText()) since we may have multiple tasks with same content!