import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface RichTextEditorProps {
    value: string;
    onChange: (data: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    return (
        <div className="ckeditor-wrapper text-gray-900 text-left font-sans border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
            <CKEditor
                editor={ClassicEditor}
                data={value || ""}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                config={{
                    toolbar: [
                        "heading", "|",
                        "bold", "italic", "link", "bulletedList", "numberedList", "|",
                        "outdent", "indent", "|",
                        "blockQuote", "insertTable", "undo", "redo"
                    ],
                    placeholder: "Write content here..."
                }}
            />
            
            {/* Inject custom CKEditor theme styles to match our premium aesthetic */}
            <style>{`
                .ck-editor__editable_inline {
                    min-height: 220px;
                    max-height: 450px;
                    font-size: 14px;
                    line-height: 1.6;
                    padding: 0 16px !important;
                }
                .ck.ck-editor__main>.ck-editor__editable {
                    background: #ffffff;
                    border-bottom-left-radius: 12px !important;
                    border-bottom-right-radius: 12px !important;
                    border-color: #e5e7eb !important;
                }
                .ck-toolbar {
                    background-color: #f9fafb !important;
                    border-top-left-radius: 12px !important;
                    border-top-right-radius: 12px !important;
                    border-color: #e5e7eb !important;
                }
                .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
                    outline: none !important;
                    border-color: #7C3AED !important;
                    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
                }
            `}</style>
        </div>
    );
}
