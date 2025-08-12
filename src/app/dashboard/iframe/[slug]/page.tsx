"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomPages } from '@/hooks/use-custom-pages';
import { AlertTriangle } from 'lucide-react';

export default function IframePage() {
  const params = useParams();
  const { customPages } = useCustomPages();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const page = customPages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-destructive" />
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>This custom page could not be found. It may have been removed or the link is incorrect.</p>
          <p className="text-sm text-muted-foreground mt-2">Please note that custom pages are lost on page refresh.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
       <CardHeader>
        <CardTitle>{page.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
         <div className="w-full h-full p-6 pt-0">
          <iframe
              src={page.url}
              className="w-full h-full border rounded-md"
              title={page.title}
          ></iframe>
          </div>
      </CardContent>
    </Card>
  );
}
