import { RenderedNode } from "@app/types";

describe("Simple rendering", () => {
  it("should render a simple html tag", () => {
    const Component = (): RenderedNode => <div>Hello</div>;
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual("<div>Hello</div>");
  });

  it("should render a simple html within another html tag", () => {
    const Component = (): RenderedNode => (
      <div>
        <span>Hello</span>
        <br />
      </div>
    );
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual("<div><span>Hello</span><br/></div>");
  });

  it("should collapse an empty tag into a self closing one", () => {
    const Component = (): RenderedNode => <div></div>;
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual("<div/>");
  });

  it("should render empty fragment with its content", () => {
    const Component = (): RenderedNode => (
      <>
        <div>Hello</div>
        <div>Hello2</div>
      </>
    );
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual("<div>Hello</div><div>Hello2</div>");
  });

  it("should render a component inside a component", () => {
    const ComponentA = (): RenderedNode => <div>Hello</div>;
    const ComponentB = (): RenderedNode => (
      <div>
        <ComponentA />
      </div>
    );
    const rendered = <ComponentB />;
    expect(rendered.string).toStrictEqual("<div><div>Hello</div></div>");
  });

  it("should render an array of components, tags and values inside a component", () => {
    const ComponentA = (): RenderedNode => <div>Hello</div>;
    const ComponentB = (): RenderedNode => <div>Hello 2</div>;
    const ComponentC = (): RenderedNode => (
      <div>
        <ComponentA />
        <ComponentB />
        {"A string <test />"}
        {100}
        {false}
        {true}
        {null}
        {undefined}
        {{ htmlContent: "<script>console.log(true)</script>" }}
      </div>
    );
    const rendered = <ComponentC />;
    expect(rendered.string).toStrictEqual(
      "<div><div>Hello</div><div>Hello 2</div>A string &lt;test /&gt;100falsetrue<script>console.log(true)</script></div>"
    );
  });

  it("should throw when trying to render an invalid value", () => {
    expect(() => (<div>{{ value: "test" }}</div>) as unknown as string).toThrow(
      "Invalid value"
    );
  });
});
