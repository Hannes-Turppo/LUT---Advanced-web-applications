import React,{ act } from "react";
import About from "../components/About"; // Assuming About is a React component
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extra matchers like .toBeInTheDocument

// Mocking react-router-dom's BrowserRouter
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

// Mocking global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: "title 1" },
        { id: 2, title: "title 2" },
      ]),
  }) as any // Type assertion because we're providing a mock implementation
);

test("About page uses useEffect", async () => {
  // Rendering the component inside the I18nextProvider
  await act(async () => {
    render(<About />);
  });

  // Ensure fetch was called during the render
  expect(fetch).toHaveBeenCalled();

  // Wait for the content to appear after fetching
  await waitFor(() => {
    expect(screen.getByText("title 1")).toBeInTheDocument();
    expect(screen.getByText("title 2")).toBeInTheDocument();
  });
});
