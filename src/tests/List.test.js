import List2 from '../List2.jsx';
import {render,screen} from '@testing-library/react';
import "@testing-library/jest-dom"; //for matchers functions

//test the title of the component
test("test-title",()=>{
    render(<List2/>);
    const title=screen.getByTestId("title");//from testing/react docs
    expect(title).toHaveTextContent("To Do List with localstorage");//matcher = from jest dom docs
});


//test if btn is existed in DOM
test("test-btn-existence",()=>{
    render(<List2/>);
    const addTaskBtn=screen.getByText("Add Task");
    expect(addTaskBtn).toBeInTheDocument();
 
})

