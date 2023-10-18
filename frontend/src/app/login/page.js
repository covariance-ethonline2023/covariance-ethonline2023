"use client"

import { useAccount, useConnect } from 'wagmi'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { useForm, Controller } from "react-hook-form"
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
// import { useEffect } from 'react';
// import { redirect } from 'next/navigation'

const Login = () => {
  
  const { address, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  // useEffect(() => {
  //   if(isConnected){
  //     redirect("/dashboard");
  //   }
  // }, [isConnected])


  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = (data) => console.log(data);

  // const connectWallet = async () => {
  //   console.log("connecting");
  //   try {
  //     const wagmi = new Wagmi();
  //     await wagmi.enable(); // Request user to connect wallet
  //     setIsConnected(true);
  //   } catch (error) {
  //     console.error('Error connecting wallet:', error);
  //   }
  // };

  return (
    <Card className="w-[1152px] h-[578px] flex flex-col justify-evenly">
      <CardContent className="grid grid-flow-col justify-stretch">
        <div className="p-5">
          <h1 className="pb-6">Sign up with email</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input type="email" className="mb-4" {...field} />}
            />
            <Label htmlFor="password" >Password</Label>
            <Controller
              className="mt-4"
              name="password"
              control={control}
              render={({ field }) => <Input  {...field} />}
              />
            <Button className="mt-4" onSubmit>
            LOG IN
            </Button>
          </form>
        </div>

        <div class="flex flex-col items-center">
          <div class="border-r border-gray-400 h-20"></div>
          <span class="my-4 text-gray-400">OR</span>
          <div class="border-r grow border-gray-400 h-20"></div>
        </div>

        <div className=" p-5">
          <h1 className="pb-12">Log in with Wallet</h1>
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
            Log in with the wallet address connected <br/> to your Covariance account
            </AlertDescription>
          </Alert>
          {/* <Button onClick={() => connect()}>Connect</Button> */}

          {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect
          {isLoading &&
            pendingConnector?.id === connector.id &&
            ' (connecting)'}
        </Button>
      ))}

        </div>
      </CardContent>

      <Separator className="my-4" />

      <CardFooter className="flex flex-row justify-center">
        Already have an account? 
        <Button variant="link" asChild className="pl-1 primary">
          <Link href="/login">Log in</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;