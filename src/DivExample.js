import { Editor } from "slate-react";
import { Block, Value } from "slate";
import { Grid, Typography } from "@material-ui/core";

import React from "react";
import initialValueAsJson from "./value.json";

const initialValue = Value.fromJSON(initialValueAsJson);

class DivExample extends React.Component {
  render() {
    return (
      <Editor
        placeholder="Enter a title..."
        defaultValue={initialValue}
        renderNode={this.renderNode}
        onKeyDown={this.onKeyDown}
      />
    );
  }

  onKeyDown = (event, editor, next) => {
    const { value, props } = editor;
    const { previousBlock, document } = value;

    const divBlock = {
      object: "block",
      type: "div"
    };

    switch (event.key) {
      case "F2":
        event.preventDefault();
        editor.moveToEndOfBlock();
        editor.insertBlock(divBlock);
        break;
      default:
        return next();
    }
  };

  /**
   * Render Slate nodes.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "div":
        return (
          <div className="div" {...attributes}>
            {children}
          </div>
        );
      case "p":
        return <p {...attributes}>{children}</p>;
      default:
        return next();
    }
  };
}

/**
 * Export.
 */

export default DivExample;
