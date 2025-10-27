'use client';
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useState } from "react";

import { postCode } from "@/actions";

export default function PostCode({slug} : {slug: string}) {

    const [posttitle , setposttitle] = useState("");
    const [postcode , setpostcode] = useState("");

    const submitCode = async () => {
        await postCode(posttitle , postcode , slug);

        setpostcode("");
        setposttitle("");
        alert('Code submitted successfully !')
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild><Button className="w-full bg-orange-500 text-xl hover:bg-orange-400 cursor-pointer">+ Post data</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription>
                        <Label className="text-2xl my-3">Enter title </Label>
                        <Input type="text" className="my-3" value={posttitle} onChange={(e) => setposttitle(e.target.value)} />
                        <Label className="text-2xl my-3">Enter code snippet</Label>
                        <Textarea value={postcode} onChange={(e) => setpostcode(e.target.value)} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-orange-500 hover:bg-orange-400 cursor-pointer" onClick={submitCode}>Submit</AlertDialogAction>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}