<script lang="ts">
    import NeoInput from '$lib/UI/Forms/NeoInput.svelte';
    import NumberInput from '$lib/UI/Forms/NumberInput.svelte';
    import RangeSlider from '$lib/UI/Forms/RangeSlider.svelte';
    import RadioButton from '$lib/UI/Forms/RadioButton.svelte';
    import Checkbox from '$lib/UI/Forms/checkbox.svelte';
    import DatePicker from '$lib/UI/Forms/DatePicker.svelte';
    import { SearchSolid, UserSolid, EnvelopeSolid, EyeSolid, EyeSlashSolid } from 'flowbite-svelte-icons';

    let showPassword = $state(false);
    let rangeValue = $state(50);
    let dualRangeValues = $state([20, 80]);
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

    <!-- Range Sliders -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">Range Sliders</h3>
        <div class="space-y-8">
            <RangeSlider 
                min={0} 
                max={100} 
                showTicks={true}
                tickInterval={10}
                colorIndex={2}
            />
            
            <RangeSlider 
                min={0} 
                max={1} 
                step={0.1}
                float={true}
                colorIndex={3}
            />

            <!-- Add these new examples -->
            <RangeSlider 
                min={0} 
                max={100} 
                value={rangeValue}
                labelPosition="handle"
                colorIndex={1}
            />
            
            <RangeSlider 
                dual={true}
                min={0} 
                max={100} 
                value={dualRangeValues}
                showTicks={true}
                tickInterval={20}
                colorIndex={4}
            />

            <RangeSlider 
                min={0} 
                max={5} 
                step={0.5}
                float={true}
                labelPosition="bottom"
                colorIndex={3}
            />

            <RangeSlider
                min={0}
                max={100}
                disabled
                colorIndex={2}
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

    <!-- Add this new section before the closing div -->
    <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold dark:text-white">Date Pickers</h3>
        <div class="grid gap-6 md:grid-cols-2">
            <DatePicker
                label="Basic Date Picker"
                colorIndex={0}
            />

            <DatePicker
                label="Date & Time (24h)"
                mode="datetime"
                timeFormat="24h"
                colorIndex={1}
            />

            <DatePicker
                label="Date & Time (12h)"
                mode="datetime"
                timeFormat="12h"
                format="MM/dd/yyyy hh:mm aa"
                colorIndex={2}
            />

            <DatePicker
                label="Week starts Monday"
                startOfWeek={1}
                colorIndex={3}
            />

            <DatePicker
                label="With Min/Max Date"
                min={new Date(2024, 0, 1)}
                max={new Date(2024, 11, 31)}
                helper="Select a date in 2024"
                colorIndex={4}
            />

            <DatePicker
                label="Small Size"
                size="sm"
                colorIndex={5}
            />

            <DatePicker
                label="Large Size"
                size="lg"
                colorIndex={0}
            />

            <DatePicker
                label="Custom Format"
                format="yyyy-MM-dd"
                colorIndex={1}
            />

            <DatePicker
                label="With Error"
                error="Please select a valid date"
                colorIndex={4}
            />

            <DatePicker
                label="Success State"
                success="Date is valid!"
                value={new Date()}
                colorIndex={2}
            />

            <DatePicker
                label="Disabled Picker"
                disabled
                value={new Date()}
                colorIndex={3}
            />
        </div>
    </div>
</div>
