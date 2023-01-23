
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
import { Quote } from "tabler-icons-react";
declare global {
  interface Window {
    finalResult:string[];
  }
}

declare var resu:string[];

//const { username } = useLoaderData<LoaderData>();
type LoaderData = { username: string };
type LoadData = { quotes: string };
export const action: ActionFunction = async ({ request }) => {
  await auth.logout(request, { redirectTo: "/" });
};

export const loader: LoaderFunction = async ({ request }) => {
  const username = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json<LoaderData>({username});
};

async function getUsers(username:string) {
  let url = "http://localhost:3030/authors/"+username;
  try {
      let res = await fetch(url);
      return res.json();
  } catch (error) {
      console.log(error);
  }
}
/*async function renderUsers(username:string): Promise<string[]> {
  let quotes= await getUsers(username);
  console.log("<<<<<>>>>> Displaying Quotes",quotes);
  //quotes.forEach((user: { quote: any;}) => {
    //window.finalResult.push(user.quote as string);
    //results.push(user.quote as string);
    //}
  //);
  return quotes;
};*/

export default async function Screen() {
  const { username } = useLoaderData<LoaderData>();
  let {quotes}=useLoaderData<LoadData>();
  //declare var results:string[];
  //var resu:string[];
  let output= await getUsers(username);
  //console.log(output);
  console.log("******** ***** Displaying Quotes in default function",output);

  output.forEach((user: { quote: any;}) => {
    //window.finalResult.push(user.quote as string);
    //console.log(user.quote as string);
    resu.push(user.quote);
    }
  );
  console.log(resu);


  //var value=renderUsers(username).then(result=>{
    //console.log(result,'>>>>>result')
  //});
  //console.log("...............>>>>> Result",window.finalResult);
  //console.log(results);
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 ,color:"red"})}>
        Displaying {username} Quotes
      </Title>
    <>
    
    <div style={{
      color:'blue',
    }}> {output}
    </div>
    </>
    </Container>
  );
}
