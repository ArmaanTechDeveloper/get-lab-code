'use client';
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { checkSlugExist } from "@/actions";
import { postCode , getCode } from "@/actions";
import SyntaxHighlighter from 'react-syntax-highlighter';

interface snippet {
    id: number , slug: string,  snippet: string , title: string
}

export default function Folder() {
    const params = useParams()
    const slug = params.folder as string;

    const [posttitle , setposttitle] = useState("");
    const [postcode , setpostcode] = useState("");
    const [codes , setcodes] = useState<snippet[]>([]);
    
    const getcodeonclient = async () => {
        const cc = await getCode(slug);
        setcodes(cc);
    }
    const submitCode = async () => {
        const response = await postCode(posttitle , postcode , slug);

        getcodeonclient()
        setpostcode("");
        setposttitle("");
    }


    const checkslug = async () => {
        const response = await checkSlugExist(slug);
        // if response.found == 'failed' navigate to 404 page
        if(response.found == 'success'){
            getcodeonclient()
        }
    }

    const copyToClipboard = (snippet: snippet) => {
        navigator.clipboard.writeText(snippet.snippet)
        alert(`Copied to clipboard ${snippet.title}`)
    }

    useEffect(() => {
        checkslug()
    }, [])

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-1/2 flex flex-col py-3 h-full  ">
                <AlertDialog>
                    <AlertDialogTrigger asChild><Button className="w-full bg-orange-500 text-xl hover:bg-orange-400 cursor-pointer">+ Post data</Button></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle></AlertDialogTitle>
                            <AlertDialogDescription>
                                <Label className="text-2xl my-3">Enter title </Label>
                                <Input type="text" className="my-3" value={posttitle} onChange={(e) => setposttitle(e.target.value)}/>
                                <Label className="text-2xl my-3">Enter code snippet</Label>
                                <Textarea value={postcode} onChange={(e) => setpostcode(e.target.value)}/>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction className="bg-orange-500 hover:bg-orange-400 cursor-pointer" onClick={submitCode}>Submit</AlertDialogAction>
                            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            <div>
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
            </div>
        </div>
    )
}