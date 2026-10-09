// Proposal chrome: A/B/C switcher, phone-width toggle, working tabs, and a
// text-density badge on every option (characters visible before interaction ／ folded).
(function () {
  var BUDGET = Number(document.body.dataset.budget || 260)
  var bar = document.querySelector(".pp-bar")
  var opts = [].slice.call(document.querySelectorAll(".opt"))

  function count(node, folded, out) {
    if (node.nodeType === 3) {
      var n = node.textContent.replace(/\s+/g, "").length
      if (folded) out.folded += n
      else out.visible += n
      return
    }
    if (node.nodeType !== 1 || /^(SCRIPT|STYLE|SVG)$/i.test(node.tagName)) return
    var hide = folded || node.hidden || node.classList.contains("vh")
    var closed = node.tagName === "DETAILS" && !node.open
    ;[].forEach.call(node.childNodes, function (c) {
      count(c, hide || (closed && !(c.nodeType === 1 && c.tagName === "SUMMARY")), out)
    })
  }

  function measure() {
    opts.forEach(function (o) {
      var mock = o.querySelector(".mock")
      var head = o.querySelector(".opt-head")
      if (!mock || !head) return
      var out = { visible: 0, folded: 0 }
      count(mock, false, out)
      var badge = head.querySelector(".density") || head.appendChild(document.createElement("span"))
      badge.className = "density"
      badge.dataset.over = String(out.visible > BUDGET)
      badge.textContent = "可見 " + out.visible + " 字 ／ 收合 " + out.folded + " 字（上限 " + BUDGET + "）"
    })
  }

  // Tabs inside mocks
  ;[].forEach.call(document.querySelectorAll("[data-tabs]"), function (root) {
    var tabs = [].slice.call(root.querySelectorAll(".tablist button"))
    var panels = [].slice.call(root.querySelectorAll(":scope > .panel"))
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x, j) { x.setAttribute("aria-selected", String(i === j)) })
        panels.forEach(function (p, j) { p.hidden = i !== j })
        measure()
      })
    })
  })
  document.addEventListener("toggle", measure, true)

  if (bar) {
    var btns = [].slice.call(bar.querySelectorAll("button[data-show]"))
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.dataset.show
        opts.forEach(function (o) { o.hidden = !(k === "all" || o.dataset.opt === k) })
        btns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)) })
      })
    })
    var device = bar.querySelector("button[data-device]")
    if (device) {
      device.addEventListener("click", function () {
        var phone = document.body.dataset.device !== "phone"
        document.body.dataset.device = phone ? "phone" : "desktop"
        device.setAttribute("aria-pressed", String(phone))
      })
    }
    bar.hidden = false
  }
  measure()
})()
