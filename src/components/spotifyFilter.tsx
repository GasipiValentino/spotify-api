'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SoundWave from "./soundWave"
import { useContext } from "react"
import { SpotifyContext } from "@/contexts/spotify-context"

const filterSchema = z.object({
  filter: z
    .string({
      required_error: "Please select a filter",
    })
})

const SpotifyFilter = () => {

  const { setFilterType } = useContext(SpotifyContext);
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      filter: 'tracks',
    },
  });

  function onSubmit(data: z.infer<typeof filterSchema>) {
    setFilterType(data.filter as 'tracks' | 'artists' | 'albums');
  }

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="filter"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit)();
                }}
                defaultValue={field.value}
              >
                <FormControl className="border-none shadow-none font-semibold">
                  <SelectTrigger className="gap-2">
                    <>
                      <SoundWave />
                      <SelectValue placeholder="Filter" />
                    </>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tracks">Top Tracks</SelectItem>
                  <SelectItem value="artists">Top Artists</SelectItem>
                  <SelectItem value="albums">Top Albums</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default SpotifyFilter