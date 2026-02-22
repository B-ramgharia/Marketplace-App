import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, ArrowRight, ShoppingCart } from 'lucide-react-native';
import api, { setAuthToken } from '../lib/api';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            setAuthToken(res.data.token);
            router.replace('/(tabs)');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.logoText}>🛒 MicroMarket</Text>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue shopping</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Mail size={20} color="#94a3b8" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Lock size={20} color="#94a3b8" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
                        {!loading && <ArrowRight size={20} color="#fff" />}
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.linkText}>Create one</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5048e5',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: 56,
        fontSize: 16,
        color: '#0f172a',
    },
    button: {
        backgroundColor: '#5048e5',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        shadowColor: '#5048e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    errorText: {
        color: '#ef4444',
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    footerText: {
        color: '#64748b',
        fontSize: 14,
    },
    linkText: {
        color: '#5048e5',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
