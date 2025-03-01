import { createRouteHandler } from 'uploadthing/next'
import { UTApi } from 'uploadthing/server';
import { auth } from '@clerk/nextjs/server';
import { ourFileRouter } from './core'
import { NextResponse } from 'next/server';

export const { GET, POST } = createRouteHandler({ router: ourFileRouter })

export async function DELETE(request: Request) {
    try {
        const user = auth();
        if (!user) {
            throw new Error('Unauthorized');
        }

        const { url } = await request.json();
        if (!url) {
            return;
        }

        const newUrl = url.substring(url.lastIndexOf("/") + 1);
        const utapi = new UTApi();

        const result = await utapi.deleteFiles(newUrl);

        return NextResponse.json({ message: 'File deleted successfully', result }, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = (error instanceof Error) ? error.message : 'Internal server error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}