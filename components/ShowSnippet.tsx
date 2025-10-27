'use client';

import { Button } from "./ui/button";
import SyntaxHighlighter from "react-syntax-highlighter";

interface snippet {
    id: number, slug: string, snippet: string, title: string
}

export default function ShowSnippet({ codes }: { codes: snippet[] }) {
    const copyToClipboard = (snippet: snippet) => {
        navigator.clipboard.writeText(snippet.snippet)
        alert(`Copied to clipboard ${snippet.title}`)
    }

    return <div>
        {codes.map((snippet) => (
            <div key={`${snippet.id}`} className="flex flex-col">
                <div className='d-flex justify-content-between my-2'>
                    <h1 className="text-3xl inline">{`${snippet.title}`}</h1>
                    <Button type="button" className="btn btn-dark mb-1 float-right cursor-pointer" onClick={() => copyToClipboard(snippet)}>Copy</Button>
                </div>
                <div>
                    <SyntaxHighlighter language="c">
                        {snippet.snippet}
                    </SyntaxHighlighter>
                </div>
            </div>
        ))}
    </div>
}