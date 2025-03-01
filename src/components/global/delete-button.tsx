'use client';

import React, { useState } from 'react'
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import Loading from './loading';

interface Props {
    onChange: (url: string) => void;
    value?: string;
}

export default function DeleteButton({ onChange, value }: Props) {
    const [isLoading, setLoading] = useState(false);
    return (
        <Button
            onClick={async () => {
                try {
                    setLoading(true);
                    const response = await fetch('/api/uploadthing', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ url: value }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete file');
                    }

                    onChange('');
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
                setLoading(false);
            }}
            variant="ghost"
            type="button">
            {isLoading ? <Loading /> : (
                <>
                    <X className="h-4 w-4" />
                    Remove Logo
                </>
            )}
        </Button>
    )
}