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
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface EditorWrapperProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onChange?: (markdown: string) => void;
  imageUploadHandler?: (file: File) => Promise<string>;
}

export default function EditorWrapper({ markdown, editorRef, onChange, imageUploadHandler }: EditorWrapperProps) {
  const [uploading, setUploading] = useState(false);

  const handlePaste = async (e: React.ClipboardEvent) => {
    if (!imageUploadHandler) return;
    const files = e.clipboardData.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        e.preventDefault();
        setUploading(true);
        try {
          const url = await imageUploadHandler(file);
          if (editorRef?.current) {
            editorRef.current.insertMarkdown(`![image](${url})`);
          }
        } catch (err) {
          console.error("Paste image upload failed:", err);
        } finally {
          setUploading(false);
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!imageUploadHandler) return;
    const items = e.dataTransfer.items;
    let hasImage = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        hasImage = true;
        break;
      }
    }
    if (hasImage) {
      e.preventDefault();
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    if (!imageUploadHandler) return;
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        e.preventDefault();
        setUploading(true);
        try {
          const url = await imageUploadHandler(file);
          if (editorRef?.current) {
            editorRef.current.insertMarkdown(`![image](${url})`);
          }
        } catch (err) {
          console.error("Drop image upload failed:", err);
        } finally {
          setUploading(false);
        }
      }
    }
  };

  return (
    <div
      onPaste={handlePaste}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative min-h-[400px] w-full"
    >
      {uploading && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50">
          <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-[#1D9E75] animate-spin" />
            <span className="text-xs font-semibold text-gray-600">Uploading dropped image...</span>
          </div>
        </div>
      )}
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
        imagePlugin({
          imageUploadHandler: imageUploadHandler
        }),
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
    </div>
  );
}
