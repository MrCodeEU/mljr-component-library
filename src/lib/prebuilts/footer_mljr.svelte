<script lang="ts">
    import * as Footer from "$lib/components/ui/footer";
    import { Button } from "$lib/components/ui/button";
    import { Card, CardHeader, CardContent } from "$lib/components/ui/card";
</script>

<Footer.Root>
    {#snippet brand()}
    <div class="clay-element text-sm bg-gradient-to-b from-pink-700 to-cyan-600 p-5">
        © 2025 MLJR. All rights reserved.
    </div>
    {/snippet}
    <Footer.Content>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-10/12 mx-auto">
            <Card class="bg-accent bg-gradient-to-bl from-accent to-muted">
                <CardHeader>
                    <h3 class="text-lg font-semibold">Company</h3>
                </CardHeader>
                <CardContent class="flex flex-col gap-2">
                    <Button variant="accent" class="w-full justify-center" href="/about">About</Button>
                    <Button variant="accent" class="w-full justify-center" href="/careers">Careers</Button>
                    <Button variant="accent" class="w-full justify-center" href="/contact">Contact</Button>
                </CardContent>
            </Card>
            <Card class="bg-primary bg-gradient-to-b from-primary to-muted">
                <CardHeader>
                    <h3 class="text-lg font-semibold">Legal</h3>
                </CardHeader>
                <CardContent class="flex flex-col gap-2">
                    <Button variant="primary" class="w-full justify-center" href="/privacy">Privacy</Button>
                    <Button variant="primary" class="w-full justify-center" href="/terms">Terms</Button>
                </CardContent>
            </Card>
            <Card class="bg-destructive bg-gradient-to-br from-destructive to-muted">
                <CardHeader>
                    <h3 class="text-lg font-semibold">Connect</h3>
                </CardHeader>
                <CardContent class="flex flex-col gap-2">
                    <Button variant="destructive" class="w-full justify-center" href="https://twitter.com/mljr">Twitter</Button>
                    <Button variant="destructive" class="w-full justify-center" href="https://www.linkedin.com/company/mljr">LinkedIn</Button>
                </CardContent>
            </Card>
        </div>
    </Footer.Content>
</Footer.Root>
