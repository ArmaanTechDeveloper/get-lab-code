import ShowSnippet from "@/components/ShowSnippet";
import PostCode from "@/components/PostCode";
import { checkSlugExist, getCode } from "@/actions";

type PageProps = {
  params: {
    folder: string;
  };
};

export default async function Folder({params} : any) {

    const slug = await params.folder;

    const response = await checkSlugExist(slug);

    if(response.found == 'success'){

        const dbcodes = await getCode(slug);

        return (
            <div className="w-full flex justify-center items-center">
                <div className="w-1/2 flex flex-col py-3 h-full  ">
                <PostCode slug={slug}/>
                <ShowSnippet codes={dbcodes} />
                </div>
            </div>
        )
    }
    else{
        console.log('failed')
    }

    

    return (
        <div>
            {JSON.stringify(response)}
        </div>
    )
}

export const revalidate = 60;