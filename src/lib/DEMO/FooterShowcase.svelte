<script lang="ts">
    import Footer from '$lib/Navigation/Footer.svelte';
    import { HomeOutline, MailBoxOutline, PhoneOutline, TwitterSolid, FacebookSolid, GithubSolid } from 'flowbite-svelte-icons';

    const footerSections = [
        {
            title: 'Contact',
            links: [
                {
                    text: 'Home',
                    href: '/',
                    icon: () => ({
                        h: () => HomeOutline
                    })
                },
                {
                    text: 'Email Us',
                    href: 'mailto:example@example.com',
                    icon: () => ({
                        h: () => MailBoxOutline
                    })
                },
                {
                    text: 'Call Us',
                    href: 'tel:+1234567890',
                    icon: () => ({
                        h: () => PhoneOutline
                    })
                }
            ]
        },
        {
            title: 'Social',
            links: [
                {
                    text: 'Twitter',
                    href: 'https://twitter.com',
                    icon: () => ({
                        h: () => TwitterSolid
                    })
                },
                {
                    text: 'Facebook',
                    href: 'https://facebook.com',
                    icon: () => ({
                        h: () => FacebookSolid
                    })
                },
                {
                    text: 'Github',
                    href: 'https://github.com',
                    icon: () => ({
                        h: () => GithubSolid
                    })
                }
            ]
        },
        {
            title: 'Legal',
            links: [
                { text: 'Privacy Policy', href: '/privacy' },
                { text: 'Terms of Service', href: '/terms' },
                { text: 'Cookie Policy', href: '/cookies' }
            ]
        }
    ];
</script>

<div class="mt-16">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">Footer Component</h2>
    <Footer sections={footerSections} colorIndex={0} />
</div>
