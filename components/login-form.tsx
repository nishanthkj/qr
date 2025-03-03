import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
    className = "",
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className={cn("p-6 shadow-lg", className)}>
                <CardHeader className="">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription className="text-gray-500">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="border rounded px-3 py-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="font-medium">
                                        Password
                                    </Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="border rounded px-3 py-2"
                                />
                            </div>
                            <Button type="submit" className="w-full" variant="default" size="lg">
                                Login
                            </Button>
                            {/* <Button variant="outline" size="lg" className="w-full">
                                Login with Google
                            </Button> */}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
