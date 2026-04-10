'use client';

import React from 'react';

export default class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        console.log("🔥 ERREUR CAPTURÉE:", error);
        console.log("📍 INFO:", info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Erreur détectée</h1>;
        }

        return this.props.children;
    }
}