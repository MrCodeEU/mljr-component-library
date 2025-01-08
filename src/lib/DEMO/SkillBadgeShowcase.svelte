<script lang="ts">
    import SkillBadge from '$lib/Compound/SkillBadge.svelte';
    import { 
        CodeBranchSolid,
        BrainSolid,
        PenSolid,
        ServerSolid,
        DatabaseSolid,
        CloudArrowUpSolid
    } from 'flowbite-svelte-icons';
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">Skill Badges</h2>
    <div class="flex flex-wrap items-start gap-4">
        {#each [
            { name: "Programming", icon: CodeBranchSolid, prof: 95, color: 0 },
            { name: "Machine Learning", icon: BrainSolid, prof: 85, color: 1, text: "Advanced" },
            { name: "UI Design", icon: PenSolid, prof: 75, color: 2, size: "sm" },
            { name: "Backend", icon: ServerSolid, prof: 90, color: 3, text: "Expert" },
            { name: "Databases", icon: DatabaseSolid, prof: 80, color: 4 },
            { name: "Cloud Services", icon: CloudArrowUpSolid, prof: 70, color: 5, text: "Intermediate" }
        ] as skill}
            <SkillBadge
                skill={skill.name}
                proficiency={skill.prof}
                proficiencyText={skill.text}
                icon={skill.icon}
                colorIndex={skill.color}
            />
        {/each}
    </div>
</div>
