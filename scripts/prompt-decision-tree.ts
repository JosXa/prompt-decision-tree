// Name: Prompt Decision Tree

import "@johnlindquist/kit"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

type Node = {
  children: Node[]
  label: string
}

const originalNodes: Node[] = await readJson(path.join(__dirname, "prompt-decision-tree.json"))

const selections: Node[] = []
let nodes: Node[] = originalNodes

while (true) {
  const selection = await arg(
    { placeholder: "What do you want to achieve?", hint: buildHint() },
    nodes.map((n) => ({ name: n.children ? `${n.label}...` : n.label, value: n })),
  )

  selections.push(selection)

  if (!selection.children) {
    break
  }

  if (selection.children.length === 1) {
    selections.push(selection.children[0]!)
    break
  }

  nodes = selection.children
}

await div({ html: md(`~~~ts\n${selections.pop()?.label}\n~~~`), hint: buildHint() })

function buildHint() {
  return selections.map((x) => x.label).join(" ")
}
