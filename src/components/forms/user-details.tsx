'use client';
import { useToast } from '@/hooks/use-toast';
import { changeUserPermissions, getAuthUserDetails, getUserPermissions, saveActivityLogsNotification, updateUser } from '@/lib/queries';
import { AuthUserWithAgencySidebarOptionsSubAccounts, UserWithPermissionsAndSubAccount } from '@/lib/types';
import { useModal } from '@/providers/modal-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubAccount, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import FileUpload from '../global/file-upload';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import Loading from '../global/loading';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { v4 } from 'uuid';

type Props = {
    type: 'agency' | 'subaccount';
    id: string | null;
    subAccounts?: SubAccount[];
    userData?: Partial<User>;
}

const UserDetails = ({ id, type, subAccounts, userData }: Props) => {
    const [subAccountPermission, setSubAccountPermission] = useState<UserWithPermissionsAndSubAccount | null>(null);
    const { data, setClose } = useModal();
    const [roleState, setRoleState] = useState('');
    const [loadingPermissions, setLoadingPermissions] = useState(false);
    const [authUserData, setAuthUserData] = useState<AuthUserWithAgencySidebarOptionsSubAccounts | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    useEffect(() => {
        if (data.user) {
            const fetchDetails = async () => {
                const response = await getAuthUserDetails();
                if (response) setAuthUserData(response);
            };
            fetchDetails();
        }
    }, [data])

    const userDataSchema = z.object({
        name: z.string(),
        email: z.string(),
        avatarUrl: z.string(),
        role: z.enum([
            'AGENCY_ADMIN',
            'AGENCY_OWNER',
            'SUBACCOUNT_USER',
            'SUBACCOUNT_GUEST'
        ])
    });

    const form = useForm<z.infer<typeof userDataSchema>>({
        resolver: zodResolver(userDataSchema),
        mode: 'onChange',
        defaultValues: {
            name: userData ? userData?.name : data.user?.name,
            email: userData ? userData?.email : data.user?.email,
            avatarUrl: userData ? userData?.avatarUrl : data.user?.avatarUrl,
            role: userData ? userData?.role : data.user?.role
        }
    })

    useEffect(() => {
        if (!data.user) return;
        const getPermissions = async () => {
            if (!data.user) return;
            const permissions = await getUserPermissions(data.user.id);
            setSubAccountPermission(permissions);
        }
        getPermissions();
    }, [data, form])

    useEffect(() => {
        if (data.user) {
            form.reset(data.user);
        }
        if (userData) {
            form.reset(userData);
        }
    }, [userData, data])

    const onChangePermission = async (subAccountId: string, val: boolean, permissionsId: string | undefined) => {
        if (!data?.user?.email) return;
        setLoadingPermissions(true);
        const response = await changeUserPermissions(permissionsId ? permissionsId : v4(), data.user.email, subAccountId, val);
        if (type === 'agency') {
            await saveActivityLogsNotification({
                agencyId: authUserData?.Agency?.id,
                description: `Gave ${userData?.name} access to | ${subAccountPermission?.Permissions.find((permission) => permission.subAccountId === subAccountId)?.SubAccount.name}`,
                subaccountId: subAccountPermission?.Permissions.find((permission) => permission.subAccountId === subAccountId)?.SubAccount.id,
            })
        }
        if (response) {
            toast({
                title: 'Success',
                description: 'User permission updated',
            });
            if (subAccountPermission) {
                subAccountPermission.Permissions.find((permission) => {
                    if (permission.subAccountId === subAccountId) {
                        permission.access = !permission.access;
                    }
                });
            }
        } else {
            toast({
                variant: 'destructive',
                title: 'Oppse!',
                description: 'Failed to update user permission',
            });
        }
        router.refresh();
        setLoadingPermissions(false);
    }

    const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
        if (!id) return;
        if (userData || data?.user) {
            const updatedUser = await updateUser(values);
            authUserData?.Agency?.SubAccount.filter((subAccount) => {
                authUserData.Permissions.find((permission) => permission.subAccountId === subAccount.id && permission.access)
            }).forEach(async (subAccount) => {
                await saveActivityLogsNotification({
                    agencyId: undefined,
                    description: `updated ${userData?.name} information`,
                    subaccountId: subAccount.id,
                })
            });
            if (updatedUser) {
                toast({
                    title: 'Success',
                    description: 'Updated user information',
                });
                setClose();
                router.refresh();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Oppse!',
                    description: 'Failed to update user information',
                });
            }
        } else {
            console.log('Error updating user submitted data');
        }
    }
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>User Details</CardTitle>
                <CardDescription>Add or update your information</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            disabled={form.formState.isSubmitting}
                            control={form.control}
                            name='avatarUrl'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <FormControl>
                                        <FileUpload apiEndpoint='avatar' value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={form.formState.isSubmitting}
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>User full name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Full name' required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={form.formState.isSubmitting}
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='Email'
                                            readOnly={userData?.role === 'AGENCY_OWNER' || form.formState.isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={form.formState.isSubmitting}
                            control={form.control}
                            name='role'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>User Role</FormLabel>
                                    <Select
                                        disabled={field.value === 'AGENCY_OWNER'}
                                        onValueChange={(value) => {
                                            if (value === 'SUBACCOUNT_USER' || value === 'SUBACCOUNT_GUEST') {
                                                setRoleState('you need to have sub accounts to assign sub account access to team members');
                                            } else {
                                                setRoleState('');
                                            }
                                            field.onChange(value);
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select user role...' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='AGENCY_ADMIN'>
                                                Agency Admin
                                            </SelectItem>
                                            {(
                                                data?.user?.role === 'AGENCY_OWNER'
                                                ||
                                                userData?.role === 'AGENCY_OWNER'
                                            )
                                                &&
                                                (<SelectItem value='AGENCY_OWNER'>Agency Owner</SelectItem>)
                                            }
                                            <SelectItem value='SUBACCOUNT_USER'>Sub Account User</SelectItem>
                                            <SelectItem value='SUBACCOUNT_GUEST'>Sub Account Guest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className='text-muted-foreground'>{roleState}</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={form.formState.isSubmitting} type='submit'>
                            {form.formState.isSubmitting ? <Loading /> : 'Save User Details'}
                        </Button>
                        {
                            authUserData?.role === 'AGENCY_OWNER'
                            &&
                            (<div>
                                <Separator className='my-4' />
                                <FormLabel>User Permissions</FormLabel>
                                <FormDescription className='mb-4'>
                                    you can give Sub Account access to your team members
                                    by turning on access control for each sub account. this is only visible to agency owners
                                </FormDescription>
                                <div className='flex flex-col gap-4'>
                                    {subAccounts?.map((subAccount) => {
                                        const subAccountPermissionDetails = subAccountPermission?.Permissions.find((permission) => permission.subAccountId === subAccount.id);
                                        return (<div key={subAccount.id} className='flex items-center justify-between rounded-lg border p-4'>
                                            <div>
                                                <p>{subAccount.name}</p>
                                            </div>
                                            <Switch
                                                disabled={loadingPermissions}
                                                checked={subAccountPermissionDetails?.access}
                                                onCheckedChange={(permission) => {
                                                    onChangePermission(subAccount.id, permission, subAccountPermissionDetails?.id)
                                                }}
                                            />
                                        </div>)
                                    })}
                                </div>
                            </div>)
                        }
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default UserDetails