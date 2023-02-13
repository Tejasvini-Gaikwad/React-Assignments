import { render, screen, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "react-query";
import DatePicker from "react-datepicker";
import Button from 'react-bootstrap/Button';
import ListTodo from './ListTodo';

const mockSetList = jest.fn()
const queryClient = new QueryClient();
const MockAddTodo = () => {
  return(
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AddTodo list = {[]} setList = {mockSetList} />
    </BrowserRouter>
    </QueryClientProvider>
  )
  
}

const MockListToDo = () => {
  return(
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ListTodo list = {[]} updateCompleted = {()=>{}} deleteCompletedItems={()=>{}} pageNumber="10" setPageNumber={()=>{}} />
    </BrowserRouter>
    </QueryClientProvider>
  )
  
}

describe('Add To do',() => {
  test('should render add todo component', () => {
    render(<MockAddTodo/>);
    const inputEl = screen.queryByTestId("name");
    expect(inputEl).toBeInTheDocument();
    // expect(inputEl).toHaveAttribute("type", "text");
  });
  
  test('should render add todo heading',  () => {
    render(<MockAddTodo />);
    const headingElement = screen.queryByTestId('heading');
    expect(headingElement).toBeInTheDocument();
  });

  it('should render add todo visible',  () => {
    render(<MockAddTodo />);
    const headingElement = screen.queryByTestId('heading');
    expect(headingElement).toBeVisible();
  });

  test('test button',  async() => {
    const {getByTestId} = render(<MockAddTodo />);
      const button = getByTestId('button')
      // console.log(button)
      expect(button).toBeTruthy()
  });
})

describe('List To do',() => {
  it('render list item',()=>{
    render(<MockListToDo />)
    const headingElement = screen.getByText(/To Do List/i)
    expect(headingElement).toBeInTheDocument();
  })

  it('search item',()=>{
    render(<MockListToDo />)
    const searchElement = screen.getByTestId("search")
    expect(searchElement).toBeInTheDocument();
  })

  it('render empty list',()=>{
    render(<MockListToDo />)
    const emptyElement = screen.getByText(/No Data Found/i)
    expect(emptyElement).toBeInTheDocument();
  })

  it('render empty list',()=>{
    render(<MockListToDo />)
    const emptyElement = screen.getByText(/No Data Found/i)
    expect(emptyElement).toBeVisible();
  })

  it('render empty list',()=>{
    render(<MockListToDo />)
    const emptyElement = screen.getByText(/No Data Found/i)
    expect(emptyElement).toBeValid();
  })

})
