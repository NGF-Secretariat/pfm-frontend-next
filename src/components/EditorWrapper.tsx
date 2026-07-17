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
  diffSourcePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  InsertCodeBlock,
  InsertAdmonition,
  StrikeThroughSupSubToggles,
  Separator,
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

  const wrappedImageUploadHandler = async (file: File): Promise<string> => {
    if (!imageUploadHandler) return "";
    setUploading(true);
    try {
      return await imageUploadHandler(file);
    } finally {
      setUploading(false);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    if (!imageUploadHandler) return;
    const files = e.clipboardData.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        e.preventDefault();
        try {
          const url = await wrappedImageUploadHandler(file);
          if (editorRef?.current) {
            editorRef.current.insertMarkdown(`![image](${url})`);
          }
        } catch (err) {
          console.error("Paste image upload failed:", err);
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
        try {
          const url = await wrappedImageUploadHandler(file);
          if (editorRef?.current) {
            editorRef.current.insertMarkdown(`![image](${url})`);
          }
        } catch (err) {
          console.error("Drop image upload failed:", err);
        }
      }
    }
  };

  return (
    <div
      onPaste={handlePaste}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative min-h-[400px] w-full word-editor-container"
    >
      {uploading && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50 rounded-2xl">
          <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-[#1D9E75] animate-spin" />
            <span className="text-xs font-semibold text-gray-600">Uploading image to Cloudinary... Please wait.</span>
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
          imageUploadHandler: wrappedImageUploadHandler
        }),
        tablePlugin(),
        codeBlockPlugin(),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', html: 'HTML', python: 'Python', txt: 'Plain Text' } }),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: markdown }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {/* History */}
              <UndoRedo />

              <Separator />

              {/* Headings */}
              <BlockTypeSelect />

              <Separator />

              {/* Text Formatting */}
              <BoldItalicUnderlineToggles />
              <StrikeThroughSupSubToggles />

              <Separator />

              {/* Lists */}
              <ListsToggle />

              <Separator />

              {/* Links & Rich media & Tables */}
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertCodeBlock />
              <InsertAdmonition />

              <Separator />

              {/* Horizontal Rule */}
              <InsertThematicBreak />

              {/* Inline Code */}
              <CodeToggle />

              <Separator />

              {/* View modes toggle */}
              <DiffSourceToggleWrapper>
                <button className="px-2 py-1 rounded hover:bg-gray-200 text-xs font-semibold text-gray-700 transition-colors">
                  Markdown Source
                </button>
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
    />
    </div>
  );
}
