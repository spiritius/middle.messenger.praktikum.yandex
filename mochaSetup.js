import { JSDOM } from 'jsdom';

// jsdom
const jsdom = new JSDOM('<body></body>');

globalThis.window = jsdom.window;
globalThis.document = jsdom.window.document;
globalThis.Node = jsdom.window.Node;
globalThis.MouseEvent = jsdom.window.MouseEvent;
