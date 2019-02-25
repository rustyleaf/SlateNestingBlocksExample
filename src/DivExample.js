import { Editor } from "slate-react";
import { Value } from "slate";

import React from "react";
import initialValueAsJson from "./value.json";

const initialValue = Value.fromJSON(initialValueAsJson);

const schema = {
  document: {
    nodes: [
      {
        match: [{ type: 'div' }],
      },
    ],
  },
  normalize: (editor, error) => {
    if (error.code === 'child_type_invalid') {
      //editor.wrapNodeByKey(error.child.key, { type: 'div' })
    }
  },
  blocks: {
    paragraph: {
      nodes: [
        {
          match: { object: 'text' },
        },
      ],
    }
  },
}

const helpers = {
  commands: {
    addNewSubtitle(editor) {
      const { value } = editor;
      const { document } = value;
      let { subtitle } = editor
      subtitle = subtitle || {
          "object": "block",
          "type": "div",
          "nodes": [
            {
              "type": "p",
              "object": "block",
              "nodes": [
                {
                  "object": "text",
                  "leaves": [
                    {
                      "text": ""
                    }
                  ]
                }
              ]
            }
          ]
        }

      const indexOfSelectedBlock = editor.getSubtitleIndex() + 1
      editor.insertNodeByKey(document.key, indexOfSelectedBlock, subtitle)
    },
    moveForwardXSubtitles(editor, x=1) {
      const { value } = editor
      const { document } = value
      const currentSubtitleIndex =  editor.getSubtitleIndex()
      const nextSubtitle = document.nodes.get(currentSubtitleIndex + x)
      editor
        .moveTo(nextSubtitle.key)
        .focus()
    }
  },
  queries: {
    getParentSubtitle(editor) {
      const { value } = editor
      const { startBlock, document} = value;
      return document.getFurthestAncestor(startBlock.key, b => b.object !== 'document');
    },
    getSubtitleIndex(editor) {
      const { document } = editor.value;
      const parent = editor.getParentSubtitle()
      return document.nodes.indexOf(parent)
    }
  }
}

const plugins = [helpers];

class DivExample extends React.Component {
  render() {
    return (
      <Editor
        placeholder="Enter a title..."
        defaultValue={initialValue}
        renderNode={this.renderNode}
        onKeyDown={this.onKeyDown}
        schema={schema}
        plugins={plugins}
      />
    );
  }

  onKeyDown = (event, editor, next) => {

    switch (event.key) {
      case "F2":
        
        editor
        .addNewSubtitle()
        .moveForwardXSubtitles()

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
