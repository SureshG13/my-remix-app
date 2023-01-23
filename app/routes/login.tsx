import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
  } from '@mantine/core';
  
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { auth, sessionStorage } from "~/auth.server";

type LoaderData = {
    error: { message: string } | null;
};

export const action: ActionFunction = async ({ request }) => {
    await auth.authenticate("form", request, {
        successRedirect: "/private",
        failureRedirect: "/login"
    });
};

export const loader: LoaderFunction = async ({ request }) => {
    await auth.isAuthenticated(request, { successRedirect: "/private" });
    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );
    const error = session.get(auth.sessionErrorKey) as LoaderData["error"];
    return json<LoaderData>({ error });
};


export default function Screen() {
    const { error } = useLoaderData<LoaderData>();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginForm=()=>{

        console.log(">>>>>>>>>>fired",username,password);
        //fetch("http://localhost:3030/users").then((response)=> response.json()).then((data)=> console.log(data));
    }

    return (
      <Container size={420} my={40}>
        <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="../../" size="sm" onClick={(event) => {
        }}>
          Create account
        </Anchor>
      </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form
            method="post"
            onSubmit={() => {
                loginForm()
            }}>
            <div>
          <TextInput 
          label="Username"
          name="username" 
          id="username" 
          placeholder="Enter Username" 
          required 
          onChange={(event)=>setUsername(event.target.value)}
          />
          </div>
          <div>
          <PasswordInput 
          label="Password" 
          name="password" 
          id="password" 
          placeholder="Your password" 
          required mt="md" 
          onChange={(event)=>setPassword(event.target.value)}
          />
          </div>
          <Group position="apart" mt="md"></Group>
          {error ? <div style={
            {
              color:'red',
            }
          }>{error.message}</div> : null}
          <button style={
            {
              backgroundColor:"#008CCB",
              color:"white",
              fontSize: '12px',
              border:'none',
              textAlign: 'center',
              cursor:'pointer',
              paddingLeft:'150px',
              paddingRight:'160px',
              paddingBottom:'10px',
              paddingTop:'5px',
              fontFamily:'inherit'
            }
            }>Sign in</button>
        </Form>
        </Paper>
        </Container>

        /*<Container size={420} my={40}>
        <Form
            method="post"
            onSubmit={() => {
                loginForm()
            }}>
            <div>
                <h2> Login Form</h2>
            </div>
            <div>
                <label htmlFor="username">UserName: </label>
                <TextInput
                    type="text"
                    name="username"
                    id="username"
                    required
                    onChange={(event)=>setUsername(event.target.value)}
                />
            </div>
            <div></div>
            <div>
                <label htmlFor="password">Password : <tr> </tr> </label>
                <PasswordInput
                    type="password"
                    name="password"
                    id="password"
                    defaultValue="password"
                    required
                    onChange={(event)=>setPassword(event.target.value)}

                />
            </div>
            <Group position="apart" mt="md"></Group>
            {error ? <div>{error.message}</div> : null}
            <button>Log In</button>
        </Form>
        </Container>*/
    );
}
