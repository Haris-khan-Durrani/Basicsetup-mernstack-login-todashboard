import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExpiringPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Expired Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This page would list all companies with documents expiring soon.</p>
      </CardContent>
    </Card>
  );
}
