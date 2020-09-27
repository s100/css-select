import * as helper from "./helper";
import CSSselect from "../../src";
import type { Element, Node } from "domhandler";
let document = loadDoc();

export function loadDoc(): helper.SimpleDocument {
    return (document = helper.getDocument("sizzle.html"));
}

/**
 * Returns an array of elements with the given IDs
 * @example q("main", "foo", "bar")
 * @result [<div id="main">, <span id="foo">, <input id="bar">]
 */
export function q(...ids: string[]): Element[] {
    return ids.map((id) => document.getElementById(id));
}

/**
 * Asserts that a select matches the given IDs
 * @param assertionName - Assertion name
 * @param selector - Selector
 * @param expectedIds - Array of ids to construct what is expected
 * @example t("Check for something", "//[a]", ["foo", "baar"]);
 * @returns `true` iff the selector produces the expected elements.
 */
export function t(selector: string, expectedIds: string[]): void {
    const actual = CSSselect(selector, document) as Element[];
    const actualIds = actual.map((e) => e.attribs.id);

    // Should not contain falsy values
    expect(actualIds).toStrictEqual(expectedIds);
}

const xmlDoc = helper.getDOMFromPath("fries.xml", {
    xmlMode: true,
});

export function createWithFriesXML(): Node[] {
    return xmlDoc;
}
