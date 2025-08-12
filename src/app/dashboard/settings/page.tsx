"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCustomPages } from '@/hooks/use-custom-pages';
import { X } from 'lucide-react';

export default function SettingsPage() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { customPages, addCustomPage, removeCustomPage } = useCustomPages();

  const handleAddPage = () => {
    if (title && url) {
      addCustomPage({ title, url });
      setTitle('');
      setUrl('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Add custom pages to the sidebar. These will be lost on page refresh.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="page-title">Page Title</Label>
              <Input
                id="page-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. My Company Wiki"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iframe-url">Page URL</Label>
              <Input
                id="iframe-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
             <Button onClick={handleAddPage}>Add Page to Sidebar</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
         <CardHeader>
          <CardTitle>Custom Sidebar Pages</CardTitle>
           <CardDescription>
            Manage the custom pages you've added to the sidebar.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-2">
            {customPages.length > 0 ? (
              customPages.map((page) => (
                <div key={page.slug} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="font-medium">{page.title}</p>
                    <p className="text-sm text-muted-foreground">{page.url}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeCustomPage(page.slug)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No custom pages added yet.</p>
            )}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
