"use client";

import { Button } from "@/components/ui/button";

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
import { useEffect, useState } from "react";
import { createNewPath, getAllPath } from "@/actions";

export default function Home() {

  const [inputpath, setinputpath] = useState("");
  const [previouspaths, setpreviouspaths] = useState<{ path: String }[]>([]);

  const getpaths = async () => {
    const response = await getAllPath();
    setpreviouspaths(response)
  }

  const submitInputPath = async () => {
    const response = await createNewPath(inputpath);
    if (response) {
      getpaths();
      setinputpath("")
    }
  }

  useEffect(() => {


    getpaths()

  }, [])

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-1/2 flex flex-col py-3 h-full  ">
        <AlertDialog>
          <AlertDialogTrigger asChild><Button className="w-full bg-orange-500 text-xl hover:bg-orange-400 cursor-pointer">+ Create new folder</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">Enter new folder path</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="something-something" value={inputpath} onChange={(e) => setinputpath(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-orange-500 hover:bg-orange-400 cursor-pointer" onClick={submitInputPath}>Submit</AlertDialogAction>
              <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        <div className="flex flex-col">
          <h1 className="text-2xl">OPEN FOLDERS</h1>

          <div className="flex flex-col text-2xl text-blue-400">

            {previouspaths.map((temp) => <a href={`${temp.path}`} key={`${temp.path}`} className="inline-block border-2 p-3 border-black my-2">{temp.path}</a>)}
          </div>
        </div>
      </div>
    </div>
  );
}
