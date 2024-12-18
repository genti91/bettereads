import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";



export function GroupForm({ form, onSubmit, buttonText, discussion }: { form: any, onSubmit: any, buttonText: string, discussion?: boolean }) {
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="space-y-3">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{discussion ? "Title" : "Name"}</FormLabel>
                            <FormControl>
                                <Input placeholder={discussion ? "Discussion title" : "Group Name"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write a description..." className="resize-none h-40" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
                <DialogFooter>
                    <Button type="submit">{buttonText}</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
