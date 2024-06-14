import { renderJSX } from "@app/rendering";
import { JSXChildren, JSXNode, RenderedNode } from "@app/types";

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace JSX {
  // Set the attributes to allow any keys and very permissive values
  export type HTMLAttributes = Record<string, JSXNode | undefined> &
    JSXChildren;

  // Allow any html tag
  export type IntrinsicElements = Record<string, HTMLAttributes>;

  // Declare the shape of JSX rendering result
  // This is required so the return types of components can be inferred
  export type Element = RenderedNode;
}

// Expose the main namespace
export { JSX };

// Expose factories
export const jsx = renderJSX;
export const jsxs = renderJSX;
export const jsxDEV = renderJSX;
