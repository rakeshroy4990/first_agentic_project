import { defineComponent, h, type PropType } from "vue";
import type { UINode } from "../../core/ui-types";

const renderNode = (node: UINode) => {
  const children = node.children?.map((child) => renderNode(child));
  const body = node.text ?? children;
  return h(node.tag, node.attrs ?? {}, body);
};

export default defineComponent({
  name: "UiNodeRenderer",
  props: {
    nodes: {
      type: Array as PropType<UINode[]>,
      required: true
    }
  },
  setup(props) {
    return () => h("section", { class: "runtime-html" }, props.nodes.map(renderNode));
  }
});
