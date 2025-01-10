<script lang="ts">
    import { getColor } from '$lib/utils/colors';
    import { toast } from 'svoast';
    import { CloudArrowUpSolid } from 'flowbite-svelte-icons';

    let {
        label = '',
        accept = undefined,
        multiple = false,
        required = false,
        disabled = false,
        error = '',
        success = '',
        colorIndex = 0,
        helper = '',
        maxSize = 5 * 1024 * 1024, // 5MB default
    } = $props<{
        label?: string;
        accept?: string;
        multiple?: boolean;
        required?: boolean;
        disabled?: boolean;
        error?: string;
        success?: string;
        colorIndex?: number;
        helper?: string;
        maxSize?: number;
    }>();

    let files = $state<FileList | null>(null);
    let dragOver = $state(false);
    let inputRef: HTMLInputElement;

    const containerClass = $derived(`
        neo-brutalist-input-container
        ${error ? 'input-error' : ''}
        ${success ? 'input-success' : ''}
        ${disabled ? 'opacity-50' : ''}
    `);

    const dropzoneClass = $derived(`
        relative
        ${getColor(colorIndex)}
        border-2 border-black border-dashed
        rounded-none
        p-6
        text-center
        transition-all
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        ${dragOver ? 'shadow-none translate-x-[4px] translate-y-[4px]' : ''}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `);

    function formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    }

    function handleFileSelect(e: Event) {
        const input = e.target as HTMLInputElement;
        if (!input.files?.length) return;
        processFiles(input.files);
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        dragOver = false;
        
        if (!e.dataTransfer?.files.length) return;
        processFiles(e.dataTransfer.files);
    }

    function processFiles(fileList: FileList) {
        if (disabled) return;

        const oversizedFiles = Array.from(fileList).filter(file => file.size > maxSize);
        if (oversizedFiles.length) {
            const maxSizeMB = maxSize / (1024 * 1024);
            toast.error(`Files must be smaller than ${maxSizeMB}MB`, { colorIndex: 4 });
            return;
        }

        // If not multiple, replace files. If multiple, append new files
        if (!multiple) {
            files = fileList;
        } else {
            const existingFiles = files ? Array.from(files) : [];
            const newFiles = Array.from(fileList);
            const combinedFiles = new DataTransfer();
            [...existingFiles, ...newFiles].forEach(file => combinedFiles.items.add(file));
            files = combinedFiles.files;
        }

        if (files?.length) {
            toast.success(`${files.length} file${files.length === 1 ? '' : 's'} selected`, { colorIndex: 2 });
        }
    }

    function removeFile(indexToRemove: number) {
        if (!files) return;
        const dt = new DataTransfer();
        Array.from(files).forEach((file, index) => {
            if (index !== indexToRemove) {
                dt.items.add(file);
            }
        });
        files = dt.files;
    }

    function clearFiles() {
        files = null;
        if (inputRef) inputRef.value = '';
    }
</script>

<div class={containerClass}>
    {#if label}
        <label class="block mb-2 text-sm font-medium">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}

    <!-- File Drop Zone -->
    <div
        class={dropzoneClass}
        on:dragenter={(e) => {
            e.preventDefault();
            if (!disabled) dragOver = true;
        }}
        on:dragover={(e) => {
            e.preventDefault();
            if (!disabled) dragOver = true;
        }}
        on:dragleave={(e) => {
            e.preventDefault();
            dragOver = false;
        }}
        on:drop={handleDrop}
        on:click={() => !disabled && inputRef.click()}
        on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                !disabled && inputRef.click();
            }
        }}
        role="button"
        tabindex="0"
    >
        <input
            type="file"
            {accept}
            {multiple}
            {disabled}
            class="hidden"
            bind:this={inputRef}
            on:change={handleFileSelect}
        />
        
        <div class="flex flex-col items-center gap-2">
            <CloudArrowUpSolid class="w-10 h-10" />
            <p class="text-sm">
                {#if files?.length}
                    {files.length} file{files.length === 1 ? '' : 's'} selected
                    <button 
                        class="ml-2 underline"
                        on:click|stopPropagation={clearFiles}
                    >
                        Clear all
                    </button>
                {:else}
                    Drag & drop files here or click to select
                {/if}
            </p>
            <p class="text-xs opacity-75">
                {accept === undefined ? 'All file types accepted' : `Accepted formats: ${accept}`}
            </p>
        </div>
    </div>

    <!-- File List -->
    {#if files?.length}
        <div class="mt-4 space-y-2">
            {#each Array.from(files) as file, i}
                <div class="flex items-center justify-between p-2 border-2 border-black">
                    <div class="flex items-center space-x-2">
                        <span class="font-medium">{file.name}</span>
                        <span class="text-sm text-gray-500">({formatFileSize(file.size)})</span>
                    </div>
                    {#if multiple}
                        <button
                            class="px-2 py-1 text-sm hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                            on:click={() => removeFile(i)}
                        >
                            ✕
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}

    {#if error}
        <p class="mt-2 text-sm text-red-500 dark:text-red-700">{error}</p>
    {/if}

    {#if success}
        <p class="mt-2 text-sm text-green-500 dark:text-green-700">{success}</p>
    {/if}

    {#if helper}
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{helper}</p>
    {/if}
</div>
