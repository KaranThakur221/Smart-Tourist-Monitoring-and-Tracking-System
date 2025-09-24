import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function UserDetails({ token }: { token?: string | null }) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const query = searchParams.toString();
        const url = `/api/tourists/${encodeURIComponent(id)}${query ? `?${query}` : ''}`;
        const res = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) {
          const msg = res.status === 401 ? 'Unauthorized (missing/invalid token)' : `Request failed (${res.status})`;
          throw new Error(msg);
        }
        const json = await res.json();
        if (!ignore) setData(json);
      } catch (e) {
        if (!ignore) setError((e as Error).message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => { ignore = true; };
  }, [id, searchParams, token]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Details for ID: {id}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {data && (
            <pre className="bg-muted p-3 rounded text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


