import { PageTransition } from '@/components/motion/PageTransition';

// template.tsx remounts on every navigation, which is what makes the
// signature wipe replay per route under the App Router.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
