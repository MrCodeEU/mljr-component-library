<script lang="ts">
	import RangeSlider from '$lib/UI/Forms/RangeSlider.svelte';
	import DatePicker from '$lib/UI/Forms/DatePicker/DatePicker.svelte';
    
    let rangeValue = $state(50);
    let dualRangeValues = $state([20, 80]);
</script>

<!-- Range Sliders -->
<div class="mb-8">
	<h3 class="mb-4 text-lg font-bold dark:text-white">Range Sliders</h3>
	<div class="space-y-8">
		<RangeSlider min={0} max={100} showTicks={true} tickInterval={10} colorIndex={2} />

		<RangeSlider min={0} max={1} step={0.1} float={true} colorIndex={3} />

		<!-- Add these new examples -->
		<RangeSlider min={0} max={100} value={rangeValue} labelPosition="handle" colorIndex={1} />

		<RangeSlider
			dual={true}
			min={0}
			max={100}
			value={dualRangeValues}
			showTicks={true}
			tickInterval={20}
			colorIndex={4}
		/>

		<RangeSlider min={0} max={5} step={0.5} float={true} labelPosition="bottom" colorIndex={3} />

		<RangeSlider min={0} max={100} disabled colorIndex={2} />
	</div>
</div>

<!-- DatePicker section -->
<div class="mb-8">
	<h3 class="mb-4 text-lg font-bold dark:text-white">Date Pickers</h3>
	<div class="grid gap-6 md:grid-cols-2">
		<DatePicker label="Basic Date" mode="date" colorIndex={0} />

		<DatePicker label="Time Only" mode="time" colorIndex={1} />

		<DatePicker label="Date & Time" mode="datetime" timeFormat="24h" colorIndex={2} />

		<DatePicker
			label="12-hour Time"
			mode="datetime"
			timeFormat="12h"
			format="MM/dd/yyyy hh:mm aa"
			colorIndex={3}
		/>

		<DatePicker
			label="Constrained Range"
			min={new Date(2024, 0, 1)}
			max={new Date(2024, 11, 31)}
			helper="Select a date in 2024"
			colorIndex={4}
		/>

		<DatePicker label="Week starts Monday" startOfWeek={1} colorIndex={0} />

		<DatePicker label="Small Size" size="sm" colorIndex={1} />

		<DatePicker label="Large Size" size="lg" colorIndex={2} />

		<DatePicker label="With Error" error="Please select a valid date" colorIndex={4} />

		<DatePicker label="With Success" success="Date is valid!" colorIndex={2} />

		<DatePicker label="Disabled" disabled colorIndex={3} />
	</div>
</div>
