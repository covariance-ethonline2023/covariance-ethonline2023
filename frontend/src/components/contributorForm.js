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

 
export function ContributorForm({open, setOpen}) {
  const handleOpenModal = () => {
    setOpen(!open)
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black font-bold">Submit Contribution</DialogTitle>
          <DialogDescription>
          Binance academy new users campaign
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="heading" className="text-right text-black">
              Heading
            </Label>
            <Input
              id="heading"
              className="col-span-3"
              placeholder="Give your contribution a descriptive title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company-name" className="text-right text-black">
              Company name
            </Label>
            <Input
              id="company-name"
              className="col-span-3"
              placeholder="Name of project/company you identified"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact-person" className="text-right text-black">
              Contact person
            </Label>
            <Input
              id="contact-person"
              className="col-span-3"
              placeholder="Name of your contact person"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact-person-role" className="text-right text-black">
              Contact person role
            </Label>
            <Input
              id="contact-person-role"
              className="col-span-3"
              placeholder="Their role/position"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company-website" className="text-right text-black">
            Company Website
            </Label>
            <Input
              id="company-website"
              className="col-span-3"
              placeholder="abc.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="other-ref" className="text-right text-black">
            Other references 
            </Label>
            <Input
              id="other-ref"
              className="col-span-3"
              placeholder="Share any relevant links"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descr" className="text-right text-black">
            Describe 
            </Label>
            <Textarea
              id="descr"
              className="col-span-3"
              placeholder="Describe the opportunity concisely to help validate the contribution easily"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}