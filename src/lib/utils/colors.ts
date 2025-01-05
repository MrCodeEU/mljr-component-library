export const brutalistColors = [
    { bg: 'bg-yellow-300 dark:bg-purple-700', hover: 'hover:bg-yellow-400 dark:hover:bg-purple-800' },
    { bg: 'bg-red-400 dark:bg-red-700', hover: 'hover:bg-red-500 dark:hover:bg-red-800' },
    { bg: 'bg-blue-400 dark:bg-blue-700', hover: 'hover:bg-blue-500 dark:hover:bg-blue-800' },
    { bg: 'bg-green-400 dark:bg-green-700', hover: 'hover:bg-green-500 dark:hover:bg-green-800' },
    { bg: 'bg-pink-400 dark:bg-pink-700', hover: 'hover:bg-pink-500 dark:hover:bg-pink-800' },
    { bg: 'bg-orange-400 dark:bg-orange-500', hover: 'hover:bg-orange-500 dark:hover:bg-orange-600' },
] as const;

const colorMap = {
    'yellow-300': '#fde047',
    'yellow-400': '#facc15',
    'red-400': '#f87171',
    'red-500': '#ef4444',
    'blue-400': '#60a5fa',
    'blue-500': '#3b82f6',
    'green-400': '#4ade80',
    'green-500': '#22c55e',
    'pink-400': '#f472b6',
    'pink-500': '#ec4899',
    'orange-400': '#fb923c',
    'orange-500': '#f97316',
    'purple-700': '#7e22ce',
    'purple-800': '#6b21a8',
    'white': '#ffffff',
    'black': '#000000',
} as const;

function isDarkMode(): boolean {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
}

function getContrastTextColor(): string {
    return isDarkMode() ? 'text-white' : 'text-black';
}

export const getColor = (index: number = 0, variant: 'default' | 'outline' | 'text' = 'default') => {
    try {
        const colorSet = brutalistColors[index % brutalistColors.length];
        const bgParts = colorSet.bg.split(' ');
        const hoverParts = colorSet.hover.split(' ');
        
        const bgColor = bgParts[0];
        const darkBgColor = bgParts[1]?.replace('dark:', '') || bgColor;
        const hoverColor = hoverParts[0].replace('hover:', '');
        const darkHoverColor = hoverParts[1]?.replace('dark:hover:', '') || hoverColor;

        if (variant === 'text') {
            return [
                bgColor.replace('bg-', 'text-'),
                `dark:${darkBgColor.replace('bg-', 'text-')}`,
                `hover:${hoverColor.replace('bg-', 'text-')}`,
                `dark:hover:${darkHoverColor.replace('bg-', 'text-')}`
            ].join(' ');
        }

        if (variant === 'outline') {
            return [
                'bg-transparent',
                'hover:bg-transparent',
                bgColor.replace('bg-', 'text-'),
                `dark:${darkBgColor.replace('bg-', 'text-')}`,
                `hover:${hoverColor.replace('bg-', 'text-')}`,
                `dark:hover:${darkHoverColor.replace('bg-', 'text-')}`,
                bgColor.replace('bg-', 'border-'),
                `dark:${darkBgColor.replace('bg-', 'border-')}`
            ].join(' ');
        }

        return [
            colorSet.bg,
            colorSet.hover,
            'text-black',
            'dark:text-white',
            'hover:text-black',
            'dark:hover:text-white'
        ].join(' ');
    } catch {
        return 'bg-gray-200 hover:bg-gray-300 text-black dark:text-white';
    }
}
