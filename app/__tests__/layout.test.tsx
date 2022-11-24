import { render, screen } from "@testing-library/react";

// Pages/Components
import RootLayout from "../layout";

const NAVIGATION_LINKS = ["Home", "Feedback Results"];

describe("Root Page Layout", () => {
  const setUpComponent = () => {
    render(<RootLayout />);
  };

  it.each(NAVIGATION_LINKS)(
    "Renders %s navigation link in the header",
    (link) => {
      setUpComponent();

      const linkDomElement = screen.getByText(link);

      expect(linkDomElement).toBeInTheDocument();
    }
  );

  it("Renders the SVG Logo in the header", () => {
    setUpComponent();

    const svgElement = screen.getByTitle("checkout.com");

    expect(svgElement).toBeInTheDocument();
  });

  it("Renders the <main> HTML DOM element", () => {
    setUpComponent();

    const mainElement = screen.getByTestId("main");

    expect(mainElement).toBeInTheDocument();
  });
});
