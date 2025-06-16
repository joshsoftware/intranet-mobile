import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import UpdateVersionScreen from '../screens/UpdateVersion';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return {hasError: true};
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.fullScreen}>
          <UpdateVersionScreen />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});

export default ErrorBoundary;
