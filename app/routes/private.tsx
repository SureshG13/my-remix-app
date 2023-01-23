
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
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

import { auth } from "~/auth.server";

type LoaderData = { username: string };

export const action: ActionFunction = async ({ request }) => {
  await auth.logout(request, { redirectTo: "/" });
};

export const loader: LoaderFunction = async ({ request }) => {
  const username = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json<LoaderData>({username});
};

export default function Screen() {
  const { username } = useLoaderData<LoaderData>();
  
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 ,color:"red"})}>
        Hello {username}
      </Title>
    <>
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Form method="post">
      <Anchor<'a'> href="../../profile" onClick={(event) => {
        }}>
          Upload Profile Image for {username}
        </Anchor>
        <div style={{
          paddingTop:"30px",
        }}></div>
        <Anchor<'a'> href="../../quotes" onClick={(event) => {
        }}>
          Read Quotes of {username}
        </Anchor>
        <div style={{
          paddingTop:"50px",
        }}></div>
        <button style={
            {
              backgroundColor:"#008CCB",
              color:"white",
              fontSize: '16px',
              border:'none',
              textAlign: 'center',
              cursor:'pointer',
              paddingLeft:'150px',
              paddingRight:'150px',
              paddingBottom:'10px',
              paddingTop:'5px',
              fontFamily:'inherit'
            }
            }>Log Out</button>
      </Form>
      </Paper>
    </>
    </Container>
  );
}
