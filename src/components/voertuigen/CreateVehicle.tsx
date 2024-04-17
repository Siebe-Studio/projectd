import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function CreateVehicle() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Voertuig Creëren</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voeg een voertuig toe</DialogTitle>
          <DialogDescription>Klik op Opslaan als u klaar bent.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">NummerPlaat</Label>
            <Input id="name" placeholder="00-XX-00" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Locaties</Label>
            <Select>
                <SelectTrigger className="w-[275px]"> <SelectValue placeholder="Selecteer een locatie" /></SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Locaties</SelectLabel>
                        <SelectItem value="Rotterdam">Rotterdam</SelectItem>
                        <SelectItem value="Amsterdam">Amsterdam</SelectItem>
                        <SelectItem value="Schiedam">Schiedam</SelectItem>
                        <SelectItem value="Utrecht">Utrecht</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">  
            <Label htmlFor="name" className="text-right">Beschrijving</Label>
            <Textarea className="w-[275px]" placeholder="Type your message here." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
