"use client";
import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type IssueForm = z.infer<typeof issueSchema>;
const NewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(issueSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.log("error: ", error);
    }
    setIsLoading(false);
  });
  return (
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button disabled={isLoading}>
        Submit New Issue {isLoading && <Spinner />}
      </Button>
    </form>
  );
};
export default NewIssue;
