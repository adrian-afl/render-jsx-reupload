import { RenderedNode } from "@app/types";

describe("Props rendering", () => {
  it("should render a simple html tag with a string prop", () => {
    const Component = (): RenderedNode => <div class="divclass">Hello</div>;
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual(`<div class="divclass">Hello</div>`);
  });

  it("should render a simple html tag with a number prop", () => {
    const Component = (): RenderedNode => <div data-test={1}>Hello</div>;
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual(`<div data-test="1">Hello</div>`);
  });

  it("should render a simple html tag with a bigint prop", () => {
    const Component = (): RenderedNode => <div data-test={1n}>Hello</div>;
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual(`<div data-test="1">Hello</div>`);
  });

  it("should render a simple html tag with a boolean prop", () => {
    const Component = (): RenderedNode => (
      <div data-test={true} data-test-2={false}>
        Hello
      </div>
    );
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual(
      `<div data-test="true" data-test-2="false">Hello</div>`
    );
  });

  it("should render a simple html tag with a function prop", () => {
    const Component = (): RenderedNode => (
      <div data-test={() => "test"}>Hello</div>
    );
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual(`<div data-test="test">Hello</div>`);
  });

  it("should render a simple html tag with a null prop", () => {
    const Component = (): RenderedNode => <div data-test={null}>Hello</div>;
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual(`<div data-test="">Hello</div>`);
  });

  it("should render a simple html tag with a undefined prop", () => {
    const Component = (): RenderedNode => (
      <div data-test={undefined}>Hello</div>
    );
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual(`<div data-test="">Hello</div>`);
  });

  it("should render a simple html tag with props with mixed letter case", () => {
    const Component = (): RenderedNode => (
      <div onClick={() => "test"} DATA-Test={1}>
        Hello
      </div>
    );
    const rendered = <Component />;
    expect(rendered.string).toStrictEqual(
      `<div onClick="test" DATA-Test="1">Hello</div>`
    );
  });

  it("should throw when trying to render an invalid type as a prop value", () => {
    const Component = (): RenderedNode => (
      <div data-test={{ value: "test" }}>Hello</div>
    );
    expect(() => <Component />).toThrow("Invalid value");
  });
});
