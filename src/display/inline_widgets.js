import { elt, removeChildren } from "../util/dom.js"
import { regChange } from "./view_tracking.js"
// import { alignHorizontally } from "./line_numbers.js"
// import { updateGutterSpace } from "./update_display.js"

export function getInlineWidgetSpecs(widgets) {
  let result = [] // , sawLineNumbers = false
  for (let i = 0; i < widgets.length; i++) {
    let name = widgets[i], style = null
    if (typeof name != "string") { style = name.style; name = name.className }
    /* if (name == "CodeMirror-linenumbers") {
      if (!lineNumbers) continue
      else sawLineNumbers = true
    } */
    result.push({className: name, style})
  }
  // if (lineNumbers && !sawLineNumbers) result.push({className: "CodeMirror-linenumbers", style: null})
  return result
}

export function renderInlineWidgets(display) {
  let inlineWidgets = display.inlineWidgets, specs = display.inlineWidgetSpecs
  removeChildren(inlineWidgets)
  display.lineInlineWidget = null
  for (let i = 0; i < specs.length; ++i) {
    let {className, style} = specs[i]
    let gElt = inlineWidgets.appendChild(elt("div", null, "CodeMirror-inlineWidget " + className))
    if (style) gElt.style.cssText = style
    /* if (className == "CodeMirror-linenumbers") {
      display.lineMergeBtn = gElt
      gElt.style.width = (display.lineNumWidth || 1) + "px"
    } */
  }
  inlineWidgets.style.display = specs.length ? "" : "none"
  // updateMergeBtnSpace(display)
}

export function updateInlineWidgets(cm) {
  renderInlineWidgets(cm.display)
  regChange(cm)
  // alignHorizontally(cm)
}
