import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Image,
  Group,
  Button,
} from '@mantine/core';
import { Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { auth1, sessionStorage } from '~/auth.server';
import { json } from "@remix-run/node";

type LoadData = {
  error: { message: string } | null;
};
export const action: ActionFunction = async ({ request }) => {
  await auth1.authenticate("form", request, {
      successRedirect: "/login",
      failureRedirect: "/",
      //throwOnError:true,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  await auth1.isAuthenticated(request, { successRedirect: "/login" });
  const session = await sessionStorage.getSession(
      request.headers.get("Cookie")
  );
  const error = session.get(auth1.sessionErrorKey) as LoadData["error"];
  return json<LoadData>({ error });
};

export default function Index() {
  const { error } = useLoaderData<LoadData>();
  const [newuser, setUsername] = useState('');
  const [newpassword, setPassword] = useState('');


  const signUpForm=async ()=>{

    console.log(">>>>>>>>>>Signup fired",newuser,newpassword);
        //let url = "http://localhost:3030/users/"+username;
        //let url='http://localhost:3030/users/';
        //let res=await fetch(url,requestOptions);
        //console.log(res.json());
        /*fetch('http://localhost:3030/users/', requestOptions)
        .then(response => response.json())
        .then(data=> setPostId(data.id));*/
        //console.log('>>>>>>>>> userId updated');
    //fetch("http://localhost:3030/users").then((response)=> response.json()).then((data)=> console.log(data));
}

  return (
    <Container size={420} my={40}>
        <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Hello Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have Account?{' '}
        <Anchor<'a'> href="../../login" size="sm" onClick={(event) => {}}>
          Click here to Login!
        </Anchor>
      </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form method="post"
            onSubmit={() => {
                signUpForm()
            }}>
            <div>
          <TextInput 
          label="Username"
          name="newuser" 
          id="newuser" 
          placeholder="Enter New Username" 
          required 
          onChange={(event)=>setUsername(event.target.value)}
          />
          </div>
          <div>
          <PasswordInput 
          label="Password" 
          name="newpassword" 
          id="newpassword" 
          placeholder="Enter password" 
          required mt="md" 
          onChange={(event)=>setPassword(event.target.value)}
          />
          </div>
          <Group position="apart" mt="md"></Group>
          <div>
          {error ? <div style={
            {
              color:'red',
            }
          }>{error.message}</div> : null}
          </div>
          <button style={
            {
              backgroundColor:"#008CCB",
              color:"white",
              fontSize: '11px',
              border:'none',
              textAlign: 'center',
              cursor:'pointer',
              paddingLeft:'150px',
              paddingRight:'160px',
              paddingBottom:'10px',
              paddingTop:'5px',
              fontFamily:'inherit'
            }
            }>Sign-up</button>
        </Form>
        </Paper>
        </Container>
        
    /*
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Hello Suresh</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="../../login"
            rel="noreferrer"
          >
            Click Here to Login
          </a>
        </li>
      </ul>
    </div>*/
  );
}

function setPostId(id: any): any {
  throw new Error('Function not implemented.');
}
/*
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
//import { json } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

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

  return (
    <Form method="post">
      <div>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          name="Username"
          id="username"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
        />
      </div>
      {error ? <div>{error.message}</div> : null}
      <button>Log In</button>
    </Form>
  );
}*/


/*
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';

export function AuthenticationTitle() {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
*/