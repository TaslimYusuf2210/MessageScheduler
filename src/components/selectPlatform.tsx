import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SelectPlatform() {
    return ( 
        <div className="border rounded-md py-1">
                    <Select>
            <SelectTrigger className="w-full text-base border-none">
                <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Platforms</SelectLabel>
                <SelectItem value="gmail">Gmail</SelectItem>
                <SelectItem value="whatsapp">Whatsapp</SelectItem>
                <SelectItem value="slack">Slack</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select>
        </div>
     );
}

export default SelectPlatform;