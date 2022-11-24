import { act, render, screen, fireEvent } from "@testing-library/react";
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

describe("Feedback Form Rendering", () => {
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

describe("Invalid Feedback Form Submission", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {},
      push: pushMock,
    });

    fetch.resetMocks();
  });

  it("Renders error notification for a comment of less than 20 characters", async () => {
    render(<FeedbackForm />);

    fireEvent.change(screen.getByTestId("form-field-name"), {
      target: { value: "Chris" },
    });
    fireEvent.change(screen.getByTestId("form-field-email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("form-field-rating"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByTestId("form-field-comment"), {
      target: {
        value: "Short comment",
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Send Feedback/i));
    });

    await screen.getByText("Please use at least 20 characters for the comment");
  });

  it("Renders error notification for a name of less than 2 characters", async () => {
    render(<FeedbackForm />);

    fireEvent.change(screen.getByTestId("form-field-name"), {
      target: { value: "C" },
    });
    fireEvent.change(screen.getByTestId("form-field-email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("form-field-rating"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByTestId("form-field-comment"), {
      target: {
        value:
          "test comment test comment test comment test comment test comment",
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Send Feedback/i));
    });

    await screen.getByText("name must be at least 2 characters");
  });

  it("Returns HTTP 409 error for a duplicate email submission", async () => {
    fetch.mockResponseOnce({}, { status: 409 });
    render(<FeedbackForm />);

    fireEvent.change(screen.getByTestId("form-field-name"), {
      target: { value: "Chris" },
    });
    fireEvent.change(screen.getByTestId("form-field-email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("form-field-rating"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByTestId("form-field-comment"), {
      target: {
        value:
          "test comment test comment test comment test comment test comment",
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Send Feedback/i));
    });

    await screen.getByText(
      "This email address has already been used to submit a review."
    );

    expect(pushMock).not.toHaveBeenCalled();
  });

  it("Returns error message for a failed API request", async () => {
    fetch.mockReject(new Error("fake error message"));
    render(<FeedbackForm />);

    fireEvent.change(screen.getByTestId("form-field-name"), {
      target: { value: "Chris" },
    });
    fireEvent.change(screen.getByTestId("form-field-email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("form-field-rating"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByTestId("form-field-comment"), {
      target: {
        value:
          "test comment test comment test comment test comment test comment",
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Send Feedback/i));
    });

    await screen.getByText("fake error message");

    expect(pushMock).not.toHaveBeenCalled();
  });
});

describe("Valid Feedback Form Submission", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {},
      push: pushMock,
    });

    fetch.resetMocks();
  });

  it("Submits feedback form and redirects to /results page", async () => {
    render(<FeedbackForm />);

    fireEvent.change(screen.getByTestId("form-field-name"), {
      target: { value: "Chris" },
    });
    fireEvent.change(screen.getByTestId("form-field-email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("form-field-rating"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByTestId("form-field-comment"), {
      target: {
        value:
          "test comment test comment test comment test comment test comment",
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Send Feedback/i));
    });

    expect(pushMock).toHaveBeenCalledWith("/results");
  });
});
