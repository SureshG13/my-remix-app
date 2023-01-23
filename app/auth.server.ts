import { createCookieSessionStorage, FormData } from "@remix-run/node";
import { fetchData } from "@remix-run/react/dist/data";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import * as bcrypt from 'bcrypt';
import { detectTemplateType } from "@remix-run/dev/dist/cli/create";
import { useFetcher } from "@remix-run/react";
import Screen from "./routes/profile";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    maxAge:20,
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret"], // This should be an env variable
    secure: process.env.NODE_ENV === "production",
  },
});

export const sessionStorage1 = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    path: "/profile",
    sameSite: "lax",
    secrets: ["secret"], // This should be an env variable
    secure: process.env.NODE_ENV === "production",
  },
});

/*export const sessionStorage1 = createCookieSessionStorage({
  cookie: {
    maxAge: 1,
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite:"lax",
    secrets: ["secret"], // This should be an env variable
    secure: process.env.NODE_ENV === "production",
  },
});*/
export const auth = new Authenticator<string>(sessionStorage);

export const auth1=new Authenticator<string>(sessionStorage);
export const auth2=new Authenticator<string>(sessionStorage1);

auth1.use(
  new FormStrategy(async ({ form }) => {
    const newuser = form.get("newuser");
    const newpassword = form.get("newpassword");
    //console.log(newuser);
    //console.log(newpassword);
    /*const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"username":newuser, "password": newpassword })
    };*/
    let err=0;
    async function getUsers(){
      
      let url="http://localhost:3030/users";
      let data={"username":newuser, "password":newpassword};
      //console.log(data);
      //console.log(JSON.stringify(data));
      try{
        //console.log(url);
        const res = await fetch(url,{
          method:'POST',
          body: Buffer.from(JSON.stringify(data)),
          //body: JSON.stringify(data),
          headers:{
            "content-type": "application/json",
          }
        })
        .then(response=>{ 
          if(response.status==500){
            err=response.status;
          console.log(response.status,"User Exist");
          }
        //} response.json())
        //.then((data)=>{
         // console.log('Success',data);
        })
        .catch((error)=>{
          console.log('Error>>>>>>>>>>>>>>>>>',error);
        });
        //console.log(err);
        //fetch(url,requestOptions).then(response => response.json()).then(data=> setState({postId:data.id}));
        //return await res.json();
        /*const result=new Response(JSON.stringify({"username":newuser, "password": newpassword }))
        const json=await result.json();
        console.log(json);*/
      } catch(error){
        console.log("<<<<<<<<.>>>>>>>>>Error",error);
      }
    }
    async function renderUsers(): Promise<number>{
      await getUsers();
      return 1;
    }
    let value=await renderUsers();
    //if(err==500) console.log("Function working");
  if(err==500) throw new AuthorizationError("User Already Exist!");
  return newuser as string;
}),
);




auth.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get("username");
    const password = form.get("password");
    console.log(username);
    console.log(password);

    async function getUsers() {
        let url = "http://localhost:3030/users/"+username;
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    async function renderUsers(): Promise<number> {
        let users = await getUsers();
        let temp=0;
        //console.log(users);
        if(users.length<1){
            temp=2;
            return temp;
            //throw new AuthorizationError("Invalid User Name");
        }
        if (!password) throw new AuthorizationError("Password is required");
        users.forEach((user: { userId: any; username: any; password: any;}) => {
            //const isMatch=bcrypt.compare(password,user.password);
            if(user.password!==password){
                temp=1;
                return temp;
                //throw new AuthorizationError("Invalid credentials");
            }
            //console.log(user.userId);
        });
        return temp;
    }
    let value=await renderUsers();
    if(value==1) throw new AuthorizationError("Invalid Password");
    if(value==2) throw new AuthorizationError("Invalid Username");
    if (!password) throw new AuthorizationError("Password is required");
    if (!username) throw new AuthorizationError("Username is required");
    return username as string;


    //let response= await fetch("http://localhost:3030/users");
    /*fetch("http://localhost:3030/users").then((response)=> response.json()).then((data)=> console.log(data));*/
    /* replace the code below with your own authentication logic
    if (!password) throw new AuthorizationError("Password is required");
    if (password !== "password1" || username!== "user1") {
      throw new AuthorizationError("Invalid credentials");
    }
    if (!username) throw new AuthorizationError("UserId is required");
    return username as string;*/
  })
);



auth2.use(
  new FormStrategy(async ({ form }) => {
    //const formData=new FormData(form);
    //const formData = await parseMultipartFormData(request, uploadHandler);
    const image=form.get("img");
    const userna=form.get("userna");
    let data={"userName":userna,"imageFile":image};
    console.log("<<<<>>>>>  PostProfile method called <<<>>>")
    console.log(image);
    console.log(JSON.stringify(image));
    async function postProfile() {
      let url = "http://localhost:3030/images/";
      try{
        console.log(url);
        const res = await fetch(url,{
          method:'POST',
          body:Buffer.from(JSON.stringify(data)),
          //body: JSON.stringify(data),
          headers:{
            "content-type": "application/json",
          }
        })
        .then(response=>{ 
          if(response.status==200 || response.status==201){
          console.log("Successfully uploaded file");
          }
          else{
            console.log("failed to upload");
          }
        })
        .catch((error)=>{
          console.log('Error>>>>>>>>>>>>>>>>>',error);
        });
      } catch(error){
        console.log("<<<<<<<<.>>>>>>>>>Error",error);
      }
  }
  async function renderUsers(): Promise<number> {
    await postProfile();
      return 1;
}
  let value=await renderUsers();
    return image as string;
  })
);

/*auth2.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get("username");
    console.log(username);

    async function getUsers() {
        let url = "http://localhost:3030/authors/"+username;
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    async function renderUsers(): Promise<number> {
        let users = await getUsers();
        let temp=0;
        console.log(users);
        if(users.length<1){
            temp=2;
            return temp;
        }
        return temp;
    }
    let value=await renderUsers();
    if (!username) throw new AuthorizationError("Username is required");
    return username as string;
  })
);*/

