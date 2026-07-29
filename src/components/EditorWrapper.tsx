"use client";

import { useState, useRef, useImperativeHandle, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import { Loader2 } from 'lucide-react';

interface EditorWrapperProps {
  markdown: string;
  editorRef?: React.MutableRefObject<any>;
  onChange?: (content: string) => void;
  imageUploadHandler?: (file: File) => Promise<string>;
}

export default function EditorWrapper({ markdown, editorRef, onChange, imageUploadHandler }: EditorWrapperProps) {
  const [content, setContent] = useState(markdown || "");
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (markdown !== undefined && markdown !== content) {
      setContent(markdown || "");
    }
  }, [markdown]);

  // Expose getMarkdown() and getContent() on editorRef
  useImperativeHandle(editorRef, () => ({
    getMarkdown: () => {
      return content;
    },
    getContent: () => {
      return content;
    }
  }), [content]);

  const handleChange = (value: string) => {
    setContent(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Custom Image Upload handler for Quill Toolbar
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      if (imageUploadHandler) {
        setUploading(true);
        try {
          const url = await imageUploadHandler(file);
          const quill = quillRef.current?.getEditor();
          if (quill && url) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', url);
            quill.setSelection(range.index + 1, 0);
          }
        } catch (err) {
          console.error("Image upload failed:", err);
        } finally {
          setUploading(false);
        }
      }
    };
  };

  // MS Word style Quill toolbar with Align Left, Center, Right, Justify
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: handleImageUpload
      }
    }
  }), [imageUploadHandler]);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'bullet', 'indent',
    'blockquote', 'code-block',
    'link', 'image'
  ];

  return (
    <div className="relative w-full word-editor-workspace">
      {uploading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center z-50 rounded-2xl">
          <div className="bg-white px-5 py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-[#016630] animate-spin" />
            <span className="text-sm font-semibold text-gray-700">Uploading image to Cloudinary... Please wait.</span>
          </div>
        </div>
      )}

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Type or paste your article content here... Use the toolbar above to format text, align left/center/right, and insert Cloudinary images."
      />
    </div>
  );
}
