import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button"
  import Image from "next/image";


const Launch = () => {
    return (
        <div className="flex items-center justify-center h-screen ">
            <Card className="w-[1052px] h-[289px] flex flex-col justify-center">
            <CardHeader>
            <CardTitle className="text-center">Join Covariance as</CardTitle>
            {/* <CardDescription className="text-center">Join Covariance as</CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-row justify-around ">
                <div className="flex flex-col items-center">
                    <Image src={"../images/company.svg"} width={48} height={48} className="mb-3"/>
                    <Button className="text-lg">
                        Contributor
                    </Button>
                </div>
                <div className="flex flex-col items-center">
                    <Image src={"../images/contributor.svg"} width={48} height={48} className="mb-3"/>
                    <Button className="text-lg">
                        Company
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
    );
  };
  
  export default Launch;