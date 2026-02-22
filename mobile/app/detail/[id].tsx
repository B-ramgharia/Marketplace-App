import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, ShoppingCart, Truck, ShieldCheck, RefreshCcw } from 'lucide-react-native';
import api from '../../lib/api';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => router.back())
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#5048e5" />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={24} color="#0f172a" />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{product.category}</Text>
                    </View>

                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>₹{product.price}</Text>

                    <Text style={styles.description}>
                        {product.description}
                    </Text>

                    <View style={styles.perksContainer}>
                        <View style={styles.perk}>
                            <Truck size={24} color="#5048e5" />
                            <Text style={styles.perkText}>Free Delivery</Text>
                        </View>
                        <View style={styles.perk}>
                            <ShieldCheck size={24} color="#5048e5" />
                            <Text style={styles.perkText}>2Y Warranty</Text>
                        </View>
                        <View style={styles.perk}>
                            <RefreshCcw size={24} color="#5048e5" />
                            <Text style={styles.perkText}>30D Return</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton}>
                    <ShoppingCart size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteButton}>
                    <Heart size={24} color="#94a3b8" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f8fafc',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    infoContainer: {
        padding: 24,
    },
    categoryBadge: {
        backgroundColor: 'rgba(80, 72, 229, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    categoryText: {
        color: '#5048e5',
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    price: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#64748b',
        lineHeight: 24,
        marginBottom: 32,
    },
    perksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8fafc',
        borderRadius: 24,
        padding: 20,
    },
    perk: {
        alignItems: 'center',
    },
    perkText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0f172a',
        marginTop: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#5048e5',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: '#5048e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    favoriteButton: {
        width: 56,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
