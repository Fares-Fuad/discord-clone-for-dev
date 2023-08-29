'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import * as z from 'zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FileUpload } from '../file-upload';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Server name is required',
	}),
	imageUrl: z.string().min(1, {
		message: 'Server image is required',
	}),
});

const InitialModal = () => {
	const [mounted, setMounted] = useState(false);

	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			imageUrl: '',
		},
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log('🚀 ~ file: initial-modal.tsx:57 ~ onSubmit ~ values:', values);
		try {
			await axios.post('/api/server', values);

			form.reset();
			// router.refresh();
			// window.location.reload();
		} catch (error) {
			console.log('🚀 ~ file: initial-modal.tsx:56 ~ onSubmit ~ error:', error);
		}
	};

	if (!mounted) return <></>;
	return (
		<Dialog open>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Customize Your Server
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-800">
						Give your server a personality with a name and an image. You can
						always change it later.
					</DialogDescription>
				</DialogHeader>
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 "
					>
						<div className="space-y-8 px-8 ">
							<div className="flex items-center justify-center text-center">
								<FormField
									control={form.control}
									name="imageUrl"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload
													endpoint="serverImage"
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="uppercase text-xs font-bold text-zinc-800 dark:text-secondary/70">
											Server Name
										</FormLabel>
										<FormControl>
											<Input
												required
												disabled={isLoading}
												className="bg-zinc-800 text-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
												placeholder="Enter Server name "
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="bg-gray-100 px-6 py-4 ">
							<Button
								type="submit"
								variant={'primary'}
								disabled={isLoading}
							>
								Create
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};

export default InitialModal;
