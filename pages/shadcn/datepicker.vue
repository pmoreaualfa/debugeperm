<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { toDate } from 'radix-vue/date'
import { useForm } from 'vee-validate'
import { computed, h, ref } from 'vue'
import { z } from 'zod'

import { RocketIcon } from '@radix-icons/vue';


const df = new DateFormatter('fr-FR', {
  dateStyle: 'long',
})

const formSchema = toTypedSchema(z.object({
  dob: z
    .string()
    .refine(v => v, { message: "La saisie d'une date de naissance est nécessaire." }),
}))

const placeholder = ref()

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
})

const value = computed({
  get: () => values.dob ? parseDate(values.dob) : undefined,
  set: val => val,
})

// alert
const alertTitle = ref<string>('Vous avez soumis les données suivantes :')
const alertDescription = ref<string>('')



const onSubmit = handleSubmit((values) => {
    alertDescription.value = JSON.stringify(values, null, 2)
showAlert.value = true
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})

const showAlert = ref<boolean>(false)

</script>

<template>
  <form class="space-y-8" @submit="onSubmit">
    <FormField name="dob">
      <FormItem class="flex flex-col">
        <FormLabel>Date de naissance</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline" :class="cn(
                  'w-[240px] ps-3 text-start font-normal',
                  !value && 'text-muted-foreground',
                )"
              >
                <span>{{ value ? df.format(toDate(value)) : "Saisir une date..." }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="value"
              calendar-label="Date of birth"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="(v) => {
                if (v) {
                  setFieldValue('dob', v.toString())
                }
                else {
                  setFieldValue('dob', undefined)
                }
              }"
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
         La saisie de la date de naissance pour le calcul de l'âge.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Envoi
    </Button>
  </Form>

  <div v-if="showAlert">
      <Alert variant="destructive">
          <RocketIcon class="w-4 h-4" />
          <AlertTitle>{{alertTitle}}</AlertTitle>
          <AlertDescription>
            {{alertDescription}}
            </AlertDescription>
        </Alert>
    </div>
</template>