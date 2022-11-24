import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Pages/Components
import HomePage from "../page";

// mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// setup a new mocking function for push method
const pushMock = jest.fn();

describe("Home Page", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {},
      push: pushMock,
    });
  });

  it("renders feedback form heading", () => {
    render(<HomePage />);

    const feedbackFormHeading = screen.getByRole("heading", {
      name: "How was your Experience?",
    });

    expect(feedbackFormHeading).toBeInTheDocument();
  });
});
