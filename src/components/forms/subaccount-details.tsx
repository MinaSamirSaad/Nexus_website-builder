'use client'
import { Agency, SubAccount } from '@prisma/client'
import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import { v4 } from 'uuid'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'

import * as z from 'zod'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import {
    saveActivityLogsNotification,
    upsertSubAccount,
} from '@/lib/queries'
import { Button } from '../ui/button'
import Loading from '../global/loading'
import { useToast } from '@/hooks/use-toast'
import { useModal } from '@/providers/modal-provider'

type Props = {
    agencyDetails: Agency
    data?: Partial<SubAccount>
    userId: string
    userName: string
}

const FormSchema = z.object({
    name: z.string().min(2, { message: 'SubAccount name must be at least 2 chars.' }),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    subAccountLogo: z.string().min(1),
})

const SubAccountDetails = ({ agencyDetails, data, userId, userName }: Props) => {
    const { toast } = useToast()
    const { setClose } = useModal();
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: data?.name,
            companyEmail: data?.companyEmail,
            companyPhone: data?.companyPhone,
            address: data?.address,
            city: data?.city,
            zipCode: data?.zipCode,
            state: data?.state,
            country: data?.country,
            subAccountLogo: data?.subAccountLogo,
        },
    })
    const isLoading = form.formState.isSubmitting

    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data, form])

    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            const response = await upsertSubAccount({
                id: data?.id ? data.id : v4(),
                address: values.address,
                subAccountLogo: values.subAccountLogo,
                city: values.city,
                companyPhone: values.companyPhone,
                country: values.country,
                name: values.name,
                state: values.state,
                zipCode: values.zipCode,
                createdAt: new Date(),
                updatedAt: new Date(),
                companyEmail: values.companyEmail,
                agencyId: agencyDetails.id,
                goal: 5000,
                connectAccountId: ''
            })
            if (!response) throw new Error('Could not create subAccount')
            await saveActivityLogsNotification({
                subaccountId: response.id,
                agencyId: response.agencyId,
                description: `${userName} | updated sub account ${response.name}`,
            })
            toast({
                title: 'sub account details saved',
                description: 'sub account details saved successfully',
            })
            setClose()
            router.refresh()
        } catch (error) {
            console.log(error)
            toast({
                variant: 'destructive',
                title: 'Oppse!',
                description: 'could not save sub account details',
            })
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Sub Account Information</CardTitle>
                <CardDescription>
                    Please enter your sub account information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name="subAccountLogo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account Logo</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            apiEndpoint="subaccountLogo"
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex md:flex-row gap-4">
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Account Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your agency name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="companyEmail"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Account Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex md:flex-row gap-4">
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="companyPhone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Account Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Phone"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="123 st..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex md:flex-row gap-4">
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="City"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="State"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="zipCode"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Zipcpde</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Zipcode"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Country"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loading /> : 'Save Account Information'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SubAccountDetails
