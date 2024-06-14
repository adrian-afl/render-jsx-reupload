import { css, html } from "@app/tags";

describe("Tags templates", () => {
  it("should still be css string when css template string is used", () => {
    expect(
      css`
        font-family: Arial;
      `.trim()
    ).toStrictEqual(`font-family: Arial;`);
  });
  it("should still be html string when html template string is used", () => {
    expect(html`<div>Hello</div>`).toStrictEqual("<div>Hello</div>");
  });
});
