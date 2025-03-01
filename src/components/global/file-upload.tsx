import { FileIcon } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "../../lib/uploadthing";
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import DeleteButton from "./delete-button";

interface IProps {
    apiEndpoint: 'agencyLogo' | 'avatar' | 'subaccountLogo';
    onChange: (url: string) => void;
    value?: string;
}
const FileUpload = ({ apiEndpoint, onChange, value }: IProps) => {
    const type = value?.split('.').pop();
    if (value) {
        return (<div className="flex flex-col justify-center items-center">
            {
                type !== 'pdf' ?
                    (<div className="relative w-40 h-40">
                        <Image
                            src={value}
                            alt="uploaded image"
                            className="object-contains"
                            fill
                        />
                    </div>)
                    :
                    (<div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                        <FileIcon />
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener_noreferrer"
                            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                            View PDF
                        </a>
                    </div>)
            }
            <DeleteButton onChange={onChange} value={value} />
        </div>)
    }
    return (
        <div className="w-full bg-muted/30">
            <UploadDropzone<OurFileRouter, 'agencyLogo' | 'avatar' | 'subaccountLogo'>
                endpoint={apiEndpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url)
                }}
                onUploadError={(error: Error) => {
                    console.log(error)
                }}
            />
        </div>
    )
}
export default FileUpload;