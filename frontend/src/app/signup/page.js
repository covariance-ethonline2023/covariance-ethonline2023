"use client"

import { useForm, Controller } from "react-hook-form"
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import Spinner from "@/components/ui/spinner"
import { useConnect, useAccount } from 'wagmi'
import { useEffect } from "react"
import { redirect } from "next/navigation"

const SignUp = () => {
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
  const onSubmit = (data) => console.log(data)

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
            SIGN UP
            </Button>
          </form>
        </div>

        <div className="flex flex-col items-center">
          <div className="border-r border-gray-400 h-20"></div>
          <span className="my-4 text-gray-400">OR</span>
          <div className="border-r grow border-gray-400 h-20"></div>
        </div>

        <div className=" p-5">
          <h1 className="pb-12">Connect Wallet</h1>
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Use the wallet address your <br/> contributor payments would go to.
            </AlertDescription>
          </Alert>
          {connectors.map((connector) => (
        <Button
          disabled={connector?.ready ? '' : false}
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

export default SignUp;
