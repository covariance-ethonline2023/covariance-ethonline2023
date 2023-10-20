"use client"

import { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { useForm, Controller } from "react-hook-form"
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Spinner from '@/components/ui/spinner'
import { redirect } from 'next/navigation'



const Login = () => {
  
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const {isConnected} = useAccount()

  useEffect(() => {
    if(isConnected){
      redirect("/dashboard/my-campaigns")
    }
  }, [isConnected])


  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = (data) => console.log(data);

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
            <Button className="mt-4" onSubmit={onSubmit}>
            LOG IN
            </Button>
          </form>
        </div>

        <div className="flex flex-col items-center">
          <div className="border-r border-gray-400 h-20"></div>
          <span className="my-4 text-gray-400">OR</span>
          <div className="border-r grow border-gray-400 h-20"></div>
        </div>

        <div className=" p-5">
          <h1 className="pb-12">Log in with Wallet</h1>
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
            Log in with the wallet address connected <br/> to your Covariance account
            </AlertDescription>
          </Alert>

          {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {(isLoading &&
            pendingConnector?.id === connector.id) ?
             <><Spinner/> Connecting</> : "Connect"}
        </Button>
      ))}
          {error && <p className="text-red-800 pt-3">Error occured while connecting to wallet. Try Again!</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
