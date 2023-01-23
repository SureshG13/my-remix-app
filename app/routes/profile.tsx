  import type { ActionFunction, LoaderFunction, UploadHandler} from "@remix-run/node";
  import { Form, useFetcher, useLoaderData } from "@remix-run/react";
  import {
    json,
    unstable_composeUploadHandlers as composeUploadHandlers,
    unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    unstable_parseMultipartFormData as parseMultipartFormData,
  } from "@remix-run/node";
  import { useState } from 'react';
import { auth2 } from "~/auth.server";
import { FormStrategy } from "remix-auth-form";
import { Container } from "@mantine/core";
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
  type LoadData = {
    error: { message: string } | null;
  };
  type LoaderData = { username: string };
  type ActionData = {
    errorMsg?: string;
    imgSrc?: string;
  };
//export let imgSrc="";

export const action: ActionFunction = async ({ request }) => {
  //console.log(request);
    await auth2.authenticate("form", request, {
        successRedirect: "/profile",
        failureRedirect: "/profile",
        //throwOnError:true,
    });
  };

  /*export const action: ActionFunction = async ({ request }) => {
    const uploadHandler: UploadHandler = composeUploadHandlers(createMemoryUploadHandler()
    );
    const formData = await parseMultipartFormData(request, uploadHandler);
    const imgSrc = formData.get("img");
    //console.log(imgSrc);
    if (!imgSrc) {
      return json({
        errorMsg: "Something went wrong while uploading",
      });
    }
    return json({
      imgSrc,
    });
  };*/
//export type err=string;
  export const loader1: LoaderFunction = async ({ request }) => {
    await auth2.isAuthenticated(request, { successRedirect: "/private" });
    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );
    const error = session.get(auth2.sessionErrorKey) as LoadData["error"];
    return json<LoadData>({ error });
  };

/*const upload=async()=>{
  try{
    const file=fs.createReadStream();
    const form=new FormData();
    form.append('file',file);
    const resp = await axios.post('http://localhost:3030/images', form, {
      headers: {
        ...form.getHeaders(),
      }
    });
    if (resp.status === 200) {
      return 'Upload complete';
    } 
  } catch(err) {
    return new Error("Something is wrong!!");
  }
  }
  upload().then(resp => console.log(resp));*/



  export default function Screen() {
    //const fetcher = useFetcher<ActionData>();
    const [image_url, setImgSrc] = useState('');

    const postForm=async ()=>{

        console.log(">>>>>>>>>>Post profile Image fired");
    }
  return (
    <Container size={450} my={40}>
    <>
      <form method="post" encType="multipart/form-data" 
      onSubmit={() => {
        postForm()
    }}>
        <div style={{
          paddingLeft:"-20px"
        }}>
        <label htmlFor="img-field" style={{
            paddingRight: "50px",
            paddingLeft:"30px"
        }}>Enter Username :
        <input id="userna" type="text" name="userna"/>
        </label>
        </div>
        <div style={{
          paddingBottom:"30px",
          paddingTop:"30px",
        }}>
        <input id="img" type="file" name="img" accept="image/*" onChange={(event)=>setImgSrc(event.target.value)}/>
        </div>
        <div style={{
            paddingBottom:"10px"
        }}></div>
        <div></div>
        <div>
        <button type="submit" style={{
            backgroundColor:"#008CCB",
            cursor:'pointer',
            paddingTop:'5px',
            paddingLeft:"100px",
            paddingRight:"100px",
            color:"white",
            fontSize: '18px',
            border:'none',
            textAlign: 'center',
            fontFamily:'inherit'
        }}>Upload</button>
        </div>
      </form>
    </>
    </Container>
  );
  }

