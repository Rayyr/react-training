import App from "../App.jsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

function addTask(taskName) {
  const input = screen.getByRole("textbox");
  const addBtn = screen.getByText("Add Task");

  userEvent.type(input, taskName);
  userEvent.click(addBtn);
}

test("All filter shows active and completed tasks", () => {
  render(<App />);

  addTask("Task 1");
  addTask("Task 2");

  const activeButtons = screen.getAllByText("Active");
  userEvent.click(activeButtons[0]); // make Task 1 completed

  userEvent.click(screen.getByText("All"));

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});

test("Active filter shows only active tasks", () => {
  render(<App />);

  addTask("Task 1");
  addTask("Task 2");

  const activeButtons = screen.getAllByText("Active");
  userEvent.click(activeButtons[1]); //make Task 1 completed

  userEvent.click(activeButtons[0]);//active btn

  expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});

test("Completed filter shows only completed tasks", () => {
  render(<App />);

  addTask("Task 1");
  addTask("Task 2");

  const activeButtons = screen.getAllByText("Active");
  userEvent.click(activeButtons[1]); // make Task 1 completed

  userEvent.click(screen.getAllByText("Completed")[0]);

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
});