<script lang="ts">
    import Badge from '$lib/UI/Badge.svelte';
    import ProgressBar from '$lib/UI/ProgressBar.svelte';

    interface Props {
        skill: string;
        proficiency: number; 
        proficiencyText?: string;
        icon?: any;
        colorIndex?: number;
        size?: 'sm' | 'md' | 'lg';
        progressSize?: 'sm' | 'md' | 'lg';
    }

    let {
        skill,
        proficiency,
        proficiencyText = '',
        icon,
        colorIndex = 0,
        size = 'md',
        progressSize = 'sm'
    } = $props();

</script>

<Badge
    text={skill}
    {colorIndex}
    {size}
    leftIcon={icon}
>
    {#snippet children()}
        <div class="mb-1">{proficiencyText || `${proficiency}% Proficient`}</div>
        <ProgressBar
            progress={proficiency}
            {colorIndex}
            size={progressSize}
            showLabel={false}
            animate={true}
        />
    {/snippet}
</Badge>