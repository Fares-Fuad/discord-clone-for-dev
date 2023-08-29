'use client';

import { FileUploadProps } from '@/types/FileUploadProps';
import { X } from 'lucide-react';

import { UploadButton } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';
import Image from 'next/image';

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
	const fileType = value.split('.').pop();

	if (value && fileType !== 'pdf') {
		return (
			<div className="relative h-20 w-20">
				<Image
					fill
					src={value}
					alt="Upload"
					className="rounded-full"
				/>
				<button
					onClick={() => onChange('')}
					className="bg-rose-700 text-white p-1
				rounded-full absolute top-0 right-0 shadow-sm
				"
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		);
	}
	return (
		<UploadButton
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				// Do something with the response
				console.log('Files: ', res);
				onChange(res?.[0].url);
			}}
			onUploadError={(error: Error) => {
				// Do something with the error.
				console.log(`ERROR! ${error.message}`);
			}}
		/>
	);
};
