<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import ThemeToggle from "$lib/components/theme-toggle/theme-toggle.svelte";
    import LanguageToggle from "$lib/components/language-toggle/language-toggle.svelte";
    import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "$lib/components/ui/card";
    import * as Tabs from "$lib/components/ui/tabs";
    import * as m from "$lib/paraglide/messages";
    import * as Navbar from "$lib/components/ui/navbar";
    import DotsBackground from "$lib/components/ui/dots-background/dots-background.svelte";
    import { toast } from "svelte-sonner";
	import NavbarMljr from "$lib/prebuilts/navbar_mljr.svelte";
</script>

<NavbarMljr />

<DotsBackground />

<main class="container py-8 space-y-12 min-h-screen relative">
    <h1 class="font-mono">{m.page_title()}</h1>

    <Card>
        <CardHeader>
            <CardTitle>{m.controls_title()}</CardTitle>
            <CardDescription>{m.controls_description()}</CardDescription>
        </CardHeader>
        <CardContent>
            <div class="flex items-center gap-4">
                <ThemeToggle />
                <LanguageToggle />
            </div>
        </CardContent>
    </Card>

    <Tabs.Root value="basics" class="w-full">
        <Tabs.List>
            <Tabs.Trigger value="basics">Basics</Tabs.Trigger>
            <Tabs.Trigger value="forms">Forms</Tabs.Trigger>
            <Tabs.Trigger value="layout">Layout</Tabs.Trigger>
            <Tabs.Trigger value="navigation">Navigation</Tabs.Trigger>
            <Tabs.Trigger value="showcase">Showcase</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="basics" class="mt-6">
            <div class="grid gap-6">
                <!-- Buttons Section -->
                <Card>
                    <CardHeader>
                        <CardTitle>{m.buttons_title()}</CardTitle>
                        <CardDescription>{m.buttons_description()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="flex flex-col gap-8">
                            <!-- Default Sizes -->
                            <div class="flex flex-wrap gap-4">
                                <Button variant="default">Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="accent">Accent</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                                <Button variant="muted">Muted</Button>
                            </div>

                            <!-- Small Size -->
                            <div class="flex flex-wrap gap-4">
                                <Button size="sm" variant="default">Small</Button>
                                <Button size="sm" variant="secondary">Small</Button>
                                <Button size="sm" variant="accent">Small</Button>
                                <Button size="sm" variant="destructive">Small</Button>
                            </div>

                            <!-- Large Size -->
                            <div class="flex flex-wrap gap-4">
                                <Button size="lg" variant="default">Large</Button>
                                <Button size="lg" variant="secondary">Large</Button>
                                <Button size="lg" variant="accent">Large</Button>
                                <Button size="lg" variant="destructive">Large</Button>
                            </div>

                            <!-- Icon Size -->
                            <div class="flex flex-wrap gap-4">
                                <Button size="icon" variant="default">+</Button>
                                <Button size="icon" variant="secondary">−</Button>
                                <Button size="icon" variant="accent">×</Button>
                                <Button size="icon" variant="destructive">÷</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Toast Section -->
                <Card>
                    <CardHeader>
                        <CardTitle>Toast Notifications</CardTitle>
                        <CardDescription>Claymorphic toast notifications for various states</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="flex flex-wrap gap-4">
                            <Button 
                                onclick={() => toast("Default notification")}
                                variant="default"
                            >
                                Default Toast
                            </Button>
                            
                            <Button 
                                onclick={() => toast.success("Success notification", {
                                    description: "Action completed successfully",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo clicked")
                                    }
                                })}
                                variant="default"
                            >
                                Success Toast
                            </Button>
                            
                            <Button 
                                onclick={() => toast.error("Error notification", {
                                    description: "Something went wrong"
                                })}
                                variant="destructive"
                            >
                                Error Toast
                            </Button>
                            
                            <Button 
                                onclick={() => toast.info("Information", {
                                    description: "Here's some useful information",
                                    duration: 5000
                                })}
                                variant="secondary"
                            >
                                Info Toast
                            </Button>
                            
                            <Button 
                                onclick={() => toast.warning("Warning notification", {
                                    description: "Please proceed with caution"
                                })}
                                variant="outline"
                            >
                                Warning Toast
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <!-- Links Section -->
                <Card>
                    <CardHeader>
                        <CardTitle>Links</CardTitle>
                        <CardDescription>Various examples of brutalist links</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="flex flex-wrap gap-4">
                            <a href="#">Regular Brutal Link</a>
                            This is <a href="#">Another Example</a> of a brutal link in a sentence.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Tabs.Content>

        <Tabs.Content value="forms" class="mt-6">
            <!-- Add form components demonstration here -->
            <Card>
                <CardHeader>
                    <CardTitle>Form Elements</CardTitle>
                    <CardDescription>Various form components and their usage</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-4">
                        <!-- Add your form components here -->
                    </div>
                </CardContent>
            </Card>
        </Tabs.Content>

        <Tabs.Content value="layout" class="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Layout Components</CardTitle>
                    <CardDescription>Examples of layout components and containers</CardDescription>
                </CardHeader>
                <CardContent>
                    <!-- Add your layout components here -->
                </CardContent>
            </Card>
        </Tabs.Content>

        <Tabs.Content value="navigation" class="mt-6">
            <div class="grid gap-6">
                <!-- Navbar Example -->
                <Card>
                    <CardHeader>
                        <CardTitle>Navigation Bar</CardTitle>
                        <CardDescription>Example of a navbar component with brand and navigation items</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="grid gap-4">
                            <!-- Default Navbar -->
                            <Navbar.Root>
                                {#snippet brand()}
                                <Navbar.Brand>
                                    <span class="text-2xl font-bold">🚀</span>
                                    <span>BrandName</span>
                                </Navbar.Brand>
                                {/snippet}
                                <Navbar.Content>
                                    <Button variant="ghost">Home</Button>
                                    <Button variant="ghost">About</Button>
                                    <Button variant="ghost">Contact</Button>
                                    <Button>Sign Up</Button>
                                </Navbar.Content>
                            </Navbar.Root>

                            <!-- Alternative Style -->
                            <Navbar.Root class="bg-secondary">
                                {#snippet brand()}
                                <Navbar.Brand>
                                    <span class="text-2xl font-bold">🎨</span>
                                    <span>ArtStyle</span>
                                </Navbar.Brand>
                                {/snippet}
                                <Navbar.Content>
                                    <Button variant="secondary">Gallery</Button>
                                    <Button variant="secondary">Artists</Button>
                                    <Button variant="secondary">Events</Button>
                                    <Button variant="accent">Submit Art</Button>
                                </Navbar.Content>
                            </Navbar.Root>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Tabs.Content>

        <Tabs.Content value="showcase" class="mt-6">
            <div class="grid gap-6">
                <!-- Clay Cards Showcase -->
                <Card>
                    <CardHeader>
                        <CardTitle>Claymorphism Showcase</CardTitle>
                        <CardDescription>Examples of clay-like elements with different colors and effects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-8">
                            <!-- Color Cards -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div class="clay-element p-6" style="background: hsl(var(--success))">
                                    <h3 class="text-lg font-bold mb-2" style="color: hsl(var(--success-foreground))">Success Card</h3>
                                    <p style="color: hsl(var(--success-foreground))">A positive message goes here</p>
                                </div>
                                <div class="clay-element p-6" style="background: hsl(var(--warning))">
                                    <h3 class="text-lg font-bold mb-2" style="color: hsl(var(--warning-foreground))">Warning Card</h3>
                                    <p style="color: hsl(var(--warning-foreground))">An important notice goes here</p>
                                </div>
                                <div class="clay-element p-6" style="background: hsl(var(--info))">
                                    <h3 class="text-lg font-bold mb-2" style="color: hsl(var(--info-foreground))">Info Card</h3>
                                    <p style="color: hsl(var(--info-foreground))">Some useful information here</p>
                                </div>
                            </div>

                            <!-- Interactive Elements -->
                            <div class="flex flex-wrap gap-4">
                                <Button class="clay-interactive" style="background: hsl(var(--purple))">
                                    <span style="color: hsl(var(--purple-foreground))">Purple Button</span>
                                </Button>
                                <Button class="clay-interactive" style="background: hsl(var(--pink))">
                                    <span style="color: hsl(var(--pink-foreground))">Pink Button</span>
                                </Button>
                                <Button class="clay-interactive" style="background: hsl(var(--mint))">
                                    <span style="color: hsl(var(--mint-foreground))">Mint Button</span>
                                </Button>
                            </div>

                            <!-- Depth Demo -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="clay-element p-6" style="--depth-medium: 4px">
                                    <h3 class="text-lg font-bold">Shallow</h3>
                                </div>
                                <div class="clay-element p-6" style="--depth-medium: 12px">
                                    <h3 class="text-lg font-bold">Medium</h3>
                                </div>
                                <div class="clay-element p-6" style="--depth-medium: 20px">
                                    <h3 class="text-lg font-bold">Deep</h3>
                                </div>
                            </div>

                            <!-- Gradient Cards -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="clay-element p-6" 
                                     style="background: linear-gradient(145deg, hsl(var(--purple)), hsl(var(--pink)))">
                                    <h3 class="text-lg font-bold text-white">Purple to Pink</h3>
                                    <p class="text-white/90">Gradient demonstration</p>
                                </div>
                                <div class="clay-element p-6"
                                     style="background: linear-gradient(145deg, hsl(var(--info)), hsl(var(--mint)))">
                                    <h3 class="text-lg font-bold text-white">Info to Mint</h3>
                                    <p class="text-white/90">Another gradient example</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Tabs.Content>
    </Tabs.Root>
</main>