export interface FileUploadProps {
	onChange: (url?: string) => void;
	value: string;
	endpoint: 'messageFile' | 'serverImage';
}
