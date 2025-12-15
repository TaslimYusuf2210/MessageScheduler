import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PlatformSelectProps {
  value: string
  onPlatformChange: (value: Platform) => void
}

export type Platform = "" | "gmail" | "whatsapp" | "telegram" | "slack";


function SelectPlatform( { value, onPlatformChange }:PlatformSelectProps) {
    return ( 
        <div className="border rounded-md py-1">
                    <Select
                    value={value}
                    onValueChange={onPlatformChange}
                    >
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