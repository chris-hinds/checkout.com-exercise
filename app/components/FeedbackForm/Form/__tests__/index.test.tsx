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

const FORM_FIELDS = ["name", "email", "rating", "comment"];

describe("Home Page", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {},
      push: pushMock,
    });
  });

  it("renders feedback form DOM element", () => {
    render(<FeedbackForm />);

    const feedbackFormElement = screen.getByTestId("feedback-form");

    expect(feedbackFormElement).toBeInTheDocument();
  });

  it.each(FORM_FIELDS)("Renders the %s form field", (formFieldName) => {
    render(<FeedbackForm />);

    const formFieldElement = screen.getByTestId(`form-field-${formFieldName}`);

    expect(formFieldElement).toBeInTheDocument();
  });
});
