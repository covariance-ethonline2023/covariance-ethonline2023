import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"

function Field ({ name, label, placeholder }) {
    return (
        <div className="flex flex-col items-start">
            <Label htmlFor={name} className="text-right mb-2 ml-2">
                {label}
            </Label>
            <Input
                id={name}
                className="border-2 border-gray-600 bg-transparent p-2 py-5"
                placeholder={placeholder}
            />
        </div>
    );
}
 
export function ContributorForm({open, setOpen}) {
  const handleOpenModal = () => {
    setOpen(!open)
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenModal}>
      <DialogContent className="sm:max-w-[425px] text-white bg-appBlack border-0 rounded-xl">
        <DialogHeader>
          <DialogTitle className=" font-bold">Submit Contribution</DialogTitle>
          <DialogDescription>
          Binance academy new users campaign
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Field name="heading" label="Heading" placeholder="Give your contribution a descriptive title" />
          <Field name="company-name" label="Company name" placeholder="Name of project/company you identified" />
          <Field name="contact-person" label="Contact person" placeholder="Name of your contact person" />
          <Field name="contact-person-role" label="Contact person role" placeholder="Their role/position" />
          <Field name="company-website" label="Company Website" placeholder="abc.com" />
          <Field name="other-ref" label="Other references " placeholder="Share any relevant links" />
          <Field name="descr" label="Describe " placeholder="Describe the opportunity concisely to help validate the contribution easily" />
        </div>
        <DialogFooter className="flex w-full !justify-stretch">
          <Button type="submit" className="flex-row bg-appGreenDark w-full rounded-3xl hover:bg-appGreenDark">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 8L16.5 12M16.5 12L12.5 16M16.5 12H3.5M3.83782 7C5.56687 4.01099 8.79859 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12C22.5 17.5228 18.0228 22 12.5 22C8.79859 22 5.56687 19.989 3.83782 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span className="ml-4">Submit</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
