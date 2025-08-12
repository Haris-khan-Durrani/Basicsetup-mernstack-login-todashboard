"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [url, setUrl] = useState('https://www.wikipedia.org/');
  const [iframeSrc, setIframeSrc] = useState('https://www.wikipedia.org/');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleUpdateClick = () => {
    setIframeSrc(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Configure application settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="iframe-url">iFrame Page URL</Label>
              <div className="flex gap-2">
                <Input
                  id="iframe-url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="https://example.com"
                />
                <Button onClick={handleUpdateClick}>Update</Button>
              </div>
               <p className="text-sm text-muted-foreground">
                Enter a URL to display a page within an iframe below.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
         <CardHeader>
          <CardTitle>iFrame Preview</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="aspect-video w-full">
            <iframe
                src={iframeSrc}
                className="w-full h-full border rounded-md"
                title="iframe-preview"
                ></iframe>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
