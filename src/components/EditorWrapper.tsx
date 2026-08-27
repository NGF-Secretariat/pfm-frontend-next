"use client";

import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';

interface EditorWrapperProps {
  markdown: string;
  editorRef?: React.MutableRefObject<any>;
  onChange?: (content: string) => void;
  imageUploadHandler?: (file: File) => Promise<string>;
  apiKey?: string;
}

export default function EditorWrapper({
  markdown,
  editorRef,
  onChange,
  imageUploadHandler,
  apiKey,
}: EditorWrapperProps) {
  const [content, setContent] = useState(markdown || "");
  const tinyMceRef = useRef<any>(null);
  const prevMarkdownRef = useRef<string>(markdown);

  useEffect(() => {
    if (markdown !== undefined && markdown !== prevMarkdownRef.current) {
      prevMarkdownRef.current = markdown;
      setContent(markdown || "");
      if (tinyMceRef.current && tinyMceRef.current.getContent() !== markdown) {
        tinyMceRef.current.setContent(markdown || "");
      }
    }
  }, [markdown]);

  // Expose getMarkdown() and getContent() on editorRef
  useImperativeHandle(editorRef, () => ({
    getMarkdown: () => {
      return tinyMceRef.current ? tinyMceRef.current.getContent() : content;
    },
    getContent: () => {
      return tinyMceRef.current ? tinyMceRef.current.getContent() : content;
    }
  }), [content]);

  const tinymceApiKey = apiKey || process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "your_tinymce_api_key_here";

  const handleTinyMceChange = (newContent: string) => {
    prevMarkdownRef.current = newContent;
    setContent(newContent);
    if (onChange) onChange(newContent);
  };

  return (
    <div className="w-full flex flex-col gap-8 p-4 bg-slate-50 rounded-3xl border border-slate-200">
      {/* TINYMCE EDITOR */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <h3 className="text-base font-bold text-slate-800">TinyMCE Editor (Rich Text, Inline Images & HTML)</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">TinyMCE Workspace</span>
        </div>
        <div className="tinymce-editor-container">
          <TinyMCEEditor
            apiKey={tinymceApiKey}
            onInit={(evt, editor) => {
              tinyMceRef.current = editor;
            }}
            initialValue={markdown || ""}
            init={{
              height: 520,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks fontfamily fontsize | ' +
                'bold italic underline strikethrough forecolor backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'link image media table | removeformat code fullscreen help',
              content_style: 'body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; padding: 10px; } img { max-width: 100%; height: auto; border-radius: 8px; }',
              images_upload_handler: async (blobInfo) => {
                if (imageUploadHandler) {
                  try {
                    const file = new File([blobInfo.blob()], blobInfo.filename(), { type: blobInfo.blob().type });
                    const url = await imageUploadHandler(file);
                    return url;
                  } catch (err) {
                    console.error("TinyMCE Cloudinary upload error:", err);
                    throw new Error("Image upload failed");
                  }
                }
                return '';
              }
            }}
            onEditorChange={handleTinyMceChange}
          />
        </div>
      </div>
    </div>
  );
}
