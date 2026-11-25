import { Link } from '@/lib/router';
import { useSeo } from '@/hooks/useSeo';
export default function NotFound() {
  useSeo('Page not found');
  return (
    <main id="main" className="wrap nf">
      <p className="label">404</p>
      <h1 className="page-title">This page <em>wandered off</em></h1>
      <p className="lead">The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className="btn">Back to home</Link>
    </main>
  );
}
