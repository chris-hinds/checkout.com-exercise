import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Pages/Components
import FeedbackForm from "../index";

// mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// setup a new mocking function for push method
const pushMock = jest.fn();

describe("Feedback Form Container", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {},
      push: pushMock,
    });
  });

  it("renders feedback form heading", () => {
    render(<FeedbackForm />);

    const feedbackFormHeading = screen.getByRole("heading", {
      name: "How was your Experience?",
    });

    expect(feedbackFormHeading).toBeInTheDocument();
  });
});
