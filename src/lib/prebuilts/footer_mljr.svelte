<script lang="ts">
    import { cn } from "$lib/utils.js";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    let className = "";
    export { className as class };
</script>

<footer class={cn("clay-element mt-auto mx-4 mb-4 p-8", className)}>
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Company Info Card -->
            <Card class="clay-element" style="background: linear-gradient(145deg, hsl(var(--purple)), hsl(var(--pink)))">
                <CardHeader>
                    <CardTitle class="text-white">MLJR Components</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-white/90">
                        Beautiful claymorphic components for modern web applications.
                    </p>
                </CardContent>
            </Card>

            <!-- Quick Links Card -->
            <Card class="clay-element" style="background: linear-gradient(145deg, hsl(var(--accent)), hsl(var(--info)))">
                <CardHeader>
                    <CardTitle class="text-white">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <nav class="flex flex-col space-y-2">
                        <a href="/docs" class="footer-link">Documentation</a>
                        <a href="/components" class="footer-link">Components</a>
                        <a href="/examples" class="footer-link">Examples</a>
                    </nav>
                </CardContent>
            </Card>

            <!-- Social Links Card -->
            <Card class="clay-element" style="background: linear-gradient(145deg, hsl(var(--mint)), hsl(var(--success)))">
                <CardHeader>
                    <CardTitle class="text-white">Connect</CardTitle>
                </CardHeader>
                <CardContent>
                    <nav class="flex flex-col space-y-2">
                        <a href="https://github.com/yourusername" class="footer-link">GitHub</a>
                        <a href="https://twitter.com/yourusername" class="footer-link">Twitter</a>
                        <a href="https://discord.gg/yourinvite" class="footer-link">Discord</a>
                    </nav>
                </CardContent>
            </Card>
        </div>

        <div class="mt-8 pt-8 border-t border-muted">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} MLJR Components. All rights reserved.
                </p>
                <nav class="flex gap-4">
                    <a href="/privacy" class="text-sm">Privacy</a>
                    <a href="/terms" class="text-sm">Terms</a>
                </nav>
            </div>
        </div>
    </div>
</footer>

<style>
    /* Enhanced footer link styling */
    .footer-link {
        @apply text-white/90 hover:text-white transition-colors;
        background: rgba(58, 58, 58, 0.322);
        box-shadow: 
            inset -1px -1px 1px rgba(0, 0, 0, 0.2),
            inset 1px 1px 1px rgba(255, 255, 255, 0.2);
    }

    .footer-link:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
    }

    a:not(.footer-link) {
        @apply text-foreground/80 hover:text-foreground transition-colors;
        background: none;
        box-shadow: none;
    }

    a:not(.footer-link):hover {
        transform: none;
        box-shadow: none;
    }
</style>
