import ErrorBoundary from '@/components/product/single/ErrorBoundary';
import Single from '@/components/product/single';

export default function Page() {
    return (
        <ErrorBoundary>
            <Single />
        </ErrorBoundary>
    );
}