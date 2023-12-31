"use client";

import { UploadDropzone } from '@/lib/uploadthing'

import { X } from 'lucide-react'

import '@uploadthing/react/styles.css'
import Image from 'next/image';

interface FileUploadProps {
    endpoint: 'serverImage' | 'messageFile';
    onChange: (url?: string) => void
    value: string;
}

export const FileUpload = ({
    endpoint,
    onChange,
    value,
}: FileUploadProps) => {

    const fileType = value.split('.').pop()

    if (value && fileType !== 'pdf') {
        return (
            <div className='relative h-20 w-20'>
                <Image
                    fill
                    src={value}
                    alt='Upload'
                    className='rounded-full'
                />
                <button
                    onClick={() => onChange('')}
                    className='bg-rose-500 text-white absolute 
                        top-0 right-0 rounded-full p-1 shadow-sm'
                    type='button'
                >
                    <X className='h-4 w-4' />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) =>
                onChange(res?.[0]?.url)
            }
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}