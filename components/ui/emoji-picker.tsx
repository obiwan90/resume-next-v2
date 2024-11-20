"use client"

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Smile } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

interface EmojiPickerProps {
    onChange: (emoji: string) => void
}

interface EmojiData {
    id: string;
    native: string;    // emoji 的原生表示
    unified: string;   // emoji 的统一码
    imageUrl?: string; // 可选的图片 URL
    names?: string[];  // emoji 的名称列表
    shortNames?: string[]; // 短名称列表
}

export function EmojiPicker({ onChange }: EmojiPickerProps) {
    const { theme } = useTheme()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-accent"
                >
                    <Smile className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="right"
                className="w-full p-0 border-none"
            >
                <Picker
                    data={data}
                    onEmojiSelect={(emoji: EmojiData) => onChange(emoji.native)}
                    theme={theme === 'dark' ? 'dark' : 'light'}
                    previewPosition="none"
                    skinTonePosition="none"
                    searchPosition="none"
                    navPosition="none"
                    perLine={8}
                />
            </PopoverContent>
        </Popover>
    )
} 