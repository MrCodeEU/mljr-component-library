<script lang="ts">
    import Button from '$lib/UI/Button.svelte';
    import { toast } from 'svoast';

    const typeColorMap = {
        info: 0,
        attention: 1,
        success: 2,
        warning: 3,
        error: 4
    };

    function showToast(type: string, options: any = {}) {
        const config = {
            duration: 5000,
            closable: true,
            colorIndex: options.colorIndex ?? typeColorMap[type as keyof typeof typeColorMap],
            ...options
        };
        
        switch (type) {
            case 'info':
                toast.info('This is an info message', config);
                break;
            case 'attention':
                toast.attention('This needs your attention!', config);
                break;
            case 'success':
                toast.success('Operation completed successfully!', config);
                break;
            case 'warning':
                toast.warning('Warning: This action cannot be undone', config);
                break;
            case 'error':
                toast.error('An error occurred!', config);
                break;
        }
    }

    function showRichToast() {
        toast.info('<b>Rich Content:</b> You can use <i>HTML</i> here!', {
            rich: true,
            colorIndex: 1
        });
    }

    function showStackedToast() {
        toast.info('First toast');
        setTimeout(() => toast.success('Second toast'), 500);
        setTimeout(() => toast.warning('Third toast'), 1000);
    }

    function simulatePromise() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve('Success!') : reject('Failed!');
            }, 2000);
        });

        toast.promise(promise, {
            loading: 'Loading...',
            success: (msg) => msg,
            error: (msg) => msg
        });
    }

    function showCustomDurationToast() {
        toast.info('This toast will stay for 10 seconds', {
            duration: 10000
        });
    }

    function showInfiniteToast() {
        toast.warning('This toast will stay until dismissed', {
            infinite: true
        });
    }
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">Toast Notifications</h2>

    <!-- Remove ToastProvider as it's now in the root layout -->
    
    <!-- Basic Types -->
    <div class="mb-6">
        <h3 class="mb-2 text-lg font-bold dark:text-white">Basic Types</h3>
        <div class="flex flex-wrap gap-4">
            <Button colorIndex={0} onclick={() => showToast('info')}>Info</Button>
            <Button colorIndex={1} onclick={() => showToast('attention')}>Attention</Button>
            <Button colorIndex={2} onclick={() => showToast('success')}>Success</Button>
            <Button colorIndex={3} onclick={() => showToast('warning')}>Warning</Button>
            <Button colorIndex={4} onclick={() => showToast('error')}>Error</Button>
        </div>
    </div>

    <!-- Duration Examples -->
    <div class="mb-6">
        <h3 class="mb-2 text-lg font-bold dark:text-white">Duration Examples</h3>
        <div class="flex flex-wrap gap-4">
            <Button colorIndex={1} onclick={showCustomDurationToast}>10s Duration</Button>
            <Button colorIndex={2} onclick={showInfiniteToast}>Infinite Duration</Button>
        </div>
    </div>

    <!-- Advanced Examples -->
    <div class="mb-6">
        <h3 class="mb-2 text-lg font-bold dark:text-white">Advanced Examples</h3>
        <div class="flex flex-wrap gap-4">
            <Button colorIndex={3} onclick={showRichToast}>Rich HTML Content</Button>
            <Button colorIndex={4} onclick={showStackedToast}>Stacked Toasts</Button>
            <Button colorIndex={0} onclick={simulatePromise}>Promise Toast</Button>
        </div>
    </div>

    <!-- Custom Styling -->
    <div class="mb-6">
        <h3 class="mb-2 text-lg font-bold dark:text-white">Custom Styling</h3>
        <div class="flex flex-wrap gap-4">
            <Button 
                colorIndex={2} 
                onclick={() => showToast('success', { colorIndex: 0 })}
            >
                Custom Color
            </Button>
            <Button 
                colorIndex={3} 
                onclick={() => showToast('warning', { closable: false })}
            >
                Non-closable
            </Button>
            <Button 
                colorIndex={4} 
                onclick={() => showToast('error', { duration: 2000 })}
            >
                Quick Toast
            </Button>
        </div>
    </div>
</div>
