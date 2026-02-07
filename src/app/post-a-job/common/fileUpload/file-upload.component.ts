import { Component, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FileUploadService } from '../../services/fileUpload.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
	@Output() filesSelected = new EventEmitter<File[]>();

	previews: Array<{ file: File; url: string | null; type: 'image' | 'other' }> = [];
	private objectUrls: string[] = [];

	loading = false;
	uploadResults: any[] = [];

	constructor(private fileUploadService: FileUploadService) {}

	onFileInputChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		const files = input.files ? Array.from(input.files) : [];
		this.filesSelected.emit(files);

		// Allow re-selecting the same files
		if (input) {
			input.value = '';
		}
	}

	onChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) {
			return;
		}

		const files = Array.from(input.files);

		// Clear previous previews when selecting again. Remove this if you want to append.
		this.clearPreviews();

		for (const file of files) {
			const isImage = file.type.startsWith('image/');
			const url = isImage ? URL.createObjectURL(file) : null;

			if (url) {
				this.objectUrls.push(url);
			}

			this.previews.push({
				file,
				url,
				type: isImage ? 'image' as const : 'other' as const
			});
		}

		// Emit files to parent (e.g., add-photos component) if it wants to use them
		this.filesSelected.emit(this.previews.map(p => p.file));

		// Reset the input value so selecting the same files again will still trigger change
		input.value = '';
	}

	removeFile(index: number): void {
		const removed = this.previews.splice(index, 1)[0];
		if (removed?.url) {
			URL.revokeObjectURL(removed.url);
			this.objectUrls = this.objectUrls.filter(u => u !== removed.url);
		}
		this.filesSelected.emit(this.previews.map(p => p.file));
	}

	onUpload(): void {
		if (!this.previews.length) {
			return;
		}
		this.loading = true;

		// Upload each selected file; assumes FileUploadService.upload(file: File) returns an Observable
		const uploads$ = this.previews.map(p => this.fileUploadService.upload(p.file));
		forkJoin(uploads$).subscribe({
			next: (results: any[]) => {
				this.uploadResults = results;
				this.loading = false;
			},
			error: (err) => {
				console.error('Upload failed', err);
				this.loading = false;
			}
		});
	}

	trackByIndex(index: number): number {
		return index;
	}

	ngOnDestroy(): void {
		this.clearPreviews();
	}

	private clearPreviews(): void {
		for (const url of this.objectUrls) {
			URL.revokeObjectURL(url);
		}
		this.objectUrls = [];
		this.previews = [];
	}
}
