

import productsData from '@/lib/products.json';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
    return productsData.map((product) => ({
        id: product._id,
    }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // In Next 15+, page props params are Promises that must be awaited.
    const resolvedParams = await params;
    const id = resolvedParams.id;

    return <ProductDetailClient id={id} />;
}
