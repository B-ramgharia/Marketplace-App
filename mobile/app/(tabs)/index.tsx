import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity, ActivityIndicator, TextInput, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Heart } from 'lucide-react-native';
import api from '../../lib/api';

export default function TabOneScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products', { params: { search } });
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/detail/${item._id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardPrice}>₹{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Heart size={18} color="#94a3b8" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#5048e5" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#5048e5" />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#0f172a',
  },
  list: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f8fafc',
  },
  cardContent: {
    padding: 12,
  },
  cardCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#5048e5',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
