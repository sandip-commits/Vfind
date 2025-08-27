"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateCounts = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || "";
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
      setCharCount(text.length);
    }
  }, []);

  // 🔑 Sync content with parent
  useEffect(() => {
    if (!editorRef.current) return;

    if (value) {
      // set fetched or parent-provided value
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
        updateCounts();
      }
    } else if (!value && editorRef.current.innerHTML.trim() === "") {
      // only set demo text if completely empty (first load)
      const demoContent = `<p>Job Description</p>`;
      editorRef.current.innerHTML = demoContent;
      onChange(demoContent);
      updateCounts();
    }
  }, [value, onChange, updateCounts]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateCounts();
    }
  }, [onChange, updateCounts]);

  const execCommand = useCallback(
    (command: string, value: string | boolean = false) => {
      document.execCommand(command, false, value as string);
      editorRef.current?.focus();
      handleInput();
    },
    [handleInput]
  );

  const insertList = useCallback(
    (type: "ul" | "ol") => {
      document.execCommand(
        type === "ul" ? "insertUnorderedList" : "insertOrderedList",
        false
      );
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        let node = sel.anchorNode as HTMLElement | null;
        while (node && node.nodeName !== type.toUpperCase()) {
          node = node.parentElement;
        }
        if (node) {
          node.style.listStyleType = type === "ul" ? "disc" : "decimal";
          node.style.margin = "1em 0";
          node.style.paddingLeft = "2em";
        }
      }
      editorRef.current?.focus();
      handleInput();
    },
    [handleInput]
  );

  const isCommandActive = useCallback((command: string): boolean => {
    return document.queryCommandState(command);
  }, []);

  if (!isClient) {
    return (
      <div className="border border-gray-200 rounded-lg bg-gray-50 animate-pulse">
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-gray-400">Loading editor...</div>
        </div>
      </div>
    );
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
    size = "sm",
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
    size?: "sm" | "md";
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`
        flex items-center justify-center transition-colors duration-150
        ${size === "sm" ? "w-8 h-8" : "px-3 h-8"}
        ${isActive ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
        rounded border-0 text-sm
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm relative">
      {/* Toolbar */}
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex flex-wrap gap-1 items-center sticky top-0 z-50">
        <ToolbarButton onClick={() => execCommand("bold")} isActive={isCommandActive("bold")} title="Bold"><Bold size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand("italic")} isActive={isCommandActive("italic")} title="Italic"><Italic size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand("underline")} isActive={isCommandActive("underline")} title="Underline"><Underline size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand("strikeThrough")} isActive={isCommandActive("strikeThrough")} title="Strikethrough"><Strikethrough size={16} /></ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <ToolbarButton onClick={() => insertList("ul")} isActive={isCommandActive("insertUnorderedList")} title="Bullet List"><List size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => insertList("ol")} isActive={isCommandActive("insertOrderedList")} title="Numbered List"><ListOrdered size={16} /></ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <ToolbarButton onClick={() => execCommand("justifyLeft")} title="Align Left"><AlignLeft size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand("justifyCenter")} title="Align Center"><AlignCenter size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand("justifyRight")} title="Align Right"><AlignRight size={16} /></ToolbarButton>
      </div>

      {/* Editor */}
      <div className="relative bg-white">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="min-h-[300px] p-4 outline-none focus:ring-0"
          suppressContentEditableWarning
        />
      </div>

      {/* Status Bar */}
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex gap-4 text-sm text-gray-500">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>

      {/* Styles */}
      <style jsx>{`
        [contenteditable] p { margin:0.5em 0; line-height:1.6; color:#374151; }
        [contenteditable] ul {
          list-style-type: disc !important;
          list-style-position: outside !important;
          padding-left: 2em;
          margin: 1em 0;
        }
        [contenteditable] ol {
          list-style-type: decimal !important;
          list-style-position: outside !important;
          padding-left: 2em;
          margin: 1em 0;
        }
        [contenteditable] li { margin:0.25em 0; line-height:1.5; }
        [contenteditable] strong { font-weight:700; }
        [contenteditable] em { font-style:italic; }
        [contenteditable] u { text-decoration:underline; }
        [contenteditable] s { text-decoration:line-through; }
      `}</style>
    </div>
  );
}
