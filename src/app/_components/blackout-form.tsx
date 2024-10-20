'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import BlackoutSchema from '../_schemas/blackout.schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import criteriaConfig from '@/lib/config/criteria.config'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'

type BlackoutFormProps = Partial<z.infer<typeof BlackoutSchema>>
const BlackoutForm: React.FC<BlackoutFormProps> = ({
    criteria,
    document
}) => {

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof BlackoutSchema>>({
        resolver: zodResolver(BlackoutSchema),
        values: {
            criteria: criteria || "",
            document: document || ""
        }
    });

    const onSubmit = (data: z.infer<typeof BlackoutSchema>) => {
        const query = new URLSearchParams();
        query.set('document', data.document);
        query.set("criteria", data.criteria);
        router.push(`${pathname}?${query.toString()}`);
    }

    const handleClear = () => {
        router.push(pathname);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-x-2 gap-y-4">
                <FormField
                    control={form.control}
                    name="document"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numero de documento</FormLabel>
                            <FormControl>
                                <Input placeholder='20###########' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="criteria"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Criterio</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un criterio" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {criteriaConfig.map((e) =>
                                        <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='grid grid-cols-4 col-span-2 gap-x-2'>
                    <Button type='submit' className={clsx({
                        'col-span-3': document && criteria,
                        'col-span-4': !(document && criteria)
                    })}>
                        Consultar
                    </Button>
                    <Button
                        type='button'
                        onClick={handleClear}
                        className={clsx({
                            'col-span-1': document && criteria,
                            'hidden': !(document && criteria)
                        })}>
                        Limpiar
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default BlackoutForm