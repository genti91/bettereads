import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form";
import { StarRating } from "./StarRating";
import { Textarea } from "./ui/textarea";



export function ReviewForm({ form, onSubmit, children, oldRating }: { form: any, onSubmit: any, children: any, oldRating?: number }) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <StarRating 
                                        onClick={(value: number) => {
                                            form.setValue("rating", value)
                                            form.trigger("rating");
                                        }}
                                        defaultValue={oldRating} 
                                    />
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
                                <FormLabel>Review</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write Review..." className="resize-none h-40" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {children}
            </form>
        </Form>
    )
}
