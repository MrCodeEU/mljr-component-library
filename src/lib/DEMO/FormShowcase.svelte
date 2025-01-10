<script lang="ts">
    import NeoInput from '$lib/UI/Forms/NeoInput.svelte';
    import NumberInput from '$lib/UI/Forms/NumberInput.svelte';
    import RangeSlider from '$lib/UI/Forms/RangeSlider.svelte';
    import RadioButton from '$lib/UI/Forms/RadioButton.svelte';
    import Checkbox from '$lib/UI/Forms/Checkbox.svelte';
    import NeoDropdown from '$lib/UI/Forms/NeoDropdown.svelte';
    import NeoTextArea from '$lib/UI/Forms/NeoTextArea.svelte';
    import NeoFileUpload from '$lib/UI/Forms/NeoFileUpload.svelte';
    import { SearchSolid, UserSolid, EnvelopeSolid, EyeSolid, EyeSlashSolid } from 'flowbite-svelte-icons';

    let showPassword = $state(false);
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">Form Elements</h2>
    
    <!-- Basic Text Inputs -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">Text Inputs</h3>
        <div class="grid gap-6 md:grid-cols-2">
            <NeoInput
                label="Default Input"
                placeholder="Enter text..."
            />
            
            <NeoInput
                label="With Icon"
                placeholder="Search..."
            >
                <SearchSolid slot="left" class="w-5 h-5" />
            </NeoInput>
            
            <NeoInput
                label="Email Input"
                type="email"
                placeholder="email@example.com"
                required
            >
                <EnvelopeSolid slot="left" class="w-5 h-5" />
            </NeoInput>
            
            <NeoInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
            >
                <button 
                    slot="right" 
                    class="focus:outline-none" 
                    on:click={() => showPassword = !showPassword}
                >
                    <svelte:component 
                        this={showPassword ? EyeSolid : EyeSlashSolid} 
                        class="w-5 h-5"
                    />
                </button>
            </NeoInput>

            <!-- Add these new examples -->
            <NeoInput
                label="With Error"
                value="invalid@email"
                error="Please enter a valid email address"
                colorIndex={4}
            >
                <EnvelopeSolid slot="left" class="w-5 h-5" />
            </NeoInput>
            
            <NeoInput
                label="With Success"
                value="valid@email.com"
                success="Email is valid!"
                colorIndex={2}
            >
                <EnvelopeSolid slot="left" class="w-5 h-5" />
            </NeoInput>

            <NeoInput
                label="Disabled Input"
                value="Can't edit this"
                disabled
            >
                <UserSolid slot="left" class="w-5 h-5" />
            </NeoInput>

            <NeoInput
                label="With Helper Text"
                placeholder="Enter username..."
                helper="Username must be 3-20 characters long"
                colorIndex={1}
            />
        </div>
    </div>

    <!-- Number Inputs -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">Number Inputs</h3>
        <div class="grid gap-6 md:grid-cols-2">
            <NumberInput
                label="Basic Number"
                value={42}
                colorIndex={0}
            />
            
            <NumberInput
                label="With Range"
                value={5}
                min={0}
                max={10}
                colorIndex={1}
            />

            <!-- Add these new examples -->
            <NumberInput
                label="Step Control"
                value={0}
                step={0.5}
                min={-5}
                max={5}
                colorIndex={2}
            />
            
            <NumberInput
                label="Disabled Number"
                value={42}
                disabled
                colorIndex={3}
            />

            <NumberInput
                label="Without Buttons"
                value={100}
                showButtons={false}
                colorIndex={4}
            />

            <NumberInput
                label="With Error"
                value={150}
                max={100}
                error="Value cannot exceed 100"
                colorIndex={4}
            />
        </div>
    </div>

    <!-- Dropdowns -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">Dropdowns</h3>
        <div class="grid gap-6 md:grid-cols-2">
            <NeoDropdown
                label="Basic Dropdown"
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' }
                ]}
                colorIndex={0}
            />
            
            <NeoDropdown
                label="Searchable Dropdown"
                options={[
                    { label: 'Apple', value: 'apple' },
                    { label: 'Banana', value: 'banana' },
                    { label: 'Cherry', value: 'cherry' },
                    { label: 'Date', value: 'date' },
                    { label: 'Elderberry', value: 'elderberry' }
                ]}
                searchable={true}
                colorIndex={1}
            />
            
            <NeoDropdown
                label="Multiple Selection"
                options={[
                    { label: 'React', value: 'react' },
                    { label: 'Vue', value: 'vue' },
                    { label: 'Svelte', value: 'svelte' },
                    { label: 'Angular', value: 'angular' }
                ]}
                multiple={true}
                colorIndex={2}
            />
            
            <NeoDropdown
                label="With Disabled Options"
                options={[
                    { label: 'Available', value: 'available' },
                    { label: 'Sold Out', value: 'sold-out', disabled: true },
                    { label: 'In Stock', value: 'in-stock' },
                    { label: 'Discontinued', value: 'discontinued', disabled: true }
                ]}
                colorIndex={3}
            />

            <NeoDropdown
                label="With Error"
                options={[
                    { label: 'Option A', value: 'a' },
                    { label: 'Option B', value: 'b' }
                ]}
                error="Please select an option"
                colorIndex={4}
            />

            <NeoDropdown
                label="Disabled Dropdown"
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' }
                ]}
                disabled={true}
                colorIndex={5}
            />
        </div>
    </div>

    <!-- Radio Buttons -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">Radio Buttons</h3>
        <div class="space-y-6">
            <RadioButton
                label="Color Choice"
                name="color"
                options={[
                    { label: 'Red', value: 'red' },
                    { label: 'Blue', value: 'blue' },
                    { label: 'Green', value: 'green' }
                ]}
                colorIndex={4}
            />
            
            <RadioButton
                label="Inline Layout"
                name="layout"
                inline={true}
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' }
                ]}
                colorIndex={5}
            />

            <!-- Add these new examples -->
            <RadioButton
                label="Sizes Example"
                name="sizes"
                size="sm"
                inline={true}
                options={[
                    { label: 'Small', value: 'sm' },
                    { label: 'Medium', value: 'md' },
                    { label: 'Large', value: 'lg' }
                ]}
                colorIndex={1}
            />
            
            <RadioButton
                label="With Error"
                name="error-example"
                options={[
                    { label: 'Option A', value: 'a' },
                    { label: 'Option B', value: 'b' }
                ]}
                error="Please select an option"
                colorIndex={4}
            />

            <RadioButton
                label="Disabled Options"
                name="disabled-example"
                disabled
                options={[
                    { label: 'Disabled 1', value: '1' },
                    { label: 'Disabled 2', value: '2' }
                ]}
                colorIndex={3}
            />
        </div>
    </div>

    <!-- Checkboxes -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">Checkboxes</h3>
        <div class="space-y-4">
            <Checkbox
                label="Basic Checkbox"
                colorIndex={0}
            />
            
            <div>
                <Checkbox
                    label="Inline Checkboxes"
                    inline
                    colorIndex={1}
                />
                <Checkbox
                    label="Second Option"
                    inline
                    colorIndex={1}
                />
                <Checkbox
                    label="Third Option"
                    inline
                    colorIndex={1}
                />
            </div>

            <Checkbox
                label="With Helper Text"
                helper="This is some additional information"
                colorIndex={2}
            />

            <Checkbox
                label="With Error"
                error="This field is required"
                colorIndex={4}
            />

            <Checkbox
                label="Disabled Checkbox"
                disabled
                colorIndex={3}
            />
        </div>
    </div>

    <!-- Text Areas -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">Text Areas</h3>
        <div class="grid gap-6 md:grid-cols-2">
            <NeoTextArea
                label="Basic Textarea"
                placeholder="Enter your message..."
                rows={4}
            />

            <NeoTextArea
                label="With Helper"
                placeholder="Write your bio..."
                helper="Maximum 500 characters"
                colorIndex={1}
            />

            <NeoTextArea
                label="With Error"
                value="Too short..."
                error="Bio must be at least 50 characters long"
                colorIndex={4}
            />

            <NeoTextArea
                label="With Success"
                value="Perfect length bio with good content..."
                success="Bio looks great!"
                colorIndex={2}
            />

            <NeoTextArea
                label="Disabled Textarea"
                value="This content cannot be edited"
                disabled
                colorIndex={3}
            />
        </div>
    </div>

    <!-- File Uploads -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">File Uploads</h3>
        <div class="grid gap-6 md:grid-cols-2">
            <NeoFileUpload
                label="Basic Upload"
                helper="Drag and drop or click to select"
            />

            <NeoFileUpload
                label="Image Upload"
                accept="image/*"
                helper="Only images are allowed"
                colorIndex={1}
            />

            <NeoFileUpload
                label="Multiple Files"
                multiple
                helper="You can select multiple files"
                colorIndex={2}
            />

            <NeoFileUpload
                label="With Error"
                error="Please upload a valid file"
                colorIndex={4}
            />

            <NeoFileUpload
                label="With Success"
                success="File uploaded successfully!"
                colorIndex={2}
            />

            <NeoFileUpload
                label="Disabled Upload"
                disabled
                helper="You cannot upload files here"
                colorIndex={3}
            />
        </div>
    </div>
</div>
