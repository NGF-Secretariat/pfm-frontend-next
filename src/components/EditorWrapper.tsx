"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  InsertImage,
  tablePlugin,
  InsertTable,
  MDXEditorMethods,
  ListsToggle,
  ButtonWithTooltip,
  InsertThematicBreak,
  CodeToggle,
  DiffSourceToggleWrapper,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface EditorWrapperProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onChange?: (markdown: string) => void;
}

export default function EditorWrapper({ markdown, editorRef, onChange }: EditorWrapperProps) {
  return (
    <MDXEditor
      ref={editorRef}
      markdown={markdown}
      onChange={onChange}
      className="prose max-w-none"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 pb-2 mb-4 bg-gray-50 p-2 rounded-t-xl">
              {/* History */}
              <UndoRedo />

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Headings */}
              <BlockTypeSelect />

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Text Formatting */}
              <BoldItalicUnderlineToggles />

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Lists */}
              <ListsToggle />

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Quote */}
              <ButtonWithTooltip
                title="Blockquote"
                onClick={() => { }}
              >
                "
              </ButtonWithTooltip>

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Links */}
              <CreateLink />

              {/* Images */}
              <InsertImage />

              {/* Tables */}
              <InsertTable />

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Horizontal Rule */}
              <InsertThematicBreak />

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Code */}
              <CodeToggle />

              {/* Inline Code */}
              {/* <CodeFormat /> */}

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* Clear formatting */}
              <DiffSourceToggleWrapper>
                <button className="px-2 py-1 rounded hover:bg-gray-200">
                  Markdown
                </button>
              </DiffSourceToggleWrapper>
            </div>
          ),
        }),
      ]}
    />
  );
}
