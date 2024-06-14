import { escapeHTML, escapeProp } from "@app/escaping";
import { JSX } from "@app/jsx-runtime";
import { serialize } from "@app/serialize";
import { FunctionComponent, RenderedNode } from "@app/types";

function renderAttributes(attributes: JSX.HTMLAttributes): string {
  return Object.entries(attributes)
    .filter((prop) => prop[0] !== "children")
    .map((prop) => {
      const value = serialize(prop[1], escapeProp);
      return `${prop[0]}="${value}"`;
    })
    .join(" ");
}

function renderChildren(attributes: JSX.HTMLAttributes): string {
  const children = attributes.children;
  if (!children) {
    return "";
  }
  const childrenArray = !Array.isArray(children) ? [children] : children;
  return childrenArray.map((c) => serialize(c, escapeHTML)).join("");
}

function renderTag(tag: string, attributes: string, children: string): string {
  const tagWithAttributes = [tag, attributes].join(" ").trim();
  if (children.length !== 0) {
    // render open and close tags
    return `<${tagWithAttributes}>${children}</${tag}>`;
  } else {
    // render only one self-closing tag
    return `<${tagWithAttributes}/>`;
  }
}

export function renderJSX(
  tag: string | FunctionComponent | undefined,
  props: JSX.HTMLAttributes,
  _key?: string
): JSX.Element {
  if (typeof tag === "function") {
    // handling for Function Components
    return tag(props);
  } else if (tag === undefined) {
    // handling for <></>
    return new RenderedNode(renderChildren(props));
  } else {
    // handling for plain HTML codes
    return new RenderedNode(
      renderTag(tag, renderAttributes(props), renderChildren(props))
    );
  }
}
