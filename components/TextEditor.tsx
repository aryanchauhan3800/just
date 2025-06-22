"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import {
    Bold,
    Italic,
    Heading as Head,
    List,
    Code,
    Link as LinkIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import LinkModal from "./LinkModal";

type BlogEditorProps = {
    initialContent?: string;
    onContentChange: (content: string) => void;
};

const TextEditor = ({ initialContent = "", onContentChange }: BlogEditorProps) => {
    const [showLinkModal, setShowLinkModal] = useState(false);

    const editor = useEditor({
        extensions: [
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            StarterKit,
            Link.configure({
                autolink: true,
                linkOnPaste: true,
                openOnClick: true,
            }),
            Placeholder.configure({
                placeholder: "Enter blog content...",
                showOnlyWhenEditable: true,
                showOnlyCurrent: false,
                emptyEditorClass: "is-editor-empty",
            }),
        ],
        content: initialContent || "<p></p>",
        editable: true,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onContentChange(html);
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[8rem] p-0",
            },
        },
    });

    useEffect(() => {
        if (editor && initialContent !== undefined) {
            const currentContent = editor.getHTML();
            if (currentContent !== initialContent) {
                editor.commands.setContent(initialContent, false);
            }
        }
    }, [editor, initialContent]);

    if (!editor) return null;

    return (
        <div className="w-full overflow-hidden">
            {/* Toolbar */}
            <div className="bg-[#F3F4F8] border-y flex items-center gap-2 p-2 border-t">
                <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Bold className={editor.isActive("bold") ? "stroke-3 text-black" : "text-gray-600"} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic className={editor.isActive("italic") ? "stroke-3 text-black" : "text-gray-600"} />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Head className={editor.isActive("heading") ? "stroke-3 text-black" : "text-gray-600"} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-10">
                        {[1, 2, 3, 4, 5, 6].map((level) => (
                            <DropdownMenuItem
                                key={level}
                                onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
                                className={editor.isActive("heading", { level }) ? "font-semibold text-blue-500" : ""}
                            >
                                H{level}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List className={editor.isActive("bulletList") ? "stroke-3 text-black" : "text-gray-600"} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                    <Code className={editor.isActive("codeBlock") ? "stroke-3 text-black" : "text-gray-600"} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowLinkModal(true)}>
                    <LinkIcon className="text-gray-600" />
                </Button>
            </div>

            {/* Editor content area */}
            <div
                className="relative min-h-[10rem] w-full max-h-[30rem] overflow-y-auto border-b"
                style={{ resize: "vertical" }}
                onClick={() => editor.chain().focus().run()}
            >
                <EditorContent
                    editor={editor}
                    className="editor-content max-w-none focus:outline-none min-h-[8rem] px-4 py-2"
                />

                <LinkModal
                    open={showLinkModal}
                    onClose={() => setShowLinkModal(false)}
                    onSubmit={(url) => {
                        editor
                            .chain()
                            .focus()
                            .extendMarkRange("link")
                            .setLink({ href: url })
                            .run();
                    }}
                />
            </div>

            {/* Editor styles */}
            <style jsx>{`
                :global(.ProseMirror) {
                    outline: none !important;
                    border: none !important;
                    padding: 0 !important;
                    min-height: 8rem;
                    line-height: 1.6;
                }

                :global(.ProseMirror:focus) {
                    outline: none !important;
                }

                :global(.ProseMirror.is-editor-empty:first-child::before) {
                    content: attr(data-placeholder);
                    float: left;
                    color: #9ca3af;
                    pointer-events: none;
                    height: 0;
                    font-style: italic;
                }

                :global(.ProseMirror p) {
                    margin: 0.5rem 0;
                }

                :global(.ProseMirror p:first-child) {
                    margin-top: 0;
                }

                :global(.ProseMirror p:last-child) {
                    margin-bottom: 0;
                }
            `}</style>
        </div>
    );
};

export default TextEditor;
