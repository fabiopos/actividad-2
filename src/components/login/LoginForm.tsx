import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ILogin {
  email: string;
  password: string;
}

interface ILoginError {
  error: string;
}

// eve.holt@reqres.in
// cityslicka

const uri = "https://reqres.in/api/login";

export default function LoginForm() {
  const form = useForm<ILogin>({ mode: "onChange" });
  const [error, setError] = useState<ILoginError>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ILogin> = async (values) => {
    try {
      setError({ error: "" });
      const response = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.token) navigate("/");
      setError({ error: data.error });
    } catch (error) {
      if (error instanceof Error) setError({ error: error.message });
    }
  };
  return (
    <div className="">
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="username" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left">Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="password" type="password" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="space-y-4 mt-5">
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>
          Submit
        </Button>
        <br />
        {error && (
          <span className="text-red-400 mt-4 flex justify-center">
            {error.error}
          </span>
        )}
      </div>
    </div>
  );
}
